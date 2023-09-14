import { UmbStoreEvent } from './store.event.js';

export class UmbStoreAppendEvent extends UmbStoreEvent {
	static readonly TYPE = 'append';

	public constructor(uniques: Array<string | number>) {
		super(UmbStoreAppendEvent.TYPE, uniques);
	}
}
