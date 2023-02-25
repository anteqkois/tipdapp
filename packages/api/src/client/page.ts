import { PageApi } from '../validation';
import { api } from './axiosConfig';

const findByAffixUrl = async ({
  params,
  queryParams,
}: {
  params: PageApi.FindByAffixUrl.Params;
  queryParams?: PageApi.FindByAffixUrl.Query;
}) =>
  api.get<never, PageApi.FindByAffixUrl.ResBody>(
    `/page/${params.role}/${params.affixUrl}`,
    {
      params: queryParams,
    }
  );

const update = async (body: PageApi.Update.Body) =>
  api.put<never, PageApi.Update.ResBody>('/page', body);

const page = { findByAffixUrl, update };

export { page };
