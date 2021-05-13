import React from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeList from "./EmployeeList";
import Header from "./Header";
import SearchForm from "./SearchForm";
import API from "../utils/API";

class Wrapper extends React.Component {
  state = {
    result: {},
    search: ""
  };

  componentDidMount() {
    this.generateUsers();
  };

  generateUsers = () => {
    API.generate()
    .then(res => this.setState({ result: res.data }))
    .then(console.log(this.state))
    .catch(err => console.log(err));
  };

  // handleInputChange = event => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  render() {
    return(
    <h1>Hello</h1>
  )}

};

export default Wrapper;