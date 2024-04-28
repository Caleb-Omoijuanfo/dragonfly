import { IStageAssets } from "@/app/interfaces";
import axiosInstance from ".";

export const stageAssets = () => {
  return axiosInstance.post<IStageAssets>(`/pipeline/assets/stage`);
};
