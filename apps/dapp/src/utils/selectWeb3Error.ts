export const selectWeb3Error = (error: any): string => {
  switch (error.code) {
    case 4001:
      return error.message;
    case -32603:
      // TODO you must use regex to get exacly error message
      return error.message;

    default:
      return error.reason;
  }
};
