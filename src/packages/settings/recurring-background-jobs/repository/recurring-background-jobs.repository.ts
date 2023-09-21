import { UmbRecurringBackgroundJobsServerDataSource } from './sources/recurring-background-jobs.server.data.js';
import { UmbRecurringBackgroundJobsStore, UMB_RECURRING_BACKGROUND_JOBS_STORE_CONTEXT_TOKEN } from './recurring-background-jobs.store.js';
import { UmbRecurringBackgroundJobsItemServerDataSource } from './sources/recurring-background-jobsitem.server.data.js';
import { UMB_RECURRING_BACKGROUND_JOB_ITEM_STORE_CONTEXT_TOKEN, UmbRecurringBackgroundJobItemStore } from './recurring-background-job-item.store.js';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextConsumerController } from '@umbraco-cms/backoffice/context-api';
import { UmbNotificationContext, UMB_NOTIFICATION_CONTEXT_TOKEN } from '@umbraco-cms/backoffice/notification';
import { RecurringBackgroundJobsItemResponseModel, RecurringBackgroundJobsResponseModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbItemRepository } from '@umbraco-cms/backoffice/repository';

export class UmbRecurringBackgroundJobsRepository implements UmbItemRepository<RecurringBackgroundJobsItemResponseModel> {
	#init: Promise<unknown>;

	#host: UmbControllerHostElement;

	#dataSource: UmbRecurringBackgroundJobsServerDataSource;
	#itemDataSource: UmbRecurringBackgroundJobsItemServerDataSource;
	#recurringBackgroundJobsStore?: UmbRecurringBackgroundJobsStore;
	#recurringBackgroundJobItemStore?: UmbRecurringBackgroundJobItemStore;

	#notificationContext?: UmbNotificationContext;

	constructor(host: UmbControllerHostElement) {
		this.#host = host;

		this.#dataSource = new UmbRecurringBackgroundJobsServerDataSource(this.#host);
		this.#itemDataSource = new UmbRecurringBackgroundJobsItemServerDataSource(this.#host);

		this.#init = Promise.all([
			new UmbContextConsumerController(this.#host, UMB_NOTIFICATION_CONTEXT_TOKEN, (instance) => {
				this.#notificationContext = instance;
			}).asPromise(),

			new UmbContextConsumerController(this.#host, UMB_RECURRING_BACKGROUND_JOBS_STORE_CONTEXT_TOKEN, (instance) => {
				this.#recurringBackgroundJobsStore = instance;
			}).asPromise(),

			new UmbContextConsumerController(this.#host, UMB_RECURRING_BACKGROUND_JOB_ITEM_STORE_CONTEXT_TOKEN, (instance) => {
				this.#recurringBackgroundJobItemStore = instance;
			}).asPromise(),
		]);
	}

	// TODO: maybe this should be renamed to something more generic?
	async requestByName(name: string) {
		await this.#init;

		if (!name) {
			throw new Error('Name is missing');
		}

		return this.#dataSource.get(name);
	}

	// TODO: maybe this should be renamed to something more generic.
	// Revisit when collection are in place
	async requestRecurringBackgroundJobs({ skip, take } = { skip: 0, take: 1000 }) {
		await this.#init;

		const { data, error } = await this.#dataSource.getCollection({ skip, take });

		if (data) {
			// TODO: allow to append an array of items to the store
			data.items.forEach((x) => this.#recurringBackgroundJobsStore?.append(x));
		}

		return { data, error, asObservable: () => this.#recurringBackgroundJobsStore!.data };
	}

	async requestItems(names: Array<string>) {
		await this.#init;
		const { data, error } = await this.#itemDataSource.getItems(names);

		if (data) {
			this.#recurringBackgroundJobItemStore?.appendItems(data);
		}

		return { data, error, asObservable: () => this.#recurringBackgroundJobItemStore!.items(names) };
	}

	async items(names: Array<string>) {
		await this.#init;
		return this.#recurringBackgroundJobItemStore!.items(names);
	}

	/**
	 * Creates a new RecurringBackgroundJobs scaffold
	 * @param
	 * @return {*}
	 * @memberof UmbRecurringBackgroundJobsRepository
	 */
	async createScaffold() {
		return this.#dataSource.createScaffold();
	}

	async create(recurringBackgroundJobs: RecurringBackgroundJobsResponseModel) {
		await this.#init;

		const { error } = await this.#dataSource.insert(recurringBackgroundJobs);

		if (!error) {
			this.#recurringBackgroundJobsStore?.append(recurringBackgroundJobs);
			const notification = { data: { message: `RecurringBackgroundJobs created` } };
			this.#notificationContext?.peek('positive', notification);
		}

		return { error };
	}

	/**
	 * Saves a recurringBackgroundJobs
	 * @param {RecurringBackgroundJobsModel} recurringBackgroundJobs
	 * @return {*}
	 * @memberof UmbRecurringBackgroundJobsRepository
	 */
	async save(recurringBackgroundJobs: RecurringBackgroundJobsResponseModel) {
		if (!recurringBackgroundJobs.isoCode) throw new Error('RecurringBackgroundJobs iso code is missing');

		await this.#init;

		const { error } = await this.#dataSource.update(recurringBackgroundJobs.isoCode, recurringBackgroundJobs);

		if (!error) {
			const notification = { data: { message: `RecurringBackgroundJobs saved` } };
			this.#notificationContext?.peek('positive', notification);
			this.#recurringBackgroundJobsStore?.append(recurringBackgroundJobs);
		}

		return { error };
	}

	/**
	 * Deletes a recurringBackgroundJobs
	 * @param {string} isoCode
	 * @return {*}
	 * @memberof UmbRecurringBackgroundJobsRepository
	 */
	async delete(isoCode: string) {
		await this.#init;

		if (!isoCode) {
			throw new Error('Iso code is missing');
		}

		const { error } = await this.#dataSource.delete(isoCode);

		if (!error) {
			this.#recurringBackgroundJobsStore?.remove([isoCode]);
			const notification = { data: { message: `RecurringBackgroundJobs deleted` } };
			this.#notificationContext?.peek('positive', notification);
		}

		return { error };
	}
}
