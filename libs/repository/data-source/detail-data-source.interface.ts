import type { DataSourceResponse } from '@umbraco-cms/backoffice/repository';

export interface UmbDetailDataSource<CreateRequestType, UpdateRequestType, ResponseType> {
	createScaffold(parentUnique: string | null): Promise<DataSourceResponse<CreateRequestType>>;
	get(unique: string): Promise<DataSourceResponse<ResponseType>>;
	insert(data: CreateRequestType): Promise<any>;
	update(unique: string, data: UpdateRequestType): Promise<DataSourceResponse<ResponseType>>;
	delete(unique: string): Promise<DataSourceResponse>;
}
