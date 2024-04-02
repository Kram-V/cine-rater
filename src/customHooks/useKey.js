import { useEffect } from "react";

export function useKey(handleClose, keyCode) {
  useEffect(() => {
    function callback(e) {
      if (e.code === keyCode) {
        handleClose();
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [handleClose, keyCode]);
}
