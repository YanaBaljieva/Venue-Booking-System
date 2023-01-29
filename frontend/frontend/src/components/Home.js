import React, { Component } from 'react';
import UserService from "../services/user.service";
import axios from 'axios';
import { InputGroup, Form, Button, Container } from 'react-bootstrap';
import {Card, FormControl} from 'react-bootstrap';

//const Home = () => {
//  const [content, setContent] = useState(""); //to show with different role
//
//  useEffect(() => {
//    UserService.getPublicContent().then(
//      (response) => {
//        setContent(response.data);
//      },
//      (error) => {
//        const _content =
//          (error.response && error.response.data) ||
//          error.message ||
//          error.toString();
//
//        setContent(_content);
//      }
//    );
//  }, []);
//
//
//
//  const [data, setData] = useState([]);
//
//  useEffect(() => {
//    axios.get('http://localhost:8080/api/all_places')
//      .then(response => setData(response.data))
//  }, []);


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hosts : [],
            search : '',
            currentPage : 1,
            hostsPerPage : 5

        };
    }

    componentDidMount() {
        this.findAllHosts(this.state.currentPage);
    }

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllHosts(targetPage);
        }

        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllHosts(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllHosts(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.hostsPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllHosts(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.hostsPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllHosts(this.state.currentPage + 1);
            }
        }
    };


    findAllHosts(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/all_places?page="+currentPage+"&size="+this.state.hostsPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    hosts: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllHosts(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.hostsPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    hosts: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };


 render() {
  const {hosts, currentPage, totalPages, search} = this.state;


  return (
     <Container>
        <InputGroup>
            <Form.Control
                placeholder="Search..."
                name="search"
                value={search}
                className={"info-border bg-dark text-white"}
                onChange={this.searchChange}
            />
            <Button
                variant="outline-secondary"
                type="button"
                className={"info-border bg-dark text-white"}
                value={search}
                onClick={this.searchData} >Search
            </Button>
            <Button
                variant="outline-danger"
                type="button"
                className={"info-border bg-dark text-white"}
                onClick={this.cancelSearch} >Remove
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
                <Card className="jumbotron custom-jumbotron">
                    <Card.Body>
                        <div key={item.id}>
                            <div>{item.name}</div>
                            <div>{item.city}</div>
                        </div>
                    </Card.Body>
                </Card>
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
                            onClick={this.firstPage}>
                          First
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.prevPage}>
                                 Prev
                        </Button>
                        <FormControl
                            name="currentPage"
                            value={currentPage}
                            onChange={this.changePage}/>
                                <Button
                                    type="button"
                                    variant="outline-info"
                                    disabled={currentPage === totalPages ? true : false}
                                    onClick={this.nextPage}>
                                         Next
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline-info"
                                    disabled={currentPage === totalPages ? true : false}
                                    onClick={this.lastPage}>
                                         Last
                                </Button>
                    </InputGroup>
                </div>
            </Card.Footer>
        }
     </Container>
  );
}
}
