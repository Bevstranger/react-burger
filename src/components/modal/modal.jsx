import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ children, open, onClose, title }) => {
  // console.log(open);
  if (!open) {
    return null;
  }

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.code === "Escape" || event.code === "mouseDown") {
        onClose(false);
      }
    };

    const handleClickOutside = (event) => {
      if (event.target.closest(`.${styles.modal}`)) {
        return;
      }
      onClose(false);
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      {
        <div
          className={styles.modal}
          //   style={{
          //     position: "fixed",
          //     display: "flex",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     backgroundColor: "red",
          //     opacity: "0.9",
          //     inset: 0,
          //     zIndex: 100,
          //     width: "50vw",
          //     height: " 50vh",
          //   }}
        >
          <div className={styles.details}>
            <div>
              <CloseIcon
                className={styles.iconClose}
                type="primary"
                onClick={() => {
                  onClose();
                }}
              />
            </div>
            {title && (
              <div className={`text text_type_main-large ${styles.title} `}>
                {title}
              </div>
            )}
            {children}
          </div>
        </div>
      }
    </>,
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;