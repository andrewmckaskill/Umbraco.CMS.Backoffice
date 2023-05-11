import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
	open: true,
	watch: true,
	nodeResolve: true,
	appIndex: 'index2.html',
	plugins: [esbuildPlugin({ ts: true, target: 'auto', json: true }), importMapsPlugin()],
};
