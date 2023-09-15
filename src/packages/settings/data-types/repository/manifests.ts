import { UmbDataTypeRepository } from './data-type.repository.js';
import { UmbDataTypeItemStore } from './data-type-item.store.js';
import { UmbDataTypeStore } from './data-type.store.js';
import type { ManifestStore, ManifestRepository, ManifestItemStore } from '@umbraco-cms/backoffice/extension-registry';

export const DATA_TYPE_REPOSITORY_ALIAS = 'Umb.Repository.DataType';

const repository: ManifestRepository = {
	type: 'repository',
	alias: DATA_TYPE_REPOSITORY_ALIAS,
	name: 'Data Type Repository',
	class: UmbDataTypeRepository,
};

export const DATA_TYPE_STORE_ALIAS = 'Umb.Store.DataType';
export const DATA_TYPE_ITEM_STORE_ALIAS = 'Umb.Store.DataTypeItem';

const store: ManifestStore = {
	type: 'store',
	alias: DATA_TYPE_STORE_ALIAS,
	name: 'Data Type Store',
	class: UmbDataTypeStore,
};

const itemStore: ManifestItemStore = {
	type: 'itemStore',
	alias: DATA_TYPE_ITEM_STORE_ALIAS,
	name: 'Data Type Item Store',
	class: UmbDataTypeItemStore,
};

export const manifests = [repository, store, itemStore];
