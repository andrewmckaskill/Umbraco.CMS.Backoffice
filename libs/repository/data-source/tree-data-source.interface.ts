import { UmbPagedData } from '../paged-data.interface';
import type { DataSourceResponse } from '@umbraco-cms/backoffice/repository';

export interface UmbTreeDataSource<ItemType = any, PagedItemType = UmbPagedData<ItemType>> {
	getRootItems(): Promise<DataSourceResponse<PagedItemType>>;
	getChildrenOf(parentUnique: string): Promise<DataSourceResponse<PagedItemType>>;
	getItems(unique: Array<string>): Promise<DataSourceResponse<Array<ItemType>>>;
}
