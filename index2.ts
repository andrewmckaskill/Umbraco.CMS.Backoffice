//import { UmbAppElement } from '../src/app/app.element';
import { UmbBackofficeElement } from './src/backoffice/backoffice.element';
import { startMockServiceWorker } from './src/core/mocks/browser';

startMockServiceWorker();

/*


const appElement = new UmbAppElement();

const config = {
	serverUrl: undefined,
	backofficePath: undefined,
	bypassAuth: true,
};

appElement.config = config;
document.body.appendChild(appElement);
*/

const backofficeElement = new UmbBackofficeElement();
document.body.appendChild(backofficeElement);
