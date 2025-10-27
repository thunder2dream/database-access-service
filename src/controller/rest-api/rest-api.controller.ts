import { Controller, Get, Req } from '@nestjs/common';
import { RequestToOrganizationService } from '../../services/request-to-organization/request-to-organization.service';
import { Observable } from 'rxjs';
import type { Request } from 'express';

@Controller('')
export class RestApiController {
  constructor(private organizationService: RequestToOrganizationService) {}

  @Get('/bulk/customers')
  public getBulkCustomers(@Req() req: Request): Observable<any> {
    const url = `/bulk/customers`;
    console.log('aaaaaa');
    return this.organizationService.get$(req, url);
  }
}
