import {
	RecurringBackgroundJobsResource,
	RecurringBackgroundJobStatusResponseModel,
} from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import type { UmbDataSource } from '@umbraco-cms/backoffice/repository';
import { RecurringBackgroundJobStatusDataSource } from '.';

/**
 * A data source for the Language that fetches data from the server
 * @export
 * @class UmbRecurringBackgroundJobStatusServerDataSource
 * @implements {RepositoryDetailDataSource}
 */
export class UmbRecurringBackgroundJobStatusServerDataSource
	implements RecurringBackgroundJobStatusDataSource
{
	#host: UmbControllerHostElement;

	/**
	 * Creates an instance of UmbRecurringBackgroundJobStatusServerDataSource.
	 * @param {UmbControllerHostElement} host
	 * @memberof UmbRecurringBackgroundJobStatusServerDataSource
	 */
	constructor(host: UmbControllerHostElement) {
		this.#host = host;
	}

	

	/**
	 * Creates a new Recurring Background Job status scaffold
	 * @param
	 * @return {*}
	 * @memberof UmbRecurringBackgroundJobStatusServerDataSource
	 */
	async createScaffold() {
		const data: RecurringBackgroundJobStatusResponseModel = {
			name: '',
			lastExecutionDateTime: null,
			lastExecutionWasSuccessful: null
		};

		return { data };
	}

	

	/**
	 * Get a list of recurring background job statuses from the server
	 * @return {*}
	 * @memberof UmbRecurringBackgroundJobStatusServerDataSource
	 */
	async getCollection({ skip, take }: { skip: number; take: number }) {
		return tryExecuteAndNotify(this.#host, RecurringBackgroundJobsResource.getRecurringBackgroundJobStatus({ skip, take }));
	}
}
