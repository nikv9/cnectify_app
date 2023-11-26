import React, { useState } from "react";
import style from "./CreatePost.module.css";
import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import CancelIcon from "@mui/icons-material/Cancel";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { createPostAction } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 5,
  border: "1px solid gray",
};

const CreatePost = () => {
  const { user } = useSelector((state) => state.auth);

  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fileInputHandle = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(selectedFile);

    let fileType = selectedFile.type.startsWith("image") ? "photo" : "video";
    setMediaType(fileType);

    const reader = new FileReader();
    //  console.log(reader);
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      setMedia(reader.result);
    };
  };

  const createPostHandle = () => {
    dispatch(createPostAction(desc, media, mediaType));
  };

  return (
    <div className={style.container}>
      <div className={style.elem} onClick={handleOpen}>
        <AddIcon className={style.icon} />
        <div className={style.text}>
          <h3>Create Post</h3>
          <p>Share a photo/video or write something.</p>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <div className={style.modal_header}>
            <h3>Create Post</h3>
            <CancelIcon
              style={{ cursor: "pointer", color: "var(--crimson_color)" }}
              onClick={handleClose}
            />
          </div>

          <div className={style.upload_container}>
            <div className={style.upload_input}>
              <input
                type="text"
                placeholder="Write something here..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={style.upload_file}>
              {!media ? (
                <>
                  <label
                    htmlFor="uploadFile"
                    className={style.upload_file_label}
                  >
                    <AddToPhotosIcon className={style.uploadIcon} />
                    <p>Add photos/videos</p>
                  </label>
                  <input
                    id="uploadFile"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*, video/*"
                    onChange={fileInputHandle}
                  />
                </>
              ) : (
                <>
                  {mediaType === "photo" ? (
                    <img src={media} alt="" />
                  ) : (
                    <video controls>
                      <source src={media} />
                    </video>
                  )}
                  <CancelIcon
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => setMedia(null)}
                  />
                </>
              )}
            </div>
            <div className={style.selected_img_container}></div>
            <div className={style.upload_btn}>
              <button onClick={createPostHandle}>Post</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
