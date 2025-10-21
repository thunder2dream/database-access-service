import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestToOrganizationService {
    constructor(config: ConfigService,public service: ReqestApiService)
}
