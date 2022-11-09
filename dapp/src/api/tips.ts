import { api } from './apiConfig';

type FindParams = {
  page?: number;
  pageSize?: number;
};
// err.response?.data.error[0].message;
type ErrorResponse = {
  response?: { data?: { error: [{ message?: string }] } };
};

type Tip = any;

type SuccessResponse = (Tip & {
  token: {
    symbol: string;
    name: string;
  };
  tipper: {
    nick: string;
  };
})[];

// type FindResponse =
//   | (Tip & {
//       token: {
//         symbol: string;
//         name: string;
//       };
//       tipper: {
//         nick: string;
//       };
//     })[]
//   | ErrorResponse;
  type FindResponse = {tips: (Tip & {
  token: {
    symbol: string;
    name: string;
  };
  tipper: {
    nick: string;
  };
  })[]};

// type FindResponse = {user: string}
// type FindResponse = SuccessResponse | ErrorResponse;

export const find = async (params: FindParams) =>
  await api.get<never, FindResponse>('tip', {
    params,
  });
