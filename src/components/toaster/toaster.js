import React, { useEffect, useState } from "react";
import "./toaster.scss";
function Toaster({ shown, contents, hideOnTimeOut }) {
  const [showExitAnimation, setShowExitAnimation] = useState(false);

  useEffect(() => {
    if (shown && hideOnTimeOut) {
      setTimeout(() => setShowExitAnimation(true), 3500);
    }
  }, [shown]);

  return (
    <div className={"toaster"}>
      {shown && (
        <div
          className={
            "toaster-pop-up animate__animated animate__" +
            (showExitAnimation ? "fadeOutDown" : "fadeInUp")
          }
        >
          {contents}
        </div>
      )}
    </div>
  );
}
export default Toaster;
