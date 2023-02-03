import { Card, Container, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ViewHost = () => {


    const[host, setHost] = useState({});
    let urlElements = window.location.href
                        .substring(window.location.href
                        .lastIndexOf('/')+1);

    useEffect(() => {
        axios.get("http://localhost:8080/api/hosts/"+ urlElements)
            .then(response => setHost(response.data))
            .catch(err => console.error(err))

    }, [urlElements]);

    return (
         <Container>

             <Card className="jumbotron custom-jumbotron">
                <Card.Body>
                    <h2>Object Details</h2>
                        <p>ID: {host.id}</p>
                        <p>Name: {host.name}</p>
                        <p>Description: {host.description}</p>
                        <Button>Reserve</Button>
                </Card.Body>
             </Card>
         </Container>

    );

}

export default ViewHost;


