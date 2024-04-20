export interface Response<T> {
  message: string | undefined;
  description: string;
  code: string;
  success: boolean;
  data: T;
}
