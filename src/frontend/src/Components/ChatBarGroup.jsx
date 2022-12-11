import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import editicon from "../assets/chat-edit.svg"
import addgroupicon from "../assets/group-add.svg"

function ChatBarGroup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>

        <div className="chat-bar" style={{display:'flex', gap:'10px'}}>
			<Button onClick={handleShow}> <img style={{height:'15px'}} src={addgroupicon}></img>{'  '} New Group Chat</Button>
		</div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ChatBarGroup