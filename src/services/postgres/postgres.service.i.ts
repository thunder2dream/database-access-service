import { Observable } from 'rxjs';

export interface IConnectionPool {
  connect$(): Observable<IClient>;
}

export interface IClient {
  query$<T>(sql: string, queryParams?: any[]): Observable<IClientResponse<T>>;
  queryByFile$<T>(
    filepath: string,
    queryParams?: any[],
  ): Observable<IClientResponse<T>>;
  beginTrans$(): Observable<void>;
  commit$(): Observable<void>;
  rollback$(): Observable<void>;
  disconnect(): void;
}

export interface IClientResponse<T> {
  count: number;
  records: T[];
}
