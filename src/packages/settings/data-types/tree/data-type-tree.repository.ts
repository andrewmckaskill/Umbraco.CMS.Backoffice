import { DATA_TYPE_ROOT_ENTITY_TYPE } from '../entities.js';
import { UmbDataTypeTreeServerDataSource } from '../repository/sources/data-type.tree.server.data.js';
import { UmbDataTypeTreeStore, UMB_DATA_TYPE_TREE_STORE_CONTEXT_TOKEN } from './data-type.tree.store.js';
import type { UmbTreeRepository, UmbTreeDataSource } from '@umbraco-cms/backoffice/repository';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextConsumerController } from '@umbraco-cms/backoffice/context-api';
import { FolderTreeItemResponseModel } from '@umbraco-cms/backoffice/backend-api';

export class UmbDataTypeTreeRepository implements UmbTreeRepository<FolderTreeItemResponseModel> {
	#init: Promise<unknown>;
	#host: UmbControllerHostElement;
	#treeSource: UmbTreeDataSource<FolderTreeItemResponseModel>;
	#treeStore?: UmbDataTypeTreeStore;

	constructor(host: UmbControllerHostElement) {
		this.#host = host;

		// TODO: figure out how spin up get the correct data source
		this.#treeSource = new UmbDataTypeTreeServerDataSource(this.#host);

		// TODO: Make a method that takes the controllers and returns a promise, just to simplify this:
		this.#init = Promise.all([
			new UmbContextConsumerController(this.#host, UMB_DATA_TYPE_TREE_STORE_CONTEXT_TOKEN, (instance) => {
				this.#treeStore = instance;
			}).asPromise(),
		]);
	}

	// TREE:
	async requestTreeRoot() {
		await this.#init;

		const data = {
			id: null,
			type: DATA_TYPE_ROOT_ENTITY_TYPE,
			name: 'Data Types',
			icon: 'umb:folder',
			hasChildren: true,
		};

		return { data };
	}

	async requestRootTreeItems() {
		await this.#init;

		const { data, error } = await this.#treeSource.getRootItems();

		if (data) {
			this.#treeStore?.appendItems(data.items);
		}

		return { data, error, asObservable: () => this.#treeStore!.rootItems };
	}

	async requestTreeItemsOf(parentId: string | null) {
		await this.#init;
		if (parentId === undefined) throw new Error('Parent id is missing');

		const { data, error } = await this.#treeSource.getChildrenOf(parentId);

		if (data) {
			this.#treeStore?.appendItems(data.items);
		}

		return { data, error, asObservable: () => this.#treeStore!.childrenOf(parentId) };
	}

	async rootTreeItems() {
		await this.#init;
		return this.#treeStore!.rootItems;
	}

	async treeItemsOf(parentId: string | null) {
		if (parentId === undefined) throw new Error('Parent id is missing');
		await this.#init;
		return this.#treeStore!.childrenOf(parentId);
	}
}
