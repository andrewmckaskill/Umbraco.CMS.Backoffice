import { UmbDataTypeTreeRepository } from './data-type-tree.repository.js';
import { UmbDataTypeTreeStore } from './data-type-tree.store.js';
import type {
	ManifestRepository,
	ManifestTree,
	ManifestTreeItem,
	ManifestTreeStore,
} from '@umbraco-cms/backoffice/extension-registry';

export const DATA_TYPE_TREE_REPOSITORY_ALIAS = 'Umb.Repository.DataTypeTree';
export const DATA_TYPE_TREE_STORE_ALIAS = 'Umb.Store.DataTypeTree';

const treeRepository: ManifestRepository = {
	type: 'repository',
	alias: DATA_TYPE_TREE_REPOSITORY_ALIAS,
	name: 'Data Type Tree Repository',
	class: UmbDataTypeTreeRepository,
};

const treeStore: ManifestTreeStore = {
	type: 'treeStore',
	alias: DATA_TYPE_TREE_STORE_ALIAS,
	name: 'Data Type Tree Store',
	class: UmbDataTypeTreeStore,
};

const tree: ManifestTree = {
	type: 'tree',
	alias: 'Umb.Tree.DataTypes',
	name: 'Data Types Tree',
	meta: {
		repositoryAlias: DATA_TYPE_TREE_REPOSITORY_ALIAS,
	},
};

const treeItem: ManifestTreeItem = {
	type: 'treeItem',
	kind: 'entity',
	alias: 'Umb.TreeItem.DataType',
	name: 'Data Type Tree Item',
	meta: {
		entityTypes: ['data-type-root', 'data-type'],
	},
};

export const manifests = [treeRepository, treeStore, tree, treeItem];
