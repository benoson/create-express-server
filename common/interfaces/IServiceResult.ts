export interface IServiceResult<T> {
  ok: boolean;
  data?: T;
  message?: string;
  error?: string;
}
