import React, { useEffect, useState } from "react";
import "./toaster.scss";
function Toaster({ shown, contents }) {
  const [showExitAnimation, setShowExitAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowExitAnimation(true), 3500);
  }, [shown]);

  return (
    <div className={"toaster"}>
      {shown && (
        <div
          className={
            "toaster-pop-up animated " +
            (showExitAnimation ? " fadeOut" : " fadeIn")
          }
        >
          {contents}
        </div>
      )}
    </div>
  );
}
export default Toaster;
