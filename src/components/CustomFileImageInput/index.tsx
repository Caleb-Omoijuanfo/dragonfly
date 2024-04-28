"use client";

import React, { useEffect, useRef, useState } from "react";

import { ICustomImageINput } from "./interface";
import { showErrorToast, showSuccessToast } from "@/util/toast";
import { stageAssets } from "@/services/services";
import useUploadAsset from "@/customhooks/useUploadAsset";

import styles from "./FileImageInput.module.scss";

export const CustomFileUploadInput = ({
  placeholder,
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

  const { handleUpload: handleUploadAsset } = useUploadAsset();

  const MAX_IMG_SIZE = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE;

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    fileRef.current?.click();
  };

  const handleGenerateUrl = async () => {
    try {
      const response = await stageAssets();

      if (response?.status === 200) {
        const { url } = response?.data;
        const formData = new FormData();
        formData.append("file", imagePreview);
        handleUploadAsset(url, formData);
      }
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (imagePreview) {
      handleGenerateUrl();
    }
  }, [imagePreview]);

  const isFileLessThanMaxSize = (files: FileList): boolean => {
    // Return true if file is less than the maximum file size

    const fileSize = files[0].size;
    const fileSizeMb = fileSize / 1024 ** 2;

    if (fileSizeMb > Number(MAX_IMG_SIZE)) {
      return fileSizeMb > Number(MAX_IMG_SIZE);
    } else {
      return fileSizeMb > Number(MAX_IMG_SIZE);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (e.target.files) {
      const files = e.target.files;

      const result = isFileLessThanMaxSize(files);

      if (result) {
        setFileSizeError(`Image exceeds required file size: ${MAX_IMG_SIZE}MB`);
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
          </p>
          <p className={styles.ImageUploadTextLight}>(max. {MAX_IMG_SIZE}MB)</p>

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
        <small className={styles.ErrorMessage}>{fileSizeError}</small>
      )}
    </div>
  );
};
