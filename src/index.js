import React from "react";
import axios from "axios";

import "./styles.css";

export default function FileUpload({
  title,
  subtitle,
  setUrl,
  required,
  endpoint
}) {
  const [uploadingStatus, setUploadingStatus] = React.useState(0);
  const [error, setError] = React.useState("");

  const uploadFile = e => {
    console.log("uploading");
    const file = e.target.files;
    setUploadingStatus(1);
    const formData = new FormData();
    formData.append("file", file[0]);
    axios
      .post(endpoint, formData, {
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
        document.querySelector("#react-s3-file-uploader").value = "";
        setError(
          `Error: ${
            error.response.data.msg
              ? error.response.data.msg
              : "Could not connect to the Server."
          }`
        );
      });
  };

  return (
    <div>
      <label
        htmlFor={`react-s3-file-uploader`}
        style={{
          border: "1.3px dashed #CAD2EA",
          borderRadius: "16px",
          padding: "1em",
          display: "grid",
          gridTemplateColumns: "8.5em 1fr",
          background: "white"
        }}
      >
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            padding: "1em",
            backgroundColor: "#EFF3FC",
            marginRight: "1em",
            height: "5em",
            width: "5em",
            textAlign: "center"
          }}
        >
          <img
            src="https://raw.githubusercontent.com/akash-joshi/react-s3-file-uploader/master/src/camera.svg"
            alt="upload-icon"
            style={{ height: "2.5em", paddingTop: "20%" }}
          />
        </div>
        <div>
          <b style={{ fontSize: "18px" }}>{title}</b>
          <p style={{ color: "#999", marginTop: "0em", marginBottom: "0.1em" }}>
            {subtitle}
          </p>
        </div>
      </label>

      <input
        className="browser-default"
        style={{
          opacity: 0,
          position: "absolute",
          zIndex: -1
        }}
        type="file"
        onChange={uploadFile}
        required={required}
        id={`react-s3-file-uploader`}
      />
      {uploadingStatus === 1 && (
        <div
          className="valign-wrapper"
          style={{
            color: "#5e83e1",
            fontWeight: 600,
            marginTop: -15,
            marginLeft: -20
          }}
        >
          <div class="loader">
            <svg class="circular">
              <circle
                class="path"
                fill="none"
                r="20"
                cx="50"
                cy="50"
                stroke-width="3"
                stroke-miterlimit="10"
              />
            </svg>
          </div>
          <div>Uploading</div>
        </div>
      )}
      {uploadingStatus === 2 && (
        <div style={{ color: "#08BD80", marginTop: "0.7em" }}>
          File Uploaded â
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
