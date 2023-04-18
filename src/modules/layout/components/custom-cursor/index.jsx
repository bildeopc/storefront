import React, { useContext } from "react";

import style from './cursor.module.scss'

import CustomCursorContext from "./context/CustomCursorContext";

const CustomCursorWraper= ()=>{

  const { type } = useContext(CustomCursorContext);
  const secondaryCursor = React.useRef(null);
  const mainCursor = React.useRef(null);
  const positionRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  React.useEffect(() => {
    const handleMouseMove = (event) => { // Move the event handler function here
        const { clientX, clientY } = event;

        const mouseX = clientX;
        const mouseY = clientY;
        const secondaryCursorRef = secondaryCursor.current; // Get a reference to secondaryCursor element

        if (secondaryCursorRef) { // Null check
            positionRef.current.mouseX =
                mouseX - (secondaryCursorRef.clientWidth || 0) / 2;
            positionRef.current.mouseY =
                mouseY - (secondaryCursorRef.clientHeight || 0) / 2;
        }

        const mainCursorRef = mainCursor.current; // Get a reference to mainCursor element

        if (mainCursorRef) { // Null check
            mainCursorRef.style.transform = `translate3d(${mouseX -
                (mainCursorRef.clientWidth || 0) / 2}px, ${mouseY -
                (mainCursorRef.clientHeight || 0) / 2}px, 0)`;
        }
    };

    document.addEventListener("mousemove", handleMouseMove); // Attach the event listener with the updated event handler function

    return () => {
        // Clean up event listener
        document.removeEventListener("mousemove", handleMouseMove); // Remove the event listener with the updated event handler function
    };
}, []);

  React.useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      const secondaryCursorRef = secondaryCursor.current; // Get a reference to secondaryCursor element
  
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
  
      if (secondaryCursorRef) { // Null check
        secondaryCursorRef.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
    };
    followMouse();
  }, []);

  return (
    <div>
    <div className={style.mainCursor} ref={mainCursor}>
      <div className={style.mainCursorBackground}></div>
    </div>
    <div className={style.secondaryCursor} ref={secondaryCursor}>
      <div className={style.cursorBackground}></div>
    </div>
  </div>
  )
}

const CustomCursor = () => {
 
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    const handleMatchMedia = (event) => {
      setIsTouchDevice(event.matches);
    };

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMatchMedia);

    return () => {
      mediaQuery.removeEventListener("change", handleMatchMedia);
    };
  }, []);

  return (
     <>
     {isTouchDevice ? (
       <></>
     ) : (
      <CustomCursorWraper/>
     )}
   </>
  );
};

export default CustomCursor;
