import { Card, Container, Button, Row, Col, Form, Alert, ListGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import React from 'react';
import { addMonths } from 'date-fns';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/auth.service";

const ViewHost = () => {

    const [startDate, setStartDate] = useState(null);
    const[isSelectedDate, setIsSelectedDate] = useState(false);
    const[host, setHost] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [reserveSuccessful, setReserveSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [reserveMessage, setReserveMessage] = useState("");
    let urlElements = window.location.href
                        .substring(window.location.href
                        .lastIndexOf('/')+1);

   const [dates, setDates] = useState([]);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   const [reviews, setReviews] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await AuthService.postReview(urlElements, rating, comment).then(
             (response) => {
                console.log(response.data);
                setMessage(response.data.message);
                setSuccessful(true);
             },
             (error) => {
                const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
                setMessage(resMessage);
                setSuccessful(false);
             }                                                            );

        } catch (error) {
          console.error(error);
          setError(true);
        }
      };
    const handleStarClick = (newRating) => {
            setRating(newRating);
          };

   const reserve = async () => {

       if (!startDate) {
                 setReserveMessage("please, select a date");
                 setIsSelectedDate(false);
                 setReserveSuccessful(false);
                 return;
               }
        setIsSelectedDate(true);
        const req = new Date(startDate);
        req.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());

       await AuthService.reservePlace(urlElements, req.toISOString().slice(0, 10)).then(
            (response) => {
                      console.log(response.data);
                      setReserveMessage(response.data.message);
                      setReserveSuccessful(true);
                    },
                    (error) => {
                      const resMessage =
                        (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.message ||
                        error.toString();

                      setReserveMessage(resMessage);
                      setReserveSuccessful(false);
                    }

       );


    };

    const StarRating = ({ rating, setRating }) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span
            key={i}
            style={{ color: i <= rating ? "#ffc107" : "#e4e5e9" }}
            onClick={() => setRating(i)}
          >
            &#9733;
          </span>
        );
      }
      return <div style={{ fontSize: "24px" }}>{stars}</div>;
    };

    useEffect(() => {
      const seeSchedule = async () => {
          const result = await axios.get("http://localhost:8080/api/schedule/"+urlElements);

              let data = result.data;
              data = data.map(date =>
                new Date(date)
            );
              setDates(data);
          };
      seeSchedule();

  }, [urlElements]);
    useEffect(() => {
        const view = async () => {
            await axios.get("http://localhost:8080/api/hosts/"+ urlElements)
            .then(response => setHost(response.data))
            .catch(err => console.error(err))

        };
        view();
    }, [urlElements]);

 useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/get_rev/" + urlElements);
      setReviews(response.data);
    };
    fetchData();
  }, [urlElements]);

    return (
         <Container>

             <Card className="jumbotron custom-jumbotron">
                <Card.Body>
                    <h2>Object Details</h2>
                        <p>ID: {host.id}</p>
                        <p>Name: {host.name}</p>
                        <p>Description: {host.description}</p>

                </Card.Body>
             </Card>
             <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                showDisabledMonthNavigation
                excludeDates={dates}
                placeholderText="Select a date other than today or yesterday"/>
                <Button onClick={reserve}>Reserve</Button>
                { reserveMessage && (
                    <div className="form-group">
                        <div
                            className={
                            reserveSuccessful ? "alert alert-success" : "alert alert-danger"
                             }
                            role="alert"
                            >
                            {reserveMessage}
                        </div>
                    </div>
                  )
                }
         <Container>
              <Row className="justify-content-md-center">
                <Col md="6">
                    <div className="d-flex align-items-center mb-3">
                            <FontAwesomeIcon
                              icon={faStar}
                              className={rating >= 1 ? "text-warning" : "text-muted"}
                              onClick={() => handleStarClick(1)}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className={rating >= 2 ? "text-warning" : "text-muted"}
                              onClick={() => handleStarClick(2)}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className={rating >= 3 ? "text-warning" : "text-muted"}
                              onClick={() => handleStarClick(3)}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className={rating >= 4 ? "text-warning" : "text-muted"}
                              onClick={() => handleStarClick(4)}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className={rating >= 5 ? "text-warning" : "text-muted"}
                              onClick={() => handleStarClick(5)}
                            />
                    </div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  { message && (
                    <div className="form-group">
                        <div
                            className={
                            successful ? "alert alert-success" : "alert alert-danger"
                             }
                            role="alert"
                            >
                            {message}
                        </div>
                    </div>
                  )
                }

                </Col>
              </Row>
            </Container>
            <Container>
                  <Row className="justify-content-md-center">
                    <Col md="6">
                      <ListGroup variant="flush">
                        {reviews.map((review, index) => (
                          <ListGroup.Item key={index} className="d-flex">
                            {[...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;
                              return (
                                <FontAwesomeIcon
                                  key={i}
                                  icon={faStar}
                                  className={ratingValue <= review.rating ? "text-warning" : "text-muted"}
                                />
                              );
                            })}
                            <p className="ml-3">{review.content}</p>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                </Container>
         </Container>

    );

};
export default ViewHost;


