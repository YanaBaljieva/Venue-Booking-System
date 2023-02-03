import React, { useState, useEffect, useCallback } from 'react';
//import UserService from "../services/user.service";
import axios from 'axios';
import { InputGroup, Form, Button, Container } from 'react-bootstrap';
import { Card, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Home = () => {

    const [hosts, setHosts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hostsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortToggle, setSortToggle] = useState(true);

    const handleSort = () => {
        setSortToggle(!sortToggle);
//        if (search) {
//            searchData(currentPage);
//        } else {
//            findAllHosts(currentPage);
//        }
        findAllHosts(currentPage);
    };

    const changePage = event => {
        let targetPage = parseInt(event.target.value);
        if (search) {
            searchData(targetPage);
        } else {
            findAllHosts(targetPage);
        }
        setCurrentPage(targetPage);
    };

    const firstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            if (search) {
                searchData(firstPage);
            } else {
                findAllHosts(firstPage);
            }
        }
    };

    const prevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            if (search) {
                searchData(currentPage - prevPage);
            } else {
                findAllHosts(currentPage - prevPage);
            }
        }
    };

    const lastPage = () => {
        let condition = Math.ceil(totalElements / hostsPerPage);
        if (currentPage < condition) {
            if (search) {
                searchData(condition);
            } else {
                findAllHosts(condition);
            }
        }
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(totalElements / hostsPerPage)) {
            if (search) {
                searchData(currentPage + 1);
            } else {
                findAllHosts(currentPage + 1);
            }
        }
    };

    const findAllHosts = useCallback((currentPage) => {
       currentPage -= 1;
       let sortDir = sortToggle ? "asc" : "desc";
      //  axios.get("http://localhost:8080/api/all_places?page="+currentPage+"&size="+hostsPerPage)
        axios.get("http://localhost:8080/api/sort?pageNumber="+currentPage+"&pageSize="+hostsPerPage+"&sortBy=name&sortDir="+sortDir)
        .then(response => response.data)
        .then(data => {
            setHosts(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setCurrentPage(data.number + 1);
        })
    }, [hostsPerPage, sortToggle]);

    const searchChange = event => {
        setSearch(event.target.value);
    };

    const cancelSearch = () => {
        setSearch('');
        findAllHosts(currentPage);
    };

    const searchData = useCallback((currentPage) => {
        currentPage -= 1;
        //axios.get("http://localhost:8080/api/all_places/search_sort/"+search+"?pageNumber="+currentPage+"&pageSize="+hostsPerPage+"&sortBy=name&sortDir="+sortDir)
        axios.get("http://localhost:8080/api/search/"+search+"?page="+currentPage+"&size="+hostsPerPage)
        .then(response => response.data)
        .then(data => {
            setHosts(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setCurrentPage(data.number + 1);
        });
    }, [hostsPerPage, search]);

    useEffect(() => {
        if(search){
            searchData(currentPage);
        } else {
            findAllHosts(currentPage);

        }

    }, [currentPage, findAllHosts, searchData, search]);

    return (
        <Container>
            <InputGroup>
                <Form.Control
                    placeholder="Search..."
                    name="search"
                    value={search}
                    className={"info-border bg-dark text-white"}
                    onChange={searchChange}
                />
                <Button
                    variant="outline-secondary"
                    type="button"
                    className={"info-border bg-dark text-white"}
                    value={search}
                    onClick={searchData} >Search
                </Button>
                <Button
                    variant="outline-danger"
                    type="button"
                    className={"info-border bg-dark text-white"}
                    onClick={cancelSearch} >Remove
                </Button>
                <Button
                    variant="outline-secondary"
                    type="button"
                    className={"info-border bg-dark text-white"}
                    onClick={handleSort} > Sort by Name
                </Button>
            </InputGroup>


            { hosts.length === 0 ?
                <Card className="jumbotron custom-jumbotron">
                    <Card.Body>
                        <div>
                            <h3>No resuls found.</h3>
                        </div>
                    </Card.Body>
                </Card> :


                hosts.map(item => (
                    <Container>
                        <Link to={"/view/"+item.id}>
                            <Card className="jumbotron custom-jumbotron">
                                <Card.Body>
                                        <div key={item.id}>
                                            <div>{item.name}</div>
                                            <div>{item.city}</div>
                                        </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Container>

              ))}

            { hosts.length === 0 ? null :
                <Card.Footer className="container">
                    <div style={{"float":"left"}}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <Button
                                type="button"
                                variant="outline-info"
                                disabled={currentPage === 1 ? true : false}
                                onClick={firstPage}>
                              First
                            </Button>
                            <Button
                                type="button"
                                variant="outline-info"
                                disabled={currentPage === 1 ? true : false}
                                onClick={prevPage}>
                                     Prev
                            </Button>
                            <FormControl
                                name="currentPage"
                                value={currentPage}
                                onChange={changePage}/>
                                    <Button
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === totalPages ? true : false}
                                        onClick={nextPage}>
                                             Next
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline-info"
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
