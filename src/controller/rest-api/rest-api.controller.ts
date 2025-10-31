import { Controller, Get, HttpException, Req } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import type { Request } from 'express';
import { CompanyLocationsService } from '../../services/company-locations-service/company-locations.service';

@Controller('')
export class RestApiController {
  constructor(private databaseService: CompanyLocationsService) {}

  @Get('/bulk/customers')
  public getBulkCustomers(@Req() req: Request): Observable<any> {
    const url = `/bulk/customers`;
    return this.databaseService.get$().pipe(
      catchError((err: Error) => {
        return throwError(() => new HttpException(err.message, 500));
      }),
    );
  }
}
