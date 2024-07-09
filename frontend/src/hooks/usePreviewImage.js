import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const showToast = useShowToast();
  const [imgUrl, setImgUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Invalid File type", "please select image file", "error");
      setImgUrl(null);
    }
  };
  // console.log(imgUrl);
  return { handleImageChange, imgUrl };
};

export default usePreviewImage;
