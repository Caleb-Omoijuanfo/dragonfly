import {
  ICompleteResumptionResponse,
  ICreateAccountResponse,
  IOpenAccountPayload,
  IValidateKYCCompletionPayload,
  IValidateKYCInitiatePayload,
  IValidateKyCResponse,
  TIdType,
} from "@/app/interfaces";
import axiosInstance from ".";
import { Response } from "@/app/interfaces/response";

export const stageAssets = () => {
  return axiosInstance.post(`/pipeline/assets/stage`);
};

// Old Stuff below to be removed.
export const initiateNewAccount = (idType: TIdType, idNumber: string) => {
  return axiosInstance.get<Response<ICreateAccountResponse>>(
    `/api/v1/omni-channel/account-opening/initiation?idType=${idType}&idNumber=${idNumber}`
  );
};

export const validateKycInitiation = (data: IValidateKYCInitiatePayload) => {
  return axiosInstance.post<Response<IValidateKyCResponse>>(
    `/api/v1/omni-channel/account-opening/kyc-validation/initiate`,
    data
  );
};

export const validateKycCompletion = (data: IValidateKYCCompletionPayload) => {
  return axiosInstance.post<Response<IValidateKyCResponse>>(
    `/api/v1/omni-channel/account-opening/kyc-validation/complete-primary`,
    data
  );
};

export const validateKycCompleteSecondary = (
  data: IValidateKYCCompletionPayload,
  query: { primaryIdType: string; primaryIdNumber: string }
) => {
  return axiosInstance.post<Response<IValidateKyCResponse>>(
    `/api/v1/omni-channel/account-opening/kyc-validation/complete-secondary?primaryIdType=${query?.primaryIdType}&primaryIdNumber=${query?.primaryIdNumber}`,
    data
  );
};

export const initiateBasicValidation = (data: IValidateKYCInitiatePayload) => {
  return axiosInstance.post<Response<IValidateKyCResponse>>(
    `/api/v1/omni-channel/account-opening/initiate-basic-validation`,
    data
  );
};

export const completeBasicValidation = (
  data: IValidateKYCCompletionPayload
) => {
  return axiosInstance.post(
    `/api/v1/omni-channel/account-opening/complete-basic-validation`,
    data
  );
};

export const openAccount = (data: IOpenAccountPayload) => {
  return axiosInstance.post(
    `/api/v1/omni-channel/account-opening/open-account`,
    data
  );
};

export const completeResumptionValidation = (
  data: IValidateKYCCompletionPayload
) => {
  return axiosInstance.post<Response<ICompleteResumptionResponse>>(
    `/api/v1/omni-channel/account-opening/complete-resumption-validation`,
    data
  );
};
