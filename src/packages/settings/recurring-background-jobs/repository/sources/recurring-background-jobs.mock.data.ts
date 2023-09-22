import {
	PagedRecurringBackgroundJobStatusResponseModel,
	RecurringBackgroundJobsResource,
	RecurringBackgroundJobStatusResponseModel,
} from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { RecurringBackgroundJobStatusDataSource } from '.';
import { DataSourceResponse } from '@umbraco-cms/backoffice/repository';

/**
 * A data source for the Language that fetches data from the server
 * @export
 * @class UmbRecurringBackgroundJobStatusServerDataSource
 * @implements {RepositoryDetailDataSource}
 */
export class UmbRecurringBackgroundJobStatusMockDataSource
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
	 * @memberof UmbRecurringBackgroundJobStatusMockDataSource
	 */
	async getCollection({ skip, take }: { skip: number; take: number }): Promise<DataSourceResponse<PagedRecurringBackgroundJobStatusResponseModel>>  {
		var data: Array<RecurringBackgroundJobStatusResponseModel> = [
			{ name: 'TestJob1'},
			{ name: 'TestJob2', lastExecutionDateTime: new Date().toISOString(), lastExecutionWasSuccessful: false},
			{ name: 'TestJob3', lastExecutionDateTime: new Date().toISOString(), lastExecutionWasSuccessful: true},
		];
		
		var pagedData: PagedRecurringBackgroundJobStatusResponseModel = {
			total: data.length,
			items: data
		};

		var response = {
			data: pagedData
		}

		return response;
	}
}
