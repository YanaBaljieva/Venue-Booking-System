import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Card, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [hosts, setHosts] = useState([]);
  const [emails, setEmails] = useState([]);

    const getEmails = async () => {

       hosts.map(async (host) => {
           const response = await axios.get("http://localhost:8080/api/get_emails/" + currentUser.username)
           setEmails(response.data);
       })
  };

  const getHosts = async () => {
       const response = await axios.get("http://localhost:8080/api/profile_host/" + currentUser.username)
       setHosts(response.data);
       getEmails();
  };


    useEffect (() => {
        getHosts();
    }, []);

  return (
    <div className="container">
      <div className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </div>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <div>
        <h2><strong>Hosted places</strong></h2>
        { hosts.length === 0 ?
                <Card className="jumbotron custom-jumbotron">
                    <Card.Body>
                        <div>
                            <h3>No resuls found.</h3>
                        </div>
                    </Card.Body>
                </Card> :


                hosts.map((item, index) => (
                    <Container key={index}>
                        <Link to={"/view/"+item.id}>
                            <Card className="jumbotron custom-jumbotron">

                                <Card.Body>
                                    <div>{item.name}</div>
                                    {item.booked_at.map((stuff,i) => (
                                        <div key={i}>
                                            <div>{stuff.date}</div>
                                            <div>{stuff.username}</div>
                                            <div>{emails[i]}</div>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Link>
                    </Container>
              ))}

      </div>
    </div>
  );
};

export default Profile;
