import React, { useState } from 'react';
import { Form, Container, select } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";


const New = function (){
    const [inputs, setInputs] = useState({
        visitNumber: '',
        location: 'Brampton',
        visitType: 'Parking Ticket',
        visitDate: new Date(),
        visitTime: '7:00 am',
        
      });
      const [visitDate, setVisitDate] = useState(new Date());
      const handleChange = visitDate => setVisitDate(visitDate);
      

    const [redirect, setRedirect] = useState(false);
    
    const handleSubmit = async event => {
        event.preventDefault();
    try {
        const resp = await Axios.post('/visits', inputs);
  
        if (resp.status === 200)  {
          toast("The visit was created successfully!!", {
            type: toast.TYPE.SUCCESS
          });
          setRedirect(true);  
        } else {
          toast("There was an issue creating the visit!!", {
            type: toast.TYPE.ERROR
          });
        }
      } catch (error) {
        toast("There was an issue creating the visit!!", {
          type: toast.TYPE.ERROR
        });
      }
    }

    const handleInputChange = async event => {
        event.persist();
    
        const { name, value } = event.target;
    
        setInputs(inputs => ({
          ...inputs,
          [name]: value
        }));
      };

      

    if (redirect) return (<Redirect to="/visits"/>);

    return (
        <Container className="my-5">
          <header>
            <h1>New Visit</h1>
          </header>
    
          <hr/>
    
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Visit Number:</Form.Label>
                <Form.Control
                  name="visitNumber"
                  onChange={handleInputChange}
                  value={inputs.visitNumber}
                />
              </Form.Group>
    
              <Form.Group>
                <Form.Label>location:</Form.Label>
                <Form.Control
                  as="select"
                  name="location"
                  onChange={handleInputChange}
                  defaultValue={inputs.location || 'Brampton'}
                >
                  <option value="Brampton">Brampton</option>
                  <option value="Peel">Peel</option>
                  <option value="Vaughn">Vaughn</option>
                  <option value="Bolton">Bolton</option>
                  
                </Form.Control>
              </Form.Group>
    
              <Form.Group>
                <Form.Label>Visit Type:</Form.Label>
                <Form.Control
                  as="select"
                  name="visitType"
                  onChange={handleInputChange}
                  defaultValue={inputs.visitType || 'Parking Ticket'}
                >
                  <option value="Parking Ticket">Parking Ticket</option>
                  <option value="Bail Hearing">Bail Hearing</option>
                  <option value="Crown summon">Crown summon</option>
                  <option value="Pardon Request">Pardon Request</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Visit Date:</Form.Label>
                <DatePicker                    
                    selected={visitDate}
                    onChange={ handleChange }
                    name="visitDate"
                    dateFormat="MM/dd/yyyy"
                />                
              </Form.Group>

              <Form.Group>
                <Form.Label>Visit Date:</Form.Label>
                <Form.Control
                  as="select"
                  name="visitTime"
                  onChange={handleInputChange}
                  defaultValue={inputs.visitTime || '7:00 am'}
                >
                  <option value="7:00 am">7:00 am</option>
                  <option value="9:00 am">9:00 am</option>
                  <option value="11:00 am">11:00 am</option>
                  <option value="1:00 pm">1:00 pm</option>
                  <option value="3:00 pm">3:00 pm</option>
                </Form.Control>
              </Form.Group>

              
    
              <Form.Group>
                <button type="submit" className="btn btn-primary">Create</button>
              </Form.Group>
            </Form>
          </div>
        </Container>
      );
    
};
export default New;