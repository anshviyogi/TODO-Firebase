import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {db} from './firebase'
import { useStateValue } from './StateProvider';
import { v4 as uuid } from 'uuid';

function AddTODO() {

  const[{user}] = useStateValue()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // Managing States
    const[title,setTitle] = useState('')    
    const[description,setDescription] = useState('')
    const[date,setDate] = useState('')
    const[creationTime,setCreationTime] = useState('')

    const handelTime = () =>{
      let time = new Date().toLocaleTimeString();
      setCreationTime(time.toString());
    }

    useEffect(()=>{
      handelTime()
    },[date])
    
    const handleClose = (e) =>{
      e.preventDefault()
      setShow(false)
      db.collection('todo2').add({
        userId:user.multiFactor.user.uid,
        title:title,
        description:description,
        date:date,
        id:uuid(),
        createdBy:user.multiFactor.user.email,
        creationTime:creationTime
      })
      .then(()=>{
        alert("Item Added Successfully")
        window.location.reload()
      })
      .catch(err => alert(err.message))
    }

    const handleCloseButton = ()=>{
      setShow(false)
    }

  return (
    <>
            <Button variant="primary" onClick={handleShow}>
        Add Items
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your To-Do Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            {/* Task Title */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="GYM . . ."
                autoFocus
                onChange={e => setTitle(e.target.value)}
              />

              {/* Task Description */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Go to gym"
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Task due date */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Due Date</Form.Label>
              <Form.Control
                type="date"
                onChange={e => setDate(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseButton}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>

          </Form>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default AddTODO