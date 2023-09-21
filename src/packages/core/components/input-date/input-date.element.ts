import { html, ifDefined, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import { FormControlMixin, UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';

@customElement('umb-input-date')
export class UmbInputDateElement extends FormControlMixin(UmbLitElement) {
	protected getFormElement() {
		return undefined;
	}

	/**
	 * Specifies the type of input that will be rendered.
	 * @type {'date'| 'time'| 'datetime-local'}
	 * @attr
	 * @default date
	 */
	@property()
	type: 'date' | 'time' | 'datetime-local' = 'date';

	@property({ type: String })
	displayValue?: string;

	@property({ type: String })
	min?: string;

	@property({ type: String })
	max?: string;

	@property({ type: Number })
	step?: number;

	constructor() {
		super();
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.displayValue = this.#UTCToLocal(this.value as string);
	}

	#localToUTC(d: string) {
		if (this.type === 'time') {
			return new Date(`${new Date().toJSON().slice(0, 10)} ${d}`).toISOString().slice(11, 16);
		} else {
			const date = new Date(d);
			const isoDate = date.toISOString();
			return `${isoDate.substring(0, 10)}T${isoDate.substring(11, 19)}Z`;
		}
	}

	#UTCToLocal(d: string) {
		if (this.type === 'time') {
			const local = new Date(`${new Date().toJSON().slice(0, 10)} ${d}Z`)
				.toLocaleTimeString(undefined, {
					hourCycle: 'h23',
				})
				.slice(0, 5);
			return local;
		} else {
			const timezoneReset = `${d.replace('Z', '')}Z`;
			const date = new Date(timezoneReset);

			const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
				'0' + date.getDate()
			).slice(-2)}T${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${(
				'0' + date.getSeconds()
			).slice(-2)}`;

			return this.type === 'datetime-local' ? dateString : `${dateString.substring(0, 10)}`;
		}
	}

	#dateToString(date: Date) {
		return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${(
			'0' + date.getHours()
		).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
	}

	#onChange(e: UUIInputEvent) {
		e.stopPropagation();
		const picked = e.target.value as string;
		if (!picked) {
			this.value = '';
			this.displayValue = '';
			return;
		}
		this.value = this.#localToUTC(picked);
		this.displayValue = picked;
		this.dispatchEvent(new CustomEvent('change'));
	}

	render() {
		return html`<uui-input
			id="datetime"
			label="Pick a date or time"
			.type="${this.type}"
			@change="${this.#onChange}"
			min="${ifDefined(this.min)}"
			max="${ifDefined(this.max)}"
			.step="${this.step}"
			.value="${this.displayValue?.replace('Z', '')}">
		</uui-input>`;
	}
}

export default UmbInputDateElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-input-date': UmbInputDateElement;
	}
}
