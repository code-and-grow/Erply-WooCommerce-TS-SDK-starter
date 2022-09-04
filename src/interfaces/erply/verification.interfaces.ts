export interface IErplyVerifiedUser {
  sessionKey: string;
  sessionLength: number;
}

export interface IErplyVerificationStatus {
  errorCode: number;
  requestUnixTime: number;
  responseStatus: string;
}

export interface IErplyVerificationData {
  status: IErplyVerificationStatus;
  records: [IErplyVerifiedUser];
}

export interface IErplyVerificationResponse {
  data: IErplyVerificationData;
}
