interface ServiceResponse<T> {
  data?: T;
  successful: boolean;
  errors: string[];
  statusCode: number;
}

export default ServiceResponse;
