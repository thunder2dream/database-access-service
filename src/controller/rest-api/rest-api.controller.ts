import { Controller, Get, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { RequestToDatabaseService } from '../../services/request-to-db-service/request-to-db.service';

@Controller('')
export class RestApiController {
  constructor(private databaseService: RequestToDatabaseService) {}

  @Get('/bulk/customers')
  public getBulkCustomers(@Req() req: Request): Observable<any> {
    const url = `/bulk/customers`;
    return this.databaseService.get$(req, url);
  }
}
