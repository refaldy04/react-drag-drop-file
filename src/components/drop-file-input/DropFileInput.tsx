import "./drop-file-input.css";

import { imageConfig } from "../../config/ImageConfig";
import uploadConfig from "../../assets/cloud-upload-regular-240.png";
import { useRef, useState } from "react";

interface IProps {
  onFileChange: (files: File[]) => void;
}

const DropFileInput = ({ onFileChange }: IProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [fileList, setFileList] = useState<File[]>([]);

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files && e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList = [...fileList];
    updatedList.splice(updatedList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadConfig} alt="upload icon" />
          <p>Drag & Drop your file here</p>
        </div>

        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  imageConfig[
                    item.type.split("/")[1] as keyof typeof imageConfig
                  ] || imageConfig.default
                }
                alt="preview"
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default DropFileInput;
