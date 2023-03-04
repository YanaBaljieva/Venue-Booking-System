import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Card, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [hosts, setHosts] = useState([]);

  const getHosts = async () => {
       const response = await axios.get("http://localhost:8080/api/profile_host/" + currentUser.username)
       setHosts(response.data);
  };


    useEffect (() => {
        getHosts();
    }, []);

  return (
    <Container>
      <Container className="profile-cards">
          <Card className="jumbotron custom-jumbotron-profile">
            <Card.Body>
                <h3 style={{"marginBottom":"30px"}}> My Profile </h3>
                 <p style={{"marginBottom":"10px"}}> Username: {currentUser.username} </p>
                 <p style={{"marginBottom":"10px"}}> Email: {currentUser.email} </p>
                 <p style={{"marginBottom":"10px"}}> Authorities:</p>
                 <ul>
                   {currentUser.roles &&
                     currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                 </ul>
            </Card.Body>
          </Card>

          <Card className="jumbotron custom-jumbotron-profile">
            <Card.Body>
                <h3 style={{"marginBottom":"30px"}}>
                   My Places
                </h3>
                { hosts.length === 0 ?
                                <Card className="jumbotron custom-jumbotron-notfound">
                                    <Card.Body>
                                        <div>
                                            <h4>
                                                No places were found.
                                                <Link style={{"color": "white"}} to={"/add"}>
                                                    <strong> Create one</strong>
                                                </Link>
                                            </h4>
                                        </div>
                                    </Card.Body>
                                </Card> :

                                hosts.map((item, index) => (
                                    <Link key={index} style={{"color": "white"}} to={"/view/"+item.id}>
                                        <p>{item.name}</p>
                                    </Link>

                              ))}
            </Card.Body>
          </Card>

      </Container>
      <Container>
        <h2 style={{"color":"white", "marginTop":"30px", "marginLeft":"35px"}}>Reservations</h2>
        { hosts.length === 0 ?
                <Card className="jumbotron custom-jumbotron">
                    <Card.Body>
                        <div>
                            <h3>Here &#787; s your schedule</h3>
                        </div>
                    </Card.Body>
                </Card> :

                hosts.map((item, index) => (
                     item.booked_at.length !== 0 ?
                       <Container key={index}>
                        <Card className="jumbotron custom-jumbotron">
                            <Card.Body>
                                <Link style={{"color":"white"}} to={"/view/"+item.id}>
                                    <h4 style={{"marginBottom":"20px"}}>{item.name}</h4>
                                </Link>
                                {item.booked_at.map((stuff,i) => (
                                    <div className="reservations-view" key={i}>
                                        <div>{stuff.date}</div>
                                        <div>{stuff.username}</div>
                                        <div>{stuff.email}</div>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                      </Container>  : null
                     ))}
      </Container>
    </Container>
  );
};

export default Profile;
