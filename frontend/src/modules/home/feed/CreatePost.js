import React, { useState } from "react";
import style from "./CreatePost.module.css";
import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import CancelIcon from "@mui/icons-material/Cancel";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../../redux/post_store";

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

  const style = {
    container: {
      boxShadow: "0 0.1rem 0.5rem rgb(0, 0, 0, 0.2)",
    },
    add_icon: {
      fontSize: "2rem",
    },
  };

  return (
    <div className="p-3 rounded-md" style={style.container}>
      <div
        className="flex items-center p-4 cursor-pointer rounded transition-all hover:bg-gray-100"
        onClick={handleOpen}
      >
        <AddIcon
          className="flex items-center justify-center p-2 primaryColor bg-gray-200 rounded-full mr-3"
          style={style.add_icon}
        />
        <div>
          <h3>Create Post</h3>
          <p className="text-sm text-gray-700">
            Share a photo/video or write something.
          </p>
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
