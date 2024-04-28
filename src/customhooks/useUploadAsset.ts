import { handleError } from "@/util/helpers";
import { showErrorToast } from "@/util/toast";

const useUploadAsset = () => {
  const handleUpload = (url: string, formData: FormData) => {
    fetch(url, {
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": "image/jpeg",
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })

      .catch((error) => {
        const _error = handleError(error);
        showErrorToast(_error);
      });
  };

  return { handleUpload };
};

export default useUploadAsset;
