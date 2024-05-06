import React, { memo } from "react";

function InputForm({ label }) {
  return (
    <div>
      <label htmlFor="phone" className="text-sm">
        {label}
      </label>
      <input
        type="text"
        id="phone"
        className="ouline-none bg-[#e8f0fe] p-2 rounded-md w-full"
      />
    </div>
  );
}

export default memo(InputForm);
