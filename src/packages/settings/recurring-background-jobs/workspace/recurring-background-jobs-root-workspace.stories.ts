import './extension-root-workspace.element.js';

import { Meta, Story } from '@storybook/web-components';
import type { UmbRecurringBackgroundJobsRootWorkspaceElement } from './recurring-background-jobs-root-workspace.element.js';
import { html } from '@umbraco-cms/backoffice/external/lit';

export default {
	title: 'Workspaces/Recurring Background Jobs',
	component: 'umb-workspace-recurring-background-jobs-root',
	id: 'umb-workspace-recurring-background-jobs-root',
} as Meta;

export const AAAOverview: Story<UmbRecurringBackgroundJobsRootWorkspaceElement> = () =>
	html` <umb-workspace-recurring-background-jobs-root></umb-workspace-recurring-background-jobs-root>`;
AAAOverview.storyName = 'Overview';
