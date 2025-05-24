import { useRef, useState } from "react";
import Markers from "./Markers";
import { useMutation, useStorage } from "@liveblocks/react/suspense";

export default function Ruler() {
  const markers = Array.from({ length: 83 }, (_, i) => i);
  const leftMargin = useStorage((root) => root.leftMargin);
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position);
  }, []);

  const rightMargin = useStorage((root) => root.rightMargin);
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position);
  }, []);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement | null>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MAX_SPACE = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MAX_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition); // TODO: make collaborative;
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MAX_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constraintRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMargin(constraintRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={
        "relative w-[816px] mx-auto print:hidden h-6 border-b flex items-end select-none border-gray-300"
      }
    >
      <div className={" h-full w-full relative"} id={"ruler-container"}>
        <Markers
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Markers
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className={"absolute inset-x-0 bottom-0 h-full"}>
          <div className={"relative h-full w-[816px]"}>
            {markers.map((marker) => {
              const position = (marker * 816) / 83;
              return (
                <div
                  key={marker}
                  className={"absolute bottom-0"}
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div
                        className={
                          "absolute bottom-0 w-[1px] h-2 bg-neutral-500"
                        }
                      />
                      <span
                        className={
                          "absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2"
                        }
                      >
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div
                      className={
                        "absolute bottom-0 w-[1px] h-1.5 bg-neutral-500"
                      }
                    />
                  )}
                  {marker % 5 !== 0 && (
                    <div
                      className={"absolute bottom-0 w-[1px] h-1 bg-neutral-500"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
