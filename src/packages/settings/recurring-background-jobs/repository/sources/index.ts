import type {
	DirectionModel,
	PagedRecurringBackgroundJobStatusResponseModel,
	RecurringBackgroundJobsResource,
	RecurringBackgroundJobStatusResponseModel,
} from '@umbraco-cms/backoffice/backend-api';
import type { DataSourceResponse } from '@umbraco-cms/backoffice/repository';

export interface RecurringBackgroundJobStatusDataSource {
	getCollection({
		skip,
		take,
	}: {
		skip?: number;
		take?: number;
	}): Promise<DataSourceResponse<PagedRecurringBackgroundJobStatusResponseModel>>;
	
}
