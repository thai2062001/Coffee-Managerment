import React, { memo } from "react";

function Button({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`p-2 ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    >
      {text}
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  );
}

export default memo(Button);
