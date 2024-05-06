import React from "react";

function TextSpan({ text, textColor, onClick, IcAfter }) {
  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <span>{IcAfter && <IcAfter />}</span>
      <span
        onClick={onClick}
        className={`hover:underline ${textColor} cursor-pointer text-[18px]`}
      >
        {text}
      </span>
    </div>
  );
}

export default TextSpan;
