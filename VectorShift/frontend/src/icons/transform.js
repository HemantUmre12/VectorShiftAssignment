import * as React from "react";

function TransformIcon(props) {
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
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M5 13v.875C5 17.258 7.686 20 11 20" />
      <path d="M9 6 A3 3 0 0 1 6 9 A3 3 0 0 1 3 6 A3 3 0 0 1 9 6 z" />
      <path d="M21 18 A3 3 0 0 1 18 21 A3 3 0 0 1 15 18 A3 3 0 0 1 21 18 z" />
      <path d="M16 9l2 2 2-2" />
      <path d="M18 10v-.875C18 5.742 15.314 3 12 3M3 15l2-2 2 2" />
    </svg>
  );
}

export default TransformIcon;