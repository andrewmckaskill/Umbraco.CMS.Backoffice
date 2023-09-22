import type { ManifestMenuItem } from '@umbraco-cms/backoffice/extension-registry';

const menuItem: ManifestMenuItem = {
	type: 'menuItem',
	alias: 'Umb.MenuItem.RecurringBackgroundJobs',
	name: 'Recurring Background Jobs Menu Item',
	weight: 0,
	meta: {
		label: 'Recurring Background Jobs',
		icon: 'umb:timer',
		entityType: 'recurring-background-jobs',
		menus: ['Umb.Menu.Settings'],
	},
};

export const manifests = [menuItem];
