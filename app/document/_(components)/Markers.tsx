import { FaCaretDown } from "react-icons/fa";

interface MarkersProps {
  position: number;
  isDragging: boolean;
  isLeft: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

export default function Marker({
  position,
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
}: MarkersProps) {
  return (
    <>
      <div
        className={
          "absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
        }
        style={{ [isLeft ? "left" : "right"]: `${position}px` }}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <FaCaretDown
          className={
            "absolute left-1/2 top-0 h-full transform -translate-x-1/2 fill-blue-500"
          }
        />
        <div
          className={"absolute left-1/2 top-4 transform -translate-x-1/2"}
          style={{
            height: "100vh",
            width: "1px",
            transform: "scaleX(0.5)",
            backgroundColor: "#3b72f6",
            display: isDragging ? "block" : "none",
          }}
        />
      </div>
    </>
  );
}
