import { ReactNode } from "react";

export interface ICustomImageINput {
  placeholder?: string;
  customStyle?: object;
  isShowLabel: boolean;
  labelText?: string;
  errors?: any;
  isShowIcon?: boolean;
  ImageIcon?: ReactNode;
  onChange?: any;
}
