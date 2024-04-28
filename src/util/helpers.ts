export const handleError = (errorObject: { data: { message: string } }) => {
  return errorObject?.data?.message;
};
