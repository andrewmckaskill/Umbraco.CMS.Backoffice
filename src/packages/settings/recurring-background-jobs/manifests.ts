import { manifests as menuItemManifests } from './menu-item/manifests.js';
import { manifests as workspaceManifests } from './workspace/manifests.js';
import { manifests as repositoryManifests } from './repository/manifests.js';

export const manifests = [
    ...menuItemManifests, 
    ...repositoryManifests,
    ...workspaceManifests,
];
