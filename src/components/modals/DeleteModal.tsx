import React, { useState } from "react";
import { useModal } from "contexts/ModalContextProvider";
import { Button, Modal } from 'flowbite-react';

interface DeleteModalProps {
  delText?: String;
  deleteIt: Function;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { closeDeleteModal, isDeleteModal } = useModal();
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Modal show={isDeleteModal} onClose={closeDeleteModal}>
        <Modal.Header>
          {"Warning!"}
        </Modal.Header>
        <Modal.Body>
          <div className="py-1">
            <p className="m-0">{"Are you sure you want to delete it?"}</p>
            <p className="m-0">This can't be undone.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDeleteModal} color="light">
            Cancel
          </Button>
          <Button
            color="failure"
            onClick={() => {
              setLoading(true);
              props.deleteIt();
            }}
            disabled={loading}
          >
            {loading ? 'Deleting...' : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteModal;
