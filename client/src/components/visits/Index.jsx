import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Index = function ({user}) {

    const [visits, setVisits] = useState([]);
  
    useEffect(() => {
      (async () => {
        await getVisits();
      })();
    }, []);
  
    //Function to get visits
    const getVisits = async () => {
      const visitsResp = await Axios.get('/api/visits');
      if (visitsResp.status === 200) setVisits(visitsResp.data);
    };
    
    //delete visit function
    const deleteVisit = async visit => {
        try {
          const resp = await Axios.post('/api/visits/delete', {
            id: visit._id
          });
    
          if (resp.status === 200) toast("The visit was deleted successfully", {type: toast.TYPE.SUCCESS});
    
          await getVisits();
        } catch (error) {
          toast("There was an error deleting this visit", {type: toast.TYPE.ERROR});
        }
      };
  
    return (
      <Container className="my-5">
        <header>
            <h1>Visits</h1>
        </header>
        <hr/>
        <div className="content">
          {visits && visits.map((visit, i) => (
            <div key={i} className="card my-3">
              <div className="card-header clearfix">
                <div className="float-left">
                  <h5 className="card-title">
                    {visit.visitNumber}
                  </h5>
  
                  {visit.user ? (
                    <small>~{visit.user.fullname}</small>
                  ) : null}
                </div>
                    
                <div className="float-right">
                  <small>{visit.updatedAt}</small>
                </div>
              </div>
  
              <div className="card-body">
                <p className="card-text">
                Your visit is on <strong>{ visit.visitDate}</strong>.
                </p>
                <p className="card-text">
                Your visit is scheduled at  {visit.location} location.
                </p>
              </div>
  
              {user ? (
                <div className="card-footer">
                  <Link to={{
                    pathname: "/visits/Edit",
                    state: {
                      id: visit._id
                    }
                  }}>
                    <i className="fa fa-edit"></i>
                  </Link>
  
                  <button type="button"  onClick={() => deleteVisit(visit)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    );
  
  };

  export default Index;