import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../../redux/post_store";

const CreatePostModal = (props) => {
  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");

  const dispatch = useDispatch();

  const selectFile = (e) => {
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

  const createPost = () => {
    dispatch(createPostAction(desc, media, mediaType));
  };
  const style = {
    box: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      p: 3,
      border: "none",
    },
    cancel_icon: {
      fontSize: "1.3rem",
    },
    add_photo_icon: {
      fontSize: "2rem",
    },
  };
  return (
    <Modal
      open={props.isModalOpen}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.box}>
        <div className="flex items-center justify-between pb-1 border-b border-gray-300">
          <h3 className="text-gray-700">Create Post</h3>
          <CancelIcon
            className="text-red-600 cursor-pointer"
            style={style.cancel_icon}
            onClick={props.closeModal}
          />
        </div>

        <div className="mt-3">
          <div className="flex">
            <input
              className="outline-none"
              type="text"
              placeholder="Write something here..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-3">
            {!media ? (
              <>
                <label
                  htmlFor="uploadFile"
                  className="flex flex-col items-center w-full p-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
                >
                  <AddToPhotosIcon
                    className="bg-gray-100 rounded-full p-2 mb-2"
                    style={style.add_photo_icon}
                  />
                  <p className="text-gray-600">Add photos/videos</p>
                </label>
                <input
                  id="uploadFile"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*, video/*"
                  onChange={selectFile}
                />
              </>
            ) : (
              <>
                {mediaType === "photo" ? (
                  <img
                    src={media}
                    alt=""
                    className="h-10 w-full object-cover"
                  />
                ) : (
                  <video controls>
                    <source src={media} className="h-10 w-full object-cover" />
                  </video>
                )}
                <CancelIcon
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setMedia(null)}
                />
              </>
            )}
          </div>
          <div className=""></div>
          <div className="mt-2">
            <button
              onClick={createPost}
              className="w-full p-2 primaryBgColor text-white border-none cursor-pointer space-x-1"
            >
              Post
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
