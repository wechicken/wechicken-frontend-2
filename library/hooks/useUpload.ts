import { ChangeEvent, useState } from 'react';
import ProfileIcon, { ProfileIconProps } from 'library/components/profileIcon/ProfileIcon';

type ReturnType = {
  handleInputImage: (e: ChangeEvent<HTMLInputElement>) => void;
    convertedImage: string;
    ProfileIcon: ({ size, img }: ProfileIconProps) => JSX.Element;
    uploadedImage: string;
}

const useUpload = (input: string): ReturnType => {
  const [convertedImage, setConvertedImage] = useState(input);
  const [uploadedImage, setUploadedImage] = useState(input);

  const handleInputImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target || !e.target.files) return;
    setConvertedImage(window.URL.createObjectURL(e.target.files[0]));
    setUploadedImage(String(e.target.files[0]));
  };

  return { handleInputImage, convertedImage, ProfileIcon, uploadedImage };
};

export default useUpload;