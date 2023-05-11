import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';

const commonjs = fromRollup(rollupCommonjs);

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
	open: true,
	watch: true,
	nodeResolve: true,
	appIndex: 'index2.html',
	plugins: [
		esbuildPlugin({ ts: true, target: 'auto', json: true }),
		importMapsPlugin({
			inject: {
				importMap: {
					imports: {
						'src/': './src/',
						'@umbraco-cms/backoffice/backend-api': './libs/backend-api/index.ts',
						'@umbraco-cms/backoffice/content-type': './libs/content-type/index.ts',
						'@umbraco-cms/backoffice/context-api': './libs/context-api/index.ts',
						'@umbraco-cms/backoffice/controller': './libs/controller/index.ts',
						'@umbraco-cms/backoffice/element': './libs/element/index.ts',
						'@umbraco-cms/backoffice/entity-action': './libs/entity-action/index.ts',
						'@umbraco-cms/backoffice/events': './libs/umb-events/index.ts',
						'@umbraco-cms/backoffice/extensions-api': './libs/extensions-api/index.ts',
						'@umbraco-cms/backoffice/extensions-registry': './libs/extensions-registry/index.ts',
						'@umbraco-cms/backoffice/modal': './libs/modal/index.ts',
						'@umbraco-cms/backoffice/models': './libs/models/index.ts',
						'@umbraco-cms/backoffice/notification': './libs/notification/index.ts',
						'@umbraco-cms/backoffice/observable-api': './libs/observable-api/index.ts',
						'@umbraco-cms/backoffice/property-editor': './libs/property-editor/index.ts',
						'@umbraco-cms/backoffice/repository': './libs/repository/index.ts',
						'@umbraco-cms/backoffice/resources': './libs/resources/index.ts',
						'@umbraco-cms/backoffice/store': './libs/store/index.ts',
						'@umbraco-cms/backoffice/utils': './libs/utils/index.ts',
						'@umbraco-cms/backoffice/workspace': './libs/workspace/index.ts',
						'@umbraco-cms/backoffice/picker-input': './libs/picker-input/index.ts',
						'@umbraco-cms/backoffice/id': './libs/id/index.ts',
						'@umbraco-cms/backoffice/collection': './libs/collection/index.ts',
						'@umbraco-cms/backoffice/tree': './libs/tree/index.ts',
						'@umbraco-cms/backoffice/section': './libs/section/index.ts',
						'@umbraco-cms/backoffice/variant': './libs/variant/index.ts',
						'@umbraco-cms/backoffice/router': './libs/router/index.ts',

						'@umbraco-cms/backoffice/core/components': './src/backoffice/core/components/index.ts',
						'@umbraco-cms/backoffice/user-group': './src/backoffice/users/user-groups/index.ts',

						'@umbraco-cms/internal/lit-element': './src/core/lit-element/index.ts',
						'@umbraco-cms/internal/modal': './src/core/modal/index.ts',
						'@umbraco-cms/internal/router': './src/core/router/index.ts',
						'@umbraco-cms/internal/sorter': './src/core/sorter/index.ts',
						'@umbraco-cms/internal/test-utils': './utils/test-utils.ts',
					},
				},
			},
		}),
	],
};
