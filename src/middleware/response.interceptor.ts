import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  status?: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          const dataValues = Object.values(data);
          const isEmpty = dataValues.every(isNull);
          return isEmpty ? { data, status: 404 } : { data };
        }
        return { data, status: 404 };
      }),
    );
  }
}

const isNull = (key: any) => {
  /*
   * Generic Function to check if array or object keys are null or not.
   */
  if (
    !key ||
    key.length === 0 ||
    (typeof key === 'number' && key === 0) ||
    (typeof key === 'string' && key === '')
  ) {
    return true;
  } else {
    return false;
  }
};
