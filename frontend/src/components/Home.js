import React, { useState, useEffect } from 'react';
import UserService from "../services/user.service";
import axios from 'axios';
import { InputGroup, Form, Button, Container } from 'react-bootstrap';

const Home = () => {
  const [content, setContent] = useState(""); //to show with different role

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);



  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/all_places')
      .then(response => setData(response.data))
  }, []);

  return (
     <Container>
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Search..."
                type="text"
            />
            <Button variant="outline-secondary" type="submit" id="button-addon1">Search
            </Button>
          </InputGroup>
          {data.map(item => (
            <div className="jumbotron custom-jumbotron">
                <div key={item.id}>
                  <div>{item.name}</div>
                  <div>{item.city}</div>
                </div>
            </div>
          ))}
    </Container>
  );
};

export default Home;