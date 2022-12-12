import '@umbraco-ui/uui';
import '@umbraco-ui/uui-modal';
import '@umbraco-ui/uui-modal-container';
import '@umbraco-ui/uui-modal-dialog';
import '@umbraco-ui/uui-modal-sidebar';

import { html } from 'lit-html';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { setCustomElements } from '@storybook/web-components';

import customElementManifests from '../custom-elements.json';
import { UmbDataTypeStore } from '../src/core/stores/data-type/data-type.store';
import { UmbDocumentTypeStore } from '../src/core/stores/document-type.store';
import { UmbNodeStore } from '../src/core/stores/node.store';
import { UmbIconStore } from '../src/core/stores/icon/icon.store';
import { onUnhandledRequest } from '../src/core/mocks/browser';
import { handlers } from '../src/core/mocks/browser-handlers';
import { LitElement } from 'lit';
import { UmbModalService } from '../src/core/services/modal';

import { manifests as sectionManifests } from '../src/backoffice/sections/manifests';
import { manifests as propertyEditorModelManifests } from '../src/backoffice/property-editor-models/manifests';
import { manifests as propertyEditorUIManifests } from '../src/backoffice/property-editor-uis/manifests';
import { manifests as treeManifests } from '../src/backoffice/trees/manifests';
import { manifests as editorManifests } from '../src/backoffice/editors/manifests';
import { manifests as propertyActionManifests } from '../src/backoffice/property-actions/manifests';

import { umbExtensionsRegistry } from '../src/core/extensions-registry';

import '../src/core/context-api/provide/context-provider.element';
import '../src/core/css/custom-properties.css';
import '../src/backoffice/components/backoffice-modal-container.element';
import '../src/backoffice/components/shared/code-block.element';

class UmbStoryBookElement extends LitElement {
	_umbIconStore = new UmbIconStore();

	constructor() {
		super();
		this._umbIconStore.attach(this);

		this._registerExtensions(sectionManifests);
		this._registerExtensions(treeManifests);
		this._registerExtensions(editorManifests);
		this._registerExtensions(propertyEditorModelManifests);
		this._registerExtensions(propertyEditorUIManifests);
		this._registerExtensions(propertyActionManifests);
	}

	_registerExtensions(manifests) {
		manifests.forEach((manifest) => {
			if (umbExtensionsRegistry.isRegistered(manifest.alias)) return;
			umbExtensionsRegistry.register(manifest);
		});
	}

	render() {
		return html`<slot></slot>`;
	}
}

customElements.define('umb-storybook', UmbStoryBookElement);

const storybookProvider = (story) => html` <umb-storybook>${story()}</umb-storybook> `;

const dataTypeStoreProvider = (story) => html`
	<umb-context-provider key="umbDataTypeStore" .value=${new UmbDataTypeStore()}>${story()}</umb-context-provider>
`;

const documentTypeStoreProvider = (story) => html`
	<umb-context-provider key="umbDocumentTypeStore" .value=${new UmbDocumentTypeStore()}
		>${story()}</umb-context-provider
	>
`;

const modalServiceProvider = (story) => html`
	<umb-context-provider style="display: block; padding: 32px;" key="umbModalService" .value=${new UmbModalService()}>
		${story()}
		<umb-backoffice-modal-container></umb-backoffice-modal-container>
	</umb-context-provider>
`;

// Initialize MSW
initialize({ onUnhandledRequest });

// Provide the MSW addon decorator globally
export const decorators = [
	mswDecorator,
	storybookProvider,
	dataTypeStoreProvider,
	documentTypeStoreProvider,
	modalServiceProvider,
];

export const parameters = {
	options: {
		storySort: {
			method: 'alphabetical',
			includeNames: true,
		},
	},
	actions: { argTypesRegex: '^on.*' },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	msw: {
		handlers: {
			global: handlers,
		},
	},
};

setCustomElements(customElementManifests);
