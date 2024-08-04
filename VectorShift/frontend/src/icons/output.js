import * as React from "react";

function OutputIcon(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M4 22h14a2 2 0 002-2V7.5L14.5 2H6a2 2 0 00-2 2v4" />
      <path d="M14 2v6h6M2 15h10M5 12l-3 3 3 3" />
    </svg>
  );
}

export default OutputIcon;