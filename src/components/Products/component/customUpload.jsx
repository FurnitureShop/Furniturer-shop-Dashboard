import { useState } from "react";
import { getBase64, validate } from "store/ui-helper";
import { Upload } from "antd";

export function CustomUpload({ children }) {
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
      });
    }
  };

  const customUpload = ({ onError, onSuccess, file }) => {
    // const metadata = {
    //   contentType: "image/jpeg",
    // };
    // const storageRef = ref(storage, `files/${file.name}.png`); //a unique name for the image
    // try {
    //   // const uploadTask = uploadBytes(storageRef, file, metadata);
    //   console.log(file);
    //   onSuccess(null, file);
    // } catch (e) {
    //   onError(e);
    // }
  };
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={validate}
        onChange={handleChange}
        customRequest={customUpload}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : null}
        {children}
      </Upload>
    </div>
  );
}
