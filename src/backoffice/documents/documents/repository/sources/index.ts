import type { DocumentResponseModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbDetailDataSource, DataSourceResponse } from '@umbraco-cms/backoffice/repository';

export interface UmbDocumentDataSource extends UmbDetailDataSource<any, any, DocumentResponseModel> {
	createScaffold(documentTypeKey: string): Promise<DataSourceResponse<DocumentResponseModel>>;
	trash(id: string): Promise<DataSourceResponse<DocumentResponseModel>>;
}
