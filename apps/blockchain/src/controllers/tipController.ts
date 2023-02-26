import { HttpStatusCode, TipApi, tipApi, TipperApi } from '@tipdapp/api';

const signature = async (req: TipApi.Signature.Req, res: TipApi.Signature.Res) => {
  const parsedReq = tipApi.signature.parse({ ...req });


  res.status(HttpStatusCode.Ok).json({ tokens: data });
};

export const tipController = {
  signature,
};
