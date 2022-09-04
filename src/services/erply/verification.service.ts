import { URLSearchParams } from 'url';

import { ErplyRequests } from '../../enums/erply/requests.enum';
import { RequestMethods } from '../../enums/request.methods.enum';
import { IErplyVerificationResponse, IErplyVerificationData } from '../../interfaces/erply/verification.interfaces';
import { axiosPost } from '../../utils/axios';

const {
  ERPLY_ACCOUNT_NUMBER,
  ERPLY_ACCOUNT_PASSWORD,
  ERPLY_ACCOUNT_USER,
  ERPLY_PATH,
} = process.env;

const ERPLY_URL = `https://${ERPLY_ACCOUNT_NUMBER}${ERPLY_PATH}`;

export const verifyErplyUser = async (): Promise<IErplyVerificationData> => {
  const params = new URLSearchParams();
  params.append('clientCode', ERPLY_ACCOUNT_NUMBER as string);
  params.append('username', ERPLY_ACCOUNT_USER as string);
  params.append('password', ERPLY_ACCOUNT_PASSWORD as string);
  params.append('request', ErplyRequests.VerifyUser);
  params.append('sessionLength', '900');

  const response = await axiosPost(
    `${ERPLY_URL}?${params}`,
    '',
    { method: RequestMethods.Post },
  ) as IErplyVerificationResponse;

  const { status, records } = response.data;
  return { status, records };
};
