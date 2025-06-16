import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import ButtonBlueOutlined from "../ButtonBlueOutlined";
import ButtonBlue from "../ButtonBlue";

const UserModal = ({
  show,
  handleClose,
  handleChanges,
  title,
  text,
  nameClose = "Cancel",
  nameOpen = "Confirm",
  className = "",
  ...props
}) => {
  return (
    <div className={className} {...props}>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <ButtonBlueOutlined onClick={handleClose} name={nameClose} />
          <ButtonBlue onClick={handleChanges} name={nameOpen} size="sm" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

UserModal.propTypes = {
  /**
   * Controls whether the modal is shown
   */
  show: PropTypes.bool.isRequired,
  /**
   * Function to handle closing the modal
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Function to handle the main action (e.g., confirm)
   */
  handleChanges: PropTypes.func.isRequired,
  /**
   * Modal title text
   */
  title: PropTypes.string.isRequired,
  /**
   * Modal body text
   */
  text: PropTypes.string.isRequired,
  /**
   * Text for the close button
   */
  nameClose: PropTypes.string,
  /**
   * Text for the confirm/open button
   */
  nameOpen: PropTypes.string,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default UserModal;
