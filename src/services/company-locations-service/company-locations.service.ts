import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { AxiosRequestConfig } from 'axios';
import * as _path from 'path';
import * as fs from 'fs';
import { PostgresService } from '../postgres/postgres.service';
import { IClient, IClientResponse } from '../postgres/postgres.service.i';
import { Customer } from './company-locations.service.i';

export const path = { ..._path };
export const externals = {
  readFile: fs.promises?.readFile,
};

@Injectable()
export class CompanyLocationsService {
  public readonly sqlDir = path.join(__dirname, `../../assets/sql`);

  constructor(
    private config: ConfigService,
    public postgres: PostgresService,
  ) {}

  public get$(): Observable<Customer[]> {
    return this.postgres
      .query$(this.config.postgresConfig(), (client: IClient) => {
        const sqlPath = `${this.sqlDir}/select-customers.sql`;
        const placeHolder = [];
        return client.queryByFile$<Customer>(sqlPath, placeHolder);
      })
      .pipe(
        map((res: IClientResponse<Customer>) => {
          return res.records;
        }),
      );
  }

  public post$(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<any> {
    return of(null);
  }

  public delete$(path: string, config?: AxiosRequestConfig): Observable<any> {
    return of(null);
  }
}
