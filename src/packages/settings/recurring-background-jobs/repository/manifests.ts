import { UmbRecurringBackgroundJobStatusRepository } from '../repository/recurring-background-jobs.repository.js';
import { UmbRecurringBackgroundJobsStore } from './recurring-background-jobs.store.js';
import type { ManifestStore, ManifestRepository } from '@umbraco-cms/backoffice/extension-registry';

export const RECURRING_BACKGROUND_JOBS_REPOSITORY_ALIAS = 'Umb.Repository.RecurringBackgroundJobs';

const repository: ManifestRepository = {
	type: 'repository',
	alias: RECURRING_BACKGROUND_JOBS_REPOSITORY_ALIAS,
	name: 'Recurring Background Jobs Repository',
	class: UmbRecurringBackgroundJobStatusRepository,
};

export const RECURRING_BACKGROUND_JOBS_STORE_ALIAS = 'Umb.Store.RecurringBackgroundJobs';

const store: ManifestStore = {
	type: 'store',
	alias: RECURRING_BACKGROUND_JOBS_STORE_ALIAS,
	name: 'Recurring Background Jobs Store',
	class: UmbRecurringBackgroundJobsStore,
};



export const manifests = [repository, store];
