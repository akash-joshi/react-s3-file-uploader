import React from "react";
import axios from "axios";

import "./styles.css";
import Camera from "./camera.svg";

export default function FileUpload() {
  const [uploadingStatus, setUploadingStatus] = React.useState(0);
  const [error, setError] = React.useState("");
  const [url, setUrl] = React.useState("");

  const copyToClipboard = str => navigator.clipboard.writeText(str);

  const uploadFile = e => {
    const file = e.target.files;
    setUploadingStatus(1);
    const formData = new FormData();
    formData.append("file", file[0]);
    axios
      .post(`/s3/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        setUrl(response.data.Location);
        setUploadingStatus(2);
      })
      .catch(error => {
        setUploadingStatus(-1);
        e.target.value = "";
        setError(`Error: ${error.response.data.msg}`);
      });
  };

  return (
    <div>
      <div
        style={{
          border: "1.3px dashed #CAD2EA",
          borderRadius: "16px",
          padding: "1em",
          display: "grid",
          gridTemplateColumns: "6.7em 1fr",
          background: "white"
        }}
      >
        <div>
          <label htmlFor={`file_uploader`} style={{ width: "100%" }}>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                padding: "1em",
                backgroundColor: "#EFF3FC",
                marginRight: "1em",
                height: "5em",
                textAlign: "center"
              }}
            >
              <Camera />
            </div>
          </label>
        </div>
        <div>
          <b style={{ fontSize: "18px" }}>Upload File</b>
          <p style={{ color: "#999", marginTop: "0em", marginBottom: "0.1em" }}>
            Click to upload
          </p>
        </div>
      </div>

      <input
        className="browser-default"
        style={{
          border: "2px solid #dfdfdf",
          padding: "0.7em",
          borderRadius: "8px",
          color: "#999",
          width: "100%",
          display: "none"
        }}
        placeholder={"Upload Linking Image"}
        type="file"
        onChange={uploadFile}
        required
        id={`file_uploader`}
      />
      {uploadingStatus === 1 && (
        <div
          className="valign-wrapper"
          style={{ color: "#5e83e1", fontWeight: 600, marginTop: "0.7em" }}
        >
          <div
            style={{ marginRight: "0.7em" }}
            className="preloader-wrapper small active"
          >
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
          Uploading
        </div>
      )}
      {uploadingStatus === 2 && (
        <div>
          <div style={{ color: "#08BD80", marginTop: "0.7em" }}>
            File Uploaded ✓
          </div>
          <br />
          URL: {url}
          <br />
          <br />
          <a
            style={{ color: "blue", cursor: "pointer", fontSize: 20 }}
            onClick={() => copyToClipboard(url)}
          >
            Copy to Clipboard
          </a>
        </div>
      )}
      {uploadingStatus === -1 && (
        <div style={{ color: "#F56767", marginTop: "0.7em" }}>
          Upload Failed X
          <br />
          {error}
        </div>
      )}
    </div>
  );
}
