import { NestedPage, PageApi, PageValidation, User } from '@tipdapp/server';
import { api } from './apiConfig';


type FindResponse = {
  page: NestedPage;
  user: User;
};

export const findByAffixUrl = async ({
  params,
  query,
}: {
  params: PageApi.FindByAffixUrl.Params;
  query?: PageApi.FindByAffixUrl.Query;
}) => {
  return await api.get<never, FindResponse>(
    `/page/${params.role}/${params.affixUrl}`,
    { params: query }
  );
};

export const update = async (body: PageValidation.Update) => {
  return await api.put('/page', body);
};
