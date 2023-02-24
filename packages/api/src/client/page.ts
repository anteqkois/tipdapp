import { NestedPage, NestedUser } from '@tipdapp/types';
import { PageApi } from '../validation';
import { api } from './axiosConfig';

type FindResponse = {
  page: NestedPage;
  user: NestedUser;
};

const findByAffixUrl = async ({
  params,
  queryParams,
}: {
  params: PageApi.FindByAffixUrl.Params;
  queryParams?: PageApi.FindByAffixUrl.Query;
}) =>
  api.get<never, FindResponse>(`/page/${params.role}/${params.affixUrl}`, {
    params: queryParams,
  });

const update = async (body: PageApi.Update.Body) =>
  api.put<never, PageApi.Update.ResBody>('/page', body);

const page = { findByAffixUrl, update };

export { page };
