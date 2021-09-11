import { ChangeEvent, useState } from 'react';
import ProfileIcon, { ProfileIconProps } from 'library/components/profileIcon/ProfileIcon';

type ReturnType = {
  handleInputImage: (e: ChangeEvent<HTMLInputElement>) => void;
  convertedImage: string;
  ProfileIcon: ({ size, img }: ProfileIconProps) => JSX.Element;
  uploadedImage: File | undefined;
};

const useUpload = (input: string): ReturnType => {
  const [convertedImage, setConvertedImage] = useState(input);
  const [uploadedImage, setUploadedImage] = useState<File>();

  const handleInputImage = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (!e.target || !files) return;
    setConvertedImage(window.URL.createObjectURL(files[0]));
    setUploadedImage(files[0]);
  };

  return { handleInputImage, convertedImage, ProfileIcon, uploadedImage };
};

export default useUpload;
