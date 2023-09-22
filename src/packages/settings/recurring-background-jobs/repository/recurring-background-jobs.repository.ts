import { UmbRecurringBackgroundJobStatusServerDataSource } from './sources/recurring-background-jobs.server.data.js';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextConsumerController } from '@umbraco-cms/backoffice/context-api';
import { UmbNotificationContext, UMB_NOTIFICATION_CONTEXT_TOKEN } from '@umbraco-cms/backoffice/notification';
import { UMB_RECURRING_BACKGROUND_JOBS_STORE_CONTEXT_TOKEN, UmbRecurringBackgroundJobsStore } from './recurring-background-jobs.store.js';
import { RecurringBackgroundJobStatusDataSource } from './sources/index.js';
import { UmbRecurringBackgroundJobStatusMockDataSource } from './sources/recurring-background-jobs.mock.data.js';

export class UmbRecurringBackgroundJobStatusRepository {
	#init!: Promise<unknown>;
	#host: UmbControllerHostElement;

	#dataSource: RecurringBackgroundJobStatusDataSource;
	#store?: UmbRecurringBackgroundJobsStore;

	#notificationContext?: UmbNotificationContext;

	constructor(host: UmbControllerHostElement) {
		this.#host = host;

		this.#dataSource = new UmbRecurringBackgroundJobStatusServerDataSource(this.#host);
		//this.#dataSource = new UmbRecurringBackgroundJobStatusMockDataSource(this.#host);

		this.#init = Promise.all([
			new UmbContextConsumerController(this.#host, UMB_NOTIFICATION_CONTEXT_TOKEN, (instance) => {
				this.#notificationContext = instance;
			}).asPromise(),

			new UmbContextConsumerController(this.#host, UMB_RECURRING_BACKGROUND_JOBS_STORE_CONTEXT_TOKEN, (instance) => {
				this.#store = instance;
			}).asPromise(),
		]);
	}

	async requestRecurringBackgroundJobStatuses({ skip, take } = { skip: 0, take: 1000 }) {
		await this.#init;

		const { data, error } = await this.#dataSource.getCollection({ skip, take });
		if (data) {
			// TODO: allow to append an array of items to the store
			data.items.forEach((x) => this.#store?.append(x));
		}
		return { data, error, asObservable: () => this.#store!.data };

	}
}
