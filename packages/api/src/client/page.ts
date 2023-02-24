import { NestedPage, NestedUser } from '@tipdapp/types';
import { PageApi } from '../validation/database';
import { api } from './axiosConfig';

type FindResponse = {
  page: NestedPage;
  user: NestedUser;
};

const findByAffixUrl = async ({
  params,
  query,
}: {
  params: PageApi.FindByAffixUrl.Params;
  query?: PageApi.FindByAffixUrl.Query;
}) =>
  api.get<never, FindResponse>(`/page/${params.role}/${params.affixUrl}`, {
    params: query,
  });

const update = async (body: PageApi.Update.Body) =>
  api.put<never, { message: string }>('/page', body);

const page = { findByAffixUrl, update };

export { page };
