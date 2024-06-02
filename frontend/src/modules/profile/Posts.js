import React from "react";
import { useSelector } from "react-redux";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const Posts = () => {
  const style = {
    icon: {
      fontSize: "5rem",
    },
  };
  const { userPosts } = useSelector((state) => state.post);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 mt-8">
      {userPosts?.map((item) => (
        <div className="p-2 min-h-[14rem] min-w-[15rem] max-h-[14rem] max-w-[15rem] border border-gray-300 rounded-sm">
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
      ))}
    </div>
  );
};

export default Posts;
