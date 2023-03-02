import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { InputGroup, Form, Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Card, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css';


const Home = () => {

    const [hosts, setHosts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hostsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortToggle, setSortToggle] = useState(false);
    const [sortBy, setSortBy] = useState("date");

    const handleSort = (handleSortBy, handleSortToggle) => {
        setSortToggle(handleSortToggle);
        setSortBy(handleSortBy);
        searchData(currentPage);
    };


    const changePage = event => {
        let targetPage = parseInt(event.target.value);
        searchData(targetPage);
        setCurrentPage(targetPage);
    };

    const firstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            searchData(firstPage);
        }
    };

    const prevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            searchData(currentPage - prevPage);
        }
    };

    const lastPage = () => {
        let condition = Math.ceil(totalElements / hostsPerPage);
        if (currentPage < condition) {
            searchData(condition);
        }
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(totalElements / hostsPerPage)) {
           searchData(currentPage + 1);
        }
    };

    const searchChange = event => {
        setSearch(event.target.value);
    };

    const cancelSearch = () => {
        setSearch('');
        handleSort('date', false);
    };

    const searchData = useCallback((currentPage) => {
        currentPage -= 1;
        let sortDir = sortToggle ? "asc" : "desc";
        if(search) {
            axios.get("http://localhost:8080/api/search/"+search+"?pageNumber="+currentPage+"&pageSize="+hostsPerPage+"&sortBy="+sortBy+"&sortDir="+sortDir)
                .then(response => response.data)
                .then(data => {
                    setHosts(data.content);
                    setTotalPages(data.totalPages);
                    setTotalElements(data.totalElements);
                    setCurrentPage(data.number + 1);
                });
        } else {
            axios.get("http://localhost:8080/api/search?pageNumber="+currentPage+"&pageSize="+hostsPerPage+"&sortBy="+sortBy+"&sortDir="+sortDir)
                .then(response => response.data)
                .then(data => {
                    setHosts(data.content);
                    setTotalPages(data.totalPages);
                    setTotalElements(data.totalElements);
                    setCurrentPage(data.number + 1);
                });
        }
    }, [hostsPerPage, search, sortToggle, sortBy]);

    useEffect(() => {
        if(search || sortToggle || sortBy){
            searchData(currentPage);
        }
    }, [currentPage, searchData, search, sortToggle, sortBy]);

    return (
        <Container>
            <InputGroup>
                <Form.Control
                    placeholder="Search..."
                    name="search"
                    value={search}
                    className={"searchbar"}
                    onChange={searchChange}
                />
                <Button
                    variant="outline-secondary"
                    type="button"
                    className={"search-btn text-white"}
                    value={search}
                    onClick={searchData} >Search
                </Button>
                <Button
                    variant="outline-danger"
                    type="button"
                    className={"reset-btn text-white"}
                    onClick={cancelSearch} >Reset
                </Button>
            </InputGroup>
            <Dropdown className="dropdown" >
                <Dropdown.Toggle className="dropdown-toggle">
                         Filter
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu">
                  <Dropdown.Item
                    className="dropdown-item"
                    onClick={() => handleSort('date', false)}>
                            Last added
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item"
                    onClick={() => handleSort('date', true)}>
                        First added
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item"
                    onClick={() => handleSort('price', true)}>
                        Price ↑
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item"
                    onClick={() => handleSort('price', false)}>Price ↓
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            { hosts.length === 0 ?
                <Card className="jumbotron custom-jumbotron-notfound">
                    <Card.Body>
                        <div>
                            <h3>No resuls found.</h3>
                        </div>
                    </Card.Body>
                </Card> :

                hosts.map((item, index) => (
                    <Container key={index}>
                        <Card className="jumbotron custom-jumbotron">
                            <Card.Body>
                                <Container className="text-containers">
                                <Container className="text-container">
                                    <Link className="custom-jumbotron-link" to={"/view/"+item.id}>
                                        <div className="place-name">{item.name}</div>
                                    </Link>
                                    <div>{item.city}, {item.country}</div>

                                </Container>
                                <Container className="text-container2">
                                </Container>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Container>
                ))}

            { hosts.length === 0 ? null :
                <Card.Footer className="container-pagination">
                    <div style={{"float":"left", "color":"white", "padding":"7px"}}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup className="pagination">
                            <Button
                                type="button"
                                className="button-pagination"
                                disabled={currentPage === 1 ? true : false}
                                onClick={firstPage}>
                              First
                            </Button>
                            <Button
                                type="button"
                                className="button-pagination"
                                disabled={currentPage === 1 ? true : false}
                                onClick={prevPage}>
                              Prev
                            </Button>
                            <FormControl
                                name="currentPage"
                                className="select-page"
                                style={{"text-align":"center"}}
                                value={currentPage}
                                disabled={totalPages === 1 ? true : false}
                                onChange={changePage}/>
                            <Button
                                type="button"
                                className="button-pagination"
                                disabled={currentPage === totalPages ? true : false}
                                onClick={nextPage}>
                              Next
                            </Button>
                            <Button
                                type="button"
                                className="button-pagination"
                                disabled={currentPage === totalPages ? true : false}
                                onClick={lastPage}>
                              Last
                            </Button>
                        </InputGroup>
                    </div>
                </Card.Footer>
            }
        </Container>
    );
}

export default Home;
