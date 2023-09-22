import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbStoreBase } from '@umbraco-cms/backoffice/store';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UmbArrayState } from '@umbraco-cms/backoffice/observable-api';
import { LanguageResponseModel, RecurringBackgroundJobStatusResponseModel } from '@umbraco-cms/backoffice/backend-api';

export const UMB_RECURRING_BACKGROUND_JOBS_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRecurringBackgroundJobsStore>('UmbRecurringBackgroundJobsStore');

/**
 * @export
 * @class UmbRecurringBackgroundJobsStore
 * @extends {UmbStoreBase}
 * @description - Details Data Store for Recurring Background Jobs
 */
export class UmbRecurringBackgroundJobsStore extends UmbStoreBase {
	public readonly data = this._data.asObservable();

	constructor(host: UmbControllerHostElement) {
		super(
			host,
			UMB_RECURRING_BACKGROUND_JOBS_STORE_CONTEXT_TOKEN.toString(),
			new UmbArrayState<RecurringBackgroundJobStatusResponseModel>([], (x) => x.name)
		);
	}

	append(recurringBackgroundJob: RecurringBackgroundJobStatusResponseModel) {
		this._data.append([recurringBackgroundJob]);
	}

	remove(uniques: string[]) {
		this._data.remove(uniques);
	}

	// TODO: how do we best handle this? They might have a smaller data set than the details
	items(names: Array<string>) {
		return this._data.asObservablePart((items) => items.filter((item) => names.includes(item.name ?? '')));
	}
}
