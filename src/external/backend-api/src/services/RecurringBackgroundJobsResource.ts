/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedRecurringBackgroundJobStatusResponseModel } from '../models/PagedRecurringBackgroundJobStatusResponseModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecurringBackgroundJobsResource {

    /**
     * @returns PagedRecurringBackgroundJobStatusResponseModel Success
     * @throws ApiError
     */
    public static getRecurringBackgroundJobStatus({
skip,
take = 100,
}: {
skip?: number,
take?: number,
}): CancelablePromise<PagedRecurringBackgroundJobStatusResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/management/api/v1/recurring-background-job-status',
            query: {
                'skip': skip,
                'take': take,
            },
        });
    }

}
