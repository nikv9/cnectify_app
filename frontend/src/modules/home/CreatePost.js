import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreatePostModal from "./CreatePostModal";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
    <div className="p-3 bg-white rounded-md" style={style.container}>
      <div
        className="flex items-center p-4 cursor-pointer rounded transition-all hover:bg-gray-100"
        onClick={openModal}
      >
        <AddIcon
          className="flex items-center justify-center p-2 primary_clr bg-gray-200 rounded-full mr-3"
          style={style.add_icon}
        />
        <div>
          <h3>Create Post</h3>
          <p className="text-sm text-gray-700">
            Share a photo/video or write something.
          </p>
        </div>
      </div>

      <CreatePostModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default CreatePost;
