import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  deletePostAction,
  getAllPostsByUserAction,
} from "../../redux/post_store";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";

const Posts = () => {
  const style = {
    icon: {
      fontSize: "5rem",
    },
  };
  const { userPosts } = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  const [hoverPost, setHoverPost] = useState(null);

  const [isDeletePostModalShow, setIsDeletePostModalShow] = useState(false);
  const [postId, setPostId] = useState("");

  const showDeletePostModal = (pId) => {
    setPostId(pId);
    setIsDeletePostModalShow(true);
  };

  const hideDeletePostModal = () => {
    setIsDeletePostModalShow(false);
  };

  const hoverOnPost = (postId) => {
    setHoverPost(postId);
  };

  const endHoverOnPost = () => {
    setHoverPost(null);
  };

  const deletePostHandler = async () => {
    await dispatch(deletePostAction(postId, auth.user._id));
    dispatch(getAllPostsByUserAction(params.id));
    hideDeletePostModal();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 mt-8">
      {userPosts.length === 0 ? (
        <div className="err_text font-semibold">No post available !</div>
      ) : (
        userPosts.map((item) => (
          <div
            className="p-2 min-h-[14rem] min-w-[15rem] max-h-[14rem] max-w-[15rem] border border-gray-300 rounded-sm"
            key={item._id}
            onMouseEnter={() => hoverOnPost(item._id)}
            onMouseLeave={endHoverOnPost}
          >
            {hoverPost === item._id && (
              <div className="flex justify-end ">
                <CancelRoundedIcon
                  className="err_text"
                  sx={{ cursor: "pointer" }}
                  onClick={() => showDeletePostModal(item._id)}
                />
              </div>
            )}

            {item.media.mediaUrl ? (
              <div>
                {item.mediaType === "photo" ? (
                  <img
                    src={item.media.mediaUrl}
                    alt=""
                    className="w-full object-contain h-[10rem]"
                  />
                ) : (
                  <video controls className="w-full object-contain h-[10rem]">
                    <source src={item.media.mediaUrl} />
                  </video>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[10rem] text-gray-300">
                <ImageNotSupportedIcon style={style.icon} />
              </div>
            )}

            <p className="text-sm mt-2">
              {item?.description.length > 20
                ? `${item?.description}...`
                : item?.description}
            </p>
          </div>
        ))
      )}

      {isDeletePostModalShow && (
        <Modal hideModal={hideDeletePostModal} title="Delete Post">
          {{
            content: (
              <div>
                <div>Are you sure you want to delete this post ?</div>
                <div className="flex justify-end mt-2">
                  <button
                    className="globalBtn err_bg"
                    onClick={deletePostHandler}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ),
          }}
        </Modal>
      )}
    </div>
  );
};

export default Posts;
