"use client";

import { FiUploadCloud } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { CustomFileUploadInput } from "@/components/CustomFileImageInput";
import { IUpload } from "./interfaces";

import styles from "./page.module.scss";

export default function Home() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      upload_file: "",
    },
  });

  const onSubmit = (values: IUpload) => {
    console.log("values: ", values);
  };

  return (
    <main className={styles.Main}>
      <div className={styles.UploadContainer}>
        <h1>Upload files</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Controller
              name="upload_file"
              control={control}
              render={({
                field: { onChange, value },
                formState: { errors },
              }) => {
                const errorMessage = errors.upload_file?.message;
                return (
                  <CustomFileUploadInput
                    isShowIcon
                    ImageIcon={<FiUploadCloud />}
                    {...{ value, onChange, errors: [errorMessage] }}
                  />
                );
              }}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
