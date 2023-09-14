export class UmbStoreEvent extends Event {
	public uniques: Array<string | number> = [];

	public constructor(type: string, uniques: Array<string | number>) {
		super(type, { bubbles: false, composed: false, cancelable: false });
		this.uniques = uniques;
	}
}
