import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import editicon from "../assets/chat-edit.svg"
import Form from 'react-bootstrap/Form';


function ChatBarPrivate() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>

        <div className="chat-bar" style={{display:'flex', gap:'10px'}}>
			<Button onClick={handleShow}> <img className="icon" src={editicon}></img>{'  '} New Chat</Button>
		</div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" placeholder="Username..." />
          </Form>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Create Chat
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ChatBarPrivate