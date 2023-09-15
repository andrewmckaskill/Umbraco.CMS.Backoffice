import { UMB_DATA_TYPE_STORE_CONTEXT_TOKEN, type UmbDataTypeStore } from '../repository/data-type.store.js';
import { DataTypeResponseModel, DataTypeTreeItemResponseModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbContextConsumerController, UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import {
	UmbEntityTreeStore,
	UmbStoreAppendEvent,
	UmbStoreRemoveEvent,
	UmbStoreUpdateEvent,
} from '@umbraco-cms/backoffice/store';

/**
 * @export
 * @class UmbDataTypeTreeStore
 * @extends {UmbStoreBase}
 * @description - Tree Data Store for Data-Types
 */
// TODO: consider if tree store could be turned into a general EntityTreeStore class?
export class UmbDataTypeTreeStore extends UmbEntityTreeStore {
	#dataTypeStore?: UmbDataTypeStore;

	/**
	 * Creates an instance of UmbDataTypeTreeStore.
	 * @param {UmbControllerHostElement} host
	 * @memberof UmbDataTypeTreeStore
	 */
	constructor(host: UmbControllerHostElement) {
		super(host, UMB_DATA_TYPE_TREE_STORE_CONTEXT_TOKEN.toString());

		new UmbContextConsumerController(host, UMB_DATA_TYPE_STORE_CONTEXT_TOKEN, (instance) => {
			this.#dataTypeStore = instance;
			this.#dataTypeStore.events.addEventListener(
				UmbStoreAppendEvent.TYPE,
				this.#onConnectedStoreAppend as EventListener,
			);
			this.#dataTypeStore.events.addEventListener(
				UmbStoreUpdateEvent.TYPE,
				this.#onConnectedStoreUpdate as EventListener,
			);
			this.#dataTypeStore.events.addEventListener(
				UmbStoreRemoveEvent.TYPE,
				this.#onConnectedStoreRemove as EventListener,
			);
		});
	}

	#onConnectedStoreAppend = (event: UmbStoreAppendEvent) => {
		const items = this.#dataTypeStore!.getItems(event.uniques);
		const treeItems = items.map((item) => createTreeItem(item));
		this.appendItems(treeItems);
	};

	#onConnectedStoreUpdate = (event: UmbStoreUpdateEvent) => {
		const uniques = event.uniques;
		const items = this.#dataTypeStore!.getItems(uniques);
		const treeItems = items.map((item) => createTreeItem(item));
		treeItems.forEach((treeItem, index) => this.updateItem(uniques[index], treeItem));
	};

	#onConnectedStoreRemove = (event: UmbStoreRemoveEvent) => {
		this.removeItems(event.uniques);
	};
}

export const createTreeItem = (item: DataTypeResponseModel): DataTypeTreeItemResponseModel => {
	if (!item) throw new Error('item is null or undefined');
	if (!item.id) throw new Error('item.id is null or undefined');

	return {
		type: 'data-type',
		parentId: item.parentId,
		name: item.name,
		id: item.id,
		isFolder: false,
		isContainer: false,
		hasChildren: false,
	};
};

export const UMB_DATA_TYPE_TREE_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbDataTypeTreeStore>('UmbDataTypeTreeStore');
