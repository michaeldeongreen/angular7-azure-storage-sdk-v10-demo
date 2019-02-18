import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, WebResource, HttpOperationResponse } from '@azure/ms-rest-js';

export class ClientRequestIDPolicy extends BaseRequestPolicy {
    private clientRequestId: string;

    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, clientRequestId: string) {
        super(nextPolicy, options);
        this.clientRequestId = clientRequestId;
      }
    
      async sendRequest(webResource: WebResource): Promise<HttpOperationResponse> {
        const CLIENT_REQUEST_ID = 'client-request-id';
        webResource.headers.set(CLIENT_REQUEST_ID, this.clientRequestId);
    
        const response = await this._nextPolicy.sendRequest(webResource);
        return response;
      }    
}
