export type TIdType = "BVN" | "NIN";

export enum TJourneySteps {
  INITIATION = "INITIATION",
  PRIMARY_KYC_VALIDATION = "PRIMARY_KYC_VALIDATION",
  SECONDARY_KYC_VALIDATION = "SECONDARY_KYC_VALIDATION",
  CREATION = "CREATION",
}

export interface IValidateKYCInitiatePayload {
  validationMethod: "OTP";
  deliveryType: "SMS_AND_EMAIL";
  smsOtpType: "SMS_OTP";
  idType: TIdType;
  idNumber: string;
  phoneNumber: string;
  emailAddress: string;
  phoneNumberMustMatchProvidedID: boolean;
  otpActionType: "ACCOUNT_OPENING";
}

export interface IValidateKYCCompletionPayload {
  validationKey: string;
  idType: TIdType;
  idNumber: string;
  validationMethod: "OTP";
  otp: string;
  dateOfBirth: string;
  livelinessVerificationId: string;
}

export interface ICreateAccountResponse {
  nin: string;
  bvn: string;
  maskedPhoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  email: string;
  idPhoneNumber: string;
  preferredPhoneNumber: string;
  completedPrimaryKYC: boolean;
  completedSecondaryKYC: boolean;
  primaryIdType: TIdType;
  secondaryIdType: TIdType;
  dateOfBirth: string;
  gender: string;
  currentJourneyStage: TJourneySteps;
  nextJourneyStage: TJourneySteps;
  lga: string;
  nationality: string;
  title: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  idImageLink: string;
  idImageLinkHash: string;
  validationKey: string;
  resumeJourney: boolean;
}

export interface ICompleteResumptionResponse extends ICreateAccountResponse {
  identityStatus: string;
  faceMatchScore: number;
  verificationId: string;
  message: string;
  image: string;
  verificationStatus: string;
  verified: boolean;
}
export interface IValidateKyCResponse {
  validationKey: string;
  idImageLink: string;
  idImageLinkHash: string;
}

export interface experienceType {
  title: string;
  isActive: boolean;
}

export enum Channels {
  MOBILE = "MOBILE",
  WEB = "WEB",
  USSD = "USSD",
  CHATBOT = "CHATBOT",
  WHATSAPP = "WHATSAPP",
}

export interface IOpenAccountPayload {
  primaryIDType: TIdType;
  primaryIDNumber: string;
  salutation: string | null;
  firstName: string | null;
  otherName: string | null;
  surname: string | null;
  dob: string | null;
  solId: string | null;
  bvn: string | null;
  nin: string | null;
  primaryIDPhoneNumber: string | null;
  gender: string | null;
  preferredPhoneNumber: string | null;
  email: string | null;
  address: string | null;
  newAddress: {
    addrLine1: string;
    houseNum: string;
    streetName: string;
    city: string;
    state: string;
    country: string;
  } | null;
  photoBase64: string | null;
  signatureImageBase64: string | null;
  branchCode: string | null;
  brokerCode: string | null;
  motherMaidenName: string | null;
  maritalStatus: string | null;
  occupation: string | null;
  referralCode: string | null;
  employmentStatus: string | null;
  nextOfKinFirstName: string | null;
  nextOfKinSurname: string | null;
  nextOfKinGender: string | null;
  nextOfKinRelationShip: string | null;
  nextOfKinPhoneNumber: string | null;
  nextOfKinEmail: string | null;
  username: string | null;
  password: string | null;
  transactionPin: string | null;
  channels: Channels[] | null;
}

export interface IUpload {
  upload_file: any;
}
