"use client";

import React, { useEffect, useRef, useState } from "react";

import { ICustomImageINput } from "./interface";
import { showErrorToast, showSuccessToast } from "@/util/toast";

import styles from "./FileImageInput.module.scss";
import { stageAssets } from "@/services/services";

export const CustomFileUploadInput = ({
  placeholder,
  isShowLabel,
  labelText,
  errors,
  isShowIcon,
  ImageIcon,
  onChange,
}: ICustomImageINput) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_IMG_SIZE = 1;

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    fileRef.current?.click();
  };

  const handleUpload = async (formData: FormData) => {
    setFileSizeError("");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqpoj0kcn/upload",
        {
          method: "post",
          body: formData,
        }
      );

      if (!response.ok) {
        const message = `An error has uploading document: ${response.status}`;
        throw new Error(message);
      }

      const result = await response.json();

      showSuccessToast("Document uploaded successfully!");
      setImagePreview("");
      setIsLoading(false);
      return onChange(result.secure_url);
    } catch (error) {
      showErrorToast("Unable to upload document!");
      setIsLoading(false);
    }
  };

  const handleStageAssets = async () => {
    try {
      const response = await stageAssets();
      console.log("response: ", response);
    } catch (error) {}
  };

  useEffect(() => {
    if (imagePreview) {
      const formData = new FormData();

      console.log("imagePreview: ", imagePreview);

      // formData.append("file", imagePreview);
      // formData.append("upload_preset", "doxxamedias");
      // formData.append("cloud_name", "dqpoj0kcn");
      // formData.append("folder", "Doxxa");

      // handleUpload(formData);
      handleStageAssets();
    }
  }, [imagePreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (e.target.files) {
      const files = e.target.files;
      if (files.length > 0) {
        const fileSize = files[0].size;
        const fileSizeMb = fileSize / 1024 ** 2;

        if (fileSizeMb > MAX_IMG_SIZE) {
          setFileSizeError(
            `Image exceeds required file size: ${MAX_IMG_SIZE}MB`
          );
          setIsLoading(false);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(files[0]);
          setFileName(files[0].name);
        }
      }
    }
  };

  return (
    <div className={styles.InputContainer}>
      <div className={styles.InputAndIcon}>
        <div className={styles.InputImageUpload}>
          <label htmlFor="image">{isShowIcon && ImageIcon}</label>
          <p>
            <span
              className={styles.ImageUploadTextBold}
              onClick={handleImageClick}
            >
              Click to upload
            </span>{" "}
            {/* <span className={styles.ImageUploadTextLight}>
              or drag and drop
            </span> */}
          </p>
          <p className={styles.ImageUploadTextLight}>PNG and JPG (max. 1MB)</p>

          {isLoading ? (
            <p className={styles.UploadText}>uploading...</p>
          ) : (
            <p className={`${styles.UploadText} ${styles.FileName}`}>
              {fileName}
            </p>
          )}
        </div>

        <input
          className={styles.Input}
          type="file"
          ref={fileRef}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="none"
          onChange={handleChange}
          id="image"
          accept="image/png, image/jpeg"
        />
      </div>

      {errors &&
        errors?.map((error: any, i: any) => (
          <small className="d-block text-danger mt-1" key={i}>
            {error}
          </small>
        ))}

      {fileSizeError && (
        <small className="d-block text-danger mt-1">{fileSizeError}</small>
      )}
    </div>
  );
};
