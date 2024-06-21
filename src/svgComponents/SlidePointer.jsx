const SlidePointer = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ cursor: "pointer", position: "relative", bottom: "20%" }}
    >
      <path
        d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM2.8993 6C2.8993 7.71247 4.28753 9.1007 6 9.1007C7.71247 9.1007 9.1007 7.71247 9.1007 6C9.1007 4.28753 7.71247 2.8993 6 2.8993C4.28753 2.8993 2.8993 4.28753 2.8993 6Z"
        fill="#F6F6F6"
      />
    </svg>
  );
};

export default SlidePointer;
