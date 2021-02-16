import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";
import "./WebcamCapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef]); //useCallback memoizes the previous output. if there are any dependencies changes then it will rerun the function again, else it uses back the old output
  const goToChats = () => {
    history.push("/chats");
  };
  return (
    <>
      <div className="webcamCapture">
        <div className="webcamCapture__chat">
          <ChatBubbleIcon fontSize="small" onClick={goToChats} />
        </div>
        <Webcam
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />

        <RadioButtonUncheckedIcon
          className="webcamCapture__button"
          onClick={capture}
          fontSize="large"
        />
      </div>
    </>
  );
}

export default WebcamCapture;
