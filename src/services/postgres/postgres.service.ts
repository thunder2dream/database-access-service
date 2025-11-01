import { PoolConfig } from 'pg';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, mergeMap, map, finalize } from 'rxjs/operators';
import { IConnectionPool, IClient } from './postgres.service.i';
import { ConnectionPool } from './connection-pool';
import { PostgresConfig } from '../../environment/postgres';
import { DatabaseServerError } from '../utils/error';

@Injectable()
export class PostgresService implements OnModuleDestroy {
  public constructor() {}
  private disconnected = false;
  public onModuleDestroy() {
    if (this.disconnected === true) {
      return;
    }
    this.disconnected = true;
    Object.values(this.pools).forEach((obj) => {
      return obj.pool.pool
        .end()
        .then(() => console.log('Succeeded to disconnect with DB'))
        .catch(() => console.error('Failed to disconnect with DB'));
    });
  }
  public pools: { [x: string]: { key: string; pool: ConnectionPool } } = {};
  public createPool(config?: PoolConfig | string) {
    return new ConnectionPool(config);
  }
  /** * Get the connection pool instance by PoolConfig. * If not exist, create and return new instance by config object/string. * @param config connection string or config object. */
  public get(config: PoolConfig | string): IConnectionPool {
    const key = JSON.stringify(config);
    if (!this.pools[key]) {
      const pool = this.createPool(config);
      this.pools[key] = { key, pool };
    }
    return this.pools[key].pool;
  }
  public getClient$(postgresConfig: PostgresConfig): Observable<IClient> {
    const pool = this.get(postgresConfig);
    if (!pool) {
      console.log('Failed to connect to DB pool');
      return throwError(
        () => new DatabaseServerError(500, 'Failed to connect to DB pool'),
      );
    }
    return pool.connect$().pipe(
      tap(() => console.log('Succeeded to create connection to DB')),
      catchError((e) => {
        console.error('Failed to connect DB', e.stack);
        return throwError(() => e);
      }),
    );
  }
  public query$<T>(
    postgresConfig: PostgresConfig,
    query$: (client: IClient) => Observable<T>,
  ): Observable<T> {
    return this.getClient$(postgresConfig).pipe(
      mergeMap((client: IClient) => {
        return query$(client).pipe(
          catchError((err) => {
            client.disconnect();
            return throwError(() => err);
          }),
          finalize(() => client.disconnect()),
        );
      }),
    );
  }
  public controlTransaction$<T>(
    postgresConfig: PostgresConfig,
    transaction$: (client: IClient) => Observable<T>,
  ): Observable<T> {
    return this.getClient$(postgresConfig).pipe(
      mergeMap((client: IClient) =>
        client.beginTrans$().pipe(
          mergeMap(() =>
            transaction$(client).pipe(
              mergeMap((data) => client.commit$().pipe(map(() => data))),
              catchError((err) =>
                client.rollback$().pipe(
                  mergeMap(() => {
                    return throwError(() => err);
                  }),
                ),
              ),
              catchError((err) => {
                client.disconnect();
                return throwError(() => err);
              }),
            ),
          ),
          finalize(() => client.disconnect()),
        ),
      ),
    );
  }
}
