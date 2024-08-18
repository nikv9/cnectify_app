import React from "react";

const UserDetailIdx = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const mode = queryParams.get("mode");
  return (
    <div className="flex-[4]">
      <div>asdf</div>
    </div>
  );
};

export default UserDetailIdx;
