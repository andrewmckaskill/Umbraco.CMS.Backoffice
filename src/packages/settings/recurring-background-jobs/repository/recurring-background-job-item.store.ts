import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbStoreBase } from '@umbraco-cms/backoffice/store';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UmbArrayState } from '@umbraco-cms/backoffice/observable-api';
import { RecurringBackgroundJobResponseModel } from '@umbraco-cms/backoffice/backend-api';
import type { UmbItemStore } from '@umbraco-cms/backoffice/store';

export const UMB_RECURRING_BACKGROUND_JOB_ITEM_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRecurringBackgroundJobItemStore>('UmbRecurringBackgroundJobItemStore');

/**
 * @export
 * @class UmbRecurringBackgroundJobItemStore
 * @extends {UmbStoreBase}
 * @description -  Store for Recurring background job items
 */
export class UmbRecurringBackgroundJobItemStore
	extends UmbStoreBase<RecurringBackgroundJobResponseModel>
	implements UmbItemStore<RecurringBackgroundJobResponseModel>
{
	constructor(host: UmbControllerHostElement) {
		super(
			host,
			UMB_RECURRING_BACKGROUND_JOB_ITEM_STORE_CONTEXT_TOKEN.toString(),
			new UmbArrayState<RecurringBackgroundJobResponseModel>([], (x) => x.isoCode)
		);
	}

	items(names: Array<string>) {
		return this._data.asObservablePart((items) => items.filter((item) => names.includes(item.name ?? '')));
	}
}
