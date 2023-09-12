/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedBackgroundJobPresentationModel } from '../models/PagedBackgroundJobPresentationModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BackgroundJobResource {

    /**
     * @returns PagedBackgroundJobPresentationModel Success
     * @throws ApiError
     */
    public static getBackgroundJob({
skip,
take = 100,
}: {
skip?: number,
take?: number,
}): CancelablePromise<PagedBackgroundJobPresentationModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/management/api/v1/background-job',
            query: {
                'skip': skip,
                'take': take,
            },
        });
    }

}
