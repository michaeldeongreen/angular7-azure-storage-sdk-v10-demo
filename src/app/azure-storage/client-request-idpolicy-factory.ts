import { RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from '@azure/ms-rest-js';
import { ClientRequestIDPolicy } from './client-request-idpolicy';

export class ClientRequestIDPolicyFactory implements RequestPolicyFactory {
    private clientRequestId: string;
    constructor(clientRequestId: string) {
      this.clientRequestId = clientRequestId;
    }
  
     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): ClientRequestIDPolicy {
       return new ClientRequestIDPolicy(nextPolicy, options, this.clientRequestId);
     }    
}
