import { NestedPage, NestedUser, PageApi } from '@tipdapp/database';
import { api } from './apiConfig';

type FindResponse = {
  page: NestedPage;
  user: NestedUser;
};

export const findByAffixUrl = async ({
  params,
  query,
}: {
  params: PageApi.FindByAffixUrl.Params;
  query?: PageApi.FindByAffixUrl.Query;
}) => api.get<never, FindResponse>(
    `/page/${params.role}/${params.affixUrl}`,
    { params: query }
  );

export const update = async (body: PageApi.Update.Body) => api.put<never, { message: string }>('/page', body);
