import React, { useState, useEffect } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { db } from "./firebase";
import Chat from "./Chat";
import Fuse from "fuse.js";
import { selectUser } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const [tempPosts, setTempPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setTempPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    const fuse = new Fuse(posts, {
      keys: ["data.username"],
      threshold: 0.1,
    });

    const results = fuse.search(searchTerm).map(({ item }) => item);
    if (posts.length > 0 && searchTerm.length >= 2 && results.length > 0) {
      setPosts(results);
    } else {
      setPosts(tempPosts);
    }
  }, [searchTerm]);

  const takeSnap = () => {
    dispatch(resetCameraImage);
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input
            placeholder="Friends"
            type="text"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
          />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>

      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timeStamp, imageUrl, read },
          }) => {
            if (!read) {
              return (
                <Chat
                  key={id}
                  id={id}
                  username={username}
                  timeStamp={timeStamp}
                  imageUrl={imageUrl}
                  read={read}
                  profilePic={profilePic}
                />
              );
            }
          }
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
