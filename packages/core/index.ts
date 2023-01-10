export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export type ReturnTypesOfFunctionProps<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
}[keyof T];

export type RemoteDataNotAsked = { type: 'NOT_ASKED' };
export type RemoteDataLoading = { type: 'LOADING' };
export type RemoteDataReloading = {
  type: 'RELOADING';
};
export type RemoteDataFailure<E> = { type: 'FAILURE'; error: E };
export type RemoteDataSuccess<D = unknown> = { type: 'SUCCESS'; data: D };
export type RemoteData<E, D> =
  | RemoteDataNotAsked
  | RemoteDataLoading
  | RemoteDataReloading
  | RemoteDataFailure<E>
  | RemoteDataSuccess<D>;

export type FoldHandlers<E, D, R> = {
  notAsked: () => R;
  success: (data: D) => R;
  loading?: () => R;
  reloading?: () => R;
  failure?: (error: E) => R;
};

export type FolderHandlersRequired<E, D, R> = Required<
  Omit<FoldHandlers<E, D, R>, 'reloading'>
> & {
  reloading?: () => R;
};

export type FoldHandlersA<RDS, R> = {
  notAsked: () => R;
  success: (data: Extract<RDS, { type: 'SUCCESS'; data: unknown }>['data'][]) => R;
  loading?: () => R;
  reloading?: () => R;
  failure?: (error: Extract<RDS, { type: 'FAILURE'; error: unknown }>['error'][]) => R;
};

export type FolderHandlersARequired<RDS, R> = Required<
  Omit<FoldHandlersA<RDS, R>, 'reloading'>
> & {
  reloading?: () => R;
};

/**
 * Return NOT_ASKED state
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.notAsked();
 */
export const notAsked = (): RemoteDataNotAsked => ({ type: 'NOT_ASKED' });

/**
 * Return LOADING state
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.loading();
 */
export const loading = (): RemoteDataLoading => ({ type: 'LOADING' });

/**
 * Return RELOADING state
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.reloading();
 */
export const reloading = (): RemoteDataReloading => ({ type: 'RELOADING' });

/**
 * Return SUCCESS state with data
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.success({ userId: 1000 });
 */
export const success = <D>(data: D): RemoteDataSuccess<D> => ({
  type: 'SUCCESS',
  data,
});

/**
 * Return FAILURE state with error
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.failure(new Error('error'));
 */
export const failure = <E>(error: E): RemoteDataFailure<E> => ({
  type: 'FAILURE',
  error,
});

/**
 * Return true if remoteData is notAsked, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.notAsked();
 *   if (RD.isNotAsked(data)) {
 *   // ...your code
 *   }
 */
export function isNotAsked<R extends RemoteData<unknown, unknown>>(
  remoteData: R,
): boolean;

/**
 * Return true if one of remoteData is notAsked, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data1 = RD.notAsked();
 *   const data2 = RD.loading();
 *
 *   if (RD.isNotAsked([data1, data2])) {
 *   // ...your code
 *   }
 */
export function isNotAsked<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isNotAsked(remoteData: any): remoteData is RemoteDataNotAsked {
  return Array.isArray(remoteData)
    ? remoteData.some((rd) => rd.type === 'NOT_ASKED')
    : remoteData.type === 'NOT_ASKED';
}

/**
 * Return true if remoteData is loading, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.loading();
 *   if (RD.isLoading(data)) {
 *   // ...your code
 *   }
 */
export function isLoading<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;

/**
 * Return true if one of remoteData is loading, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data1 = RD.notAsked();
 *   const data2 = RD.loading();
 *
 *   if (RD.isNotAsked([data1, data2])) {
 *   // ...your code
 *   }
 */
export function isLoading<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isLoading(remoteData: any): remoteData is RemoteDataLoading {
  return Array.isArray(remoteData)
    ? remoteData.some((rd) => rd.type === 'LOADING')
    : remoteData.type === 'LOADING';
}

/**
 * Return true if remoteData is reloading, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.reloading();
 *   if (RD.isReloading(data)) {
 *   // ...your code
 *   }
 */
export function isReloading<R extends RemoteData<unknown, unknown>>(
  remoteData: R,
): boolean;

/**
 * Return true if one of remoteData is reloading, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data1 = RD.notAsked();
 *   const data2 = RD.reloading();
 *
 *   if (RD.reloading([data1, data2])) {
 *   // ...your code
 *   }
 */
export function isReloading<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isReloading(remoteData: any): remoteData is RemoteDataReloading {
  return Array.isArray(remoteData)
    ? remoteData.some((rd) => rd.type === 'RELOADING')
    : remoteData.type === 'RELOADING';
}

/**
 * Return true if remoteData is success, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.success(1);
 *   if (RD.isSuccess(data)) {
 *   console.log(data.data); // typesave
 *   }
 */
export function isSuccess<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;

/**
 * Return true if ALL of remoteData is success, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data1 = RD.success(1);
 *   const data2 = RD.success(2);
 *
 *   if (RD.isSuccess([data1, data2])) {
 *   console.log(data1.data, data2.data); // typesave
 *   }
 */
export function isSuccess<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isSuccess(remoteData: any): remoteData is RemoteDataSuccess<unknown> {
  return Array.isArray(remoteData)
    ? remoteData.every((rd) => rd.type === 'SUCCESS')
    : remoteData.type === 'SUCCESS';
}

/**
 * Return true if remoteData is failure, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.failure(new Error('some error'));
 *   if (RD.isFailure(data)) {
 *   // ...your code
 *   }
 */
export function isFailure<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;

/**
 * Return true if one of remoteData is failure, else false
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data1 = RD.failure(new Error('some error'));
 *   const data2 = RD.failure(new Error('some another error'));
 *
 *   if (RD.isFailure([data1, data2])) {
 *   // ...your code
 *   }
 */
export function isFailure<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isFailure(remoteData: any): remoteData is RemoteDataFailure<unknown> {
  return Array.isArray(remoteData)
    ? remoteData.some((rd) => rd.type === 'FAILURE')
    : remoteData.type === 'FAILURE';
}

/**
 * Accept remote data and orElse function and if SUCCESS return data, else all orElse
 *
 * @category Error handling / accessor
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RD.successOrElse(data, () => -1); // -1
 *
 *   // example 2
 *   const data = RD.success(1);
 *   const result = RD.successOrElse(data, () => -1); // 1
 */
export function successOrElse<T extends RemoteData<unknown, unknown>, R>(
  remoteData: T,
  orElse: () => R,
): (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;

/**
 * Accept array of remote data and orElse function and if ALL SUCCESS return array of
 * data, else all orElse
 *
 * @category Error handling / accessor
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   // example 1
 *   const data1 = RD.notAsked();
 *   const data2 = RD.notAsked();
 *   const result = RD.successOrElse([data1, data2], () => [0, 0]); // [0, 0]
 *
 *   // example 2
 *   const data1 = RD.success(1);
 *   const data2 = RD.success(2);
 *   const [first, second] = RD.successOrElse(data, () => [0, 0]); // [1, 2]
 */
export function successOrElse<T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>, R>(
  remoteData: T,
  orElse: () => R,
):
  | (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never)
  | R;

export function successOrElse(remoteData: any, orElse: any) {
  if (Array.isArray(remoteData)) {
    return isSuccess(remoteData as ArrayTwoOrMore<RemoteData<unknown, unknown>>)
      ? remoteData.map((rd) => rd.data)
      : orElse(remoteData);
  }

  if (isSuccess(remoteData)) {
    return remoteData.data;
  }

  return orElse(remoteData);
}

/**
 * Accept remote data and object with handlers (state as cb)
 *
 * @category Pattern matching
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RD.fold(data, { notAsked: () => 'no data', loading: () => 'loading...', success: (data) => `data: ${data}`);
 */
export function fold<E, D, R>(
  remoteData: RemoteData<E, D>,
  foldHandlers: FoldHandlers<E, D, R>,
): ReturnTypesOfFunctionProps<R>;

/**
 * Accept array of remote data and object with handler (state as cb)
 *
 * @category Pattern matching
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   // example 1
 *   const data1 = RD.notAsked();
 *   const data2 = RD.notAsked();
 *
 *   // return 'no data':
 *   const result = RD.fold([data1, data2], { notAsked: () => 'no data', loading: () => 'loading...', success: (data) => `data: ${data}`);
 *
 *   // example 2
 *   const data1 = RD.success(1);
 *   const data2 = RD.success(2);
 *
 *   // return 3:
 *   const result = RD.fold([data1, data2], { notAsked: () => 'no data', loading: () => 'loading...', success: ([a, b]) => a + b);
 */
export function fold<RDS, R>(
  remoteData: ArrayTwoOrMore<RDS>,
  foldHandlers: FoldHandlersA<RDS, R>,
): ReturnTypesOfFunctionProps<R>;

export function fold(
  remoteData: any,
  { notAsked, loading, failure, success, reloading }: any,
) {
  if (Array.isArray(remoteData)) {
    if (failure) {
      const failedRds = remoteData.filter((rd) => isFailure(rd));
      if (failedRds.length > 0) {
        return failure(failedRds.map((rd) => rd.error));
      }
    }

    if (loading) {
      const loadingRds = remoteData.filter((rd) => isLoading(rd));

      if (loadingRds.length > 0) {
        return loading();
      }
    }

    if (reloading) {
      const reloadingRds = remoteData.filter((rd) => isReloading(rd));

      if (reloadingRds.length > 0) {
        return reloading();
      }
    }

    const successRds = remoteData.filter((rd) => isSuccess(rd));

    if (remoteData.length === successRds.length) {
      return success(successRds.map((rd) => rd.data));
    }

    return notAsked();
  }

  if (remoteData.type === 'LOADING' && loading) {
    return loading();
  }

  if (remoteData.type === 'RELOADING' && reloading) {
    return reloading();
  }

  if (remoteData.type === 'FAILURE' && failure) {
    return failure(remoteData.error);
  }

  if (remoteData.type === 'SUCCESS') {
    return success(remoteData.data);
  }

  return notAsked();
}
