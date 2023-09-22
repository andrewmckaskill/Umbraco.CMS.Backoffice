import { UmbRecurringBackgroundJobStatusRepository } from '../repository/recurring-background-jobs.repository.js';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTableColumn, UmbTableConfig, UmbTableItem } from '@umbraco-cms/backoffice/components';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { RecurringBackgroundJobStatusResponseModel } from '@umbraco-cms/backoffice/backend-api';

@customElement('umb-recurring-background-jobs-root-workspace')
export class UmbRecurringBackgroundJobsRootWorkspaceElement extends UmbLitElement {
	@state()
	private _tableConfig: UmbTableConfig = {
		allowSelection: false,
	};

	@state()
	private _tableColumns: Array<UmbTableColumn> = [
		{
			name: 'Name',
			alias: 'name',
		},
		{
			name: 'Last Execution Date',
			alias: 'lastExecutionDateTime',
		},
		{
			name: 'Success',
			alias: 'lastExecutionWasSuccessful',
		},
	];

	@state()
	private _tableItems: Array<UmbTableItem> = [];

	#repository = new UmbRecurringBackgroundJobStatusRepository(this);

	connectedCallback() {
		super.connectedCallback();
		this.#observeRecurringBackgroundJobStatuses();
	}

	async #observeRecurringBackgroundJobStatuses() {
		const { asObservable } = await this.#repository.requestRecurringBackgroundJobStatuses();

		if (asObservable) {
			this.observe(asObservable(), (recurringBackgroundJobs) => this.#createTableItems(recurringBackgroundJobs));
		}
	}

	#createTableItems(recurringBackgroundJobs: Array<RecurringBackgroundJobStatusResponseModel>) {
		this._tableItems = recurringBackgroundJobs.map((recurringBackgroundJob) => {
			return {
				id: recurringBackgroundJob.name ?? '',
				icon: 'umb:globe',
				data: [
					{
						columnAlias: 'name',
						value: recurringBackgroundJob.name,
							
					},
					{
						columnAlias: 'lastExecutionDateTime',
						value: recurringBackgroundJob.lastExecutionDateTime,
					},
					{
						columnAlias: 'lastExecutionWasSuccessful',
						value: recurringBackgroundJob.lastExecutionWasSuccessful,
					},
					
				],
			};
		});
	}

	// TODO: Generate the href or retrieve it from something?
	render() {
		return html`
			<umb-body-layout main-no-padding headline="Recurring Background Jobs">
				<umb-body-layout header-transparent>
					
					<!--- TODO: investigate if it's possible to use a collection component here --->
					<umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems}></umb-table>
				</umb-body-layout>
			</umb-body-layout>
		`;
	}

	static styles = [
		UUITextStyles,
		css`
			umb-table {
				/* Why is this needed? */
				height: fit-content;
				display: block;
				padding: 0;
			}
		`,
	];
}

export default UmbRecurringBackgroundJobsRootWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-recurring-background-jobs-root-workspace': UmbRecurringBackgroundJobsRootWorkspaceElement;
	}
}
