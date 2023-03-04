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
             });

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
      const seeSchedule = () => {

         axios.get("http://localhost:8080/api/schedule/" + urlElements)
           .then(result => {
             const dates = result.data.map(date => new Date(date.date));
             setDates(dates);
           })
           .catch(error => {
             console.error("Error fetching dates:", error);
           });
//
//          const result = await axios.get("http://localhost:8080/api/schedule/"+urlElements);
//
//              let data = result.data;
//              data = data.map(date =>
//                new Date(date.date)
//              );
//              setDates(data);
          };
      seeSchedule();

  }, [urlElements]);
    useEffect(() => {
        const view = async () => {
            await axios.get("http://localhost:8080/api/hosts/"+ urlElements)
            .then(response => setHost(response.data))
            .catch(err => {
                console.error(err);
                window.location.replace("/home");
            });
        };

        view();
    }, [urlElements, dates]);

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
                    <Container className="text-containers">
                      <Container className="text-container">
                        <h3 style={{"marginBottom":"30px"}}>{host.name}</h3>
                            <p className="paragraph-details">{host.address}</p>
                            <p className="paragraph-details">{host.city}, {host.country}</p>
                            <p className="paragraph-details">{host.price}</p>
                      </Container>
                      <Container className="text-container2">
                      </Container>
                    </Container>
                </Card.Body>
             </Card>
             <Container className="details-description">
                <Container style={{"width":"95%"}}>
                  <h3 style={{"marginBottom":"35px"}}>Description:</h3>
                  <p>{host.description}</p>
                </Container>
             </Container>
             <Container className="reserve-review">
                 <Container className="reserve">
                     <h3 style={{"marginBottom":"35px", "color":"white"}}>View availability</h3>
                     <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        className="date-picker"
                        maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                        excludeDates={dates}
                        placeholderText="Select a date for reservation"/>
                        <Button className="reserve-btn" onClick={reserve}>Reserve</Button>
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
                    </Container>

                   <Container className="review-container">
                       <h3 style={{"marginBottom":"20px","color":"white"}}>
                        You’ve been there? Write your opinion:</h3>
                      <Row>
                        <Col md="6">
                            <div className="review-stars d-flex align-items-center fa-2x mb-3">
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
                              <Form.Control
                                className="comment-content"
                                as="textarea"
                                rows="3"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </Form.Group>
                            <Container className="review-post" style={{"textAlign":"right"}}>
                            <Button style={{"marginRight":"10px"}}className="comment-btn" type="submit">
                              Submit
                            </Button>
                            </Container>
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
                </Container>
            { reviews.length !== 0 ?
                <Container>
                  <h3 style={{"color":"white", "marginLeft":"60px", "marginTop":"60px"}}>Reviews</h3>
                  <Container style={{"marginTop":"35px"}} className="jumbotron custom-jumbotron2">


                          <Container className="display-review">
                            { reviews.map((review, index) => (
                              <Container style={{"backgroundColor":"#245B63", "display":"flex"}} key={index}>

                                {[...Array(5)].map((star, i) => {
                                  const ratingValue = i + 1;
                                  return (
                                    <FontAwesomeIcon
                                      key={i}
                                      icon={faStar}
                                      className={ratingValue <= review.rating ? "text-warning fa-lg" : "text-muted fa-lg"}
                                    />
                                  );
                                })}

                                <p className="ml-5 mx-10">{review.username}</p>
                                <p style={{"wordBreak": "break-word"}} className="ml-5">{review.content}</p>
                                </Container>
                            ))}
                          </Container>


                  </Container>
                </Container>
            : null}
         </Container>

    );

};
export default ViewHost;


