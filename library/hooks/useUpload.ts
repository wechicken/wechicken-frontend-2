import { useState } from 'react';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';

type Event<T = EventTarget> = {
  target: T;
};

const useUpload = (input: string) => {
  const [convertedImage, setConvertedImage] = useState(input);
  const [uploadedImage, setUploadedImage] = useState(input);

  const handleInputImage = (e: Event<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;
    setConvertedImage(window.URL.createObjectURL(e.target.files[0]));
    setUploadedImage(String(e.target.files[0]));
  };

  return { handleInputImage, convertedImage, ProfileIcon, uploadedImage };
};

export default useUpload;
