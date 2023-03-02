import React, { useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Container, Card } from 'react-bootstrap';
import AuthService from "../services/auth.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};


const AddHost = () => {

  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangeCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  };

  const onChangeAddress = (e) => {
      const address = e.target.value;
      setAddress(address);
    };

    const onChangePrice = (e) => {
      const price = e.target.value;
      setPrice(price);
    };

    const onChangeDescription = (e) => {
      const description = e.target.value;
      setDescription(description);
    };


  const handleAddHost = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.addHost(name, city, country, address, price, description).then(
        (response) => {
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
        }
      );
    }
  };

  return (
    <Container className="col-md-12">
      <Card className="card card-container">
        <Card.Body>

        <Form onSubmit={handleAddHost} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="Name">Name of the place</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="City">City</label>
                <Input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={onChangeCity}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Country">Country</label>
                <Input
                  type="text"
                  className="form-control"
                  name="country"
                  value={country}
                  onChange={onChangeCountry}
                  validations={[required]}
                />
              </div>
                <div className="form-group">
                  <label htmlFor="Address">Address</label>
                  <Input
                     type="text"
                     className="form-control"
                     name="address"
                     value={address}
                     onChange={onChangeAddress}
                     validations={[required]}

                  />
                </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price</label>
                    <Input
                       type="text"
                       className="form-control"
                       name="price"
                       value={price}
                       onChange={onChangePrice}
                       validations={[required]}
                    />
                  </div>
                   <div className="form-group">
                     <label htmlFor="Description">Description</label>
                     <Input
                       type="text"
                       className="form-control"
                       name="description"
                       value={description}
                       onChange={onChangeDescription}
                       validations={[required]}
                      />
                   </div>
              <div className="form-group">
                <button className="btn-forms btn-primary btn-block">Add host</button>
              </div>
            </div>
          )}

          {message && (
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
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddHost;
