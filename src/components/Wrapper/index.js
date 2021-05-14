import React from "react";
import EmployeeList from "../EmployeeList";
import Header from "../Header";
import SearchForm from "../SearchForm";
import API from "../../utils/API";
import tableSort from "table-sort-js/table-sort.js";

class Wrapper extends React.Component {
  state = {
    employees: [],
    filteredEmployees: [],
    search: ""
  };

  componentDidMount() {
    this.generateEmployees();
    tableSort();
  };

  generateEmployees = () => {
    API.generate()
      .then(res => {
        this.setState({ employees: res.data.results })
        this.setState({ filteredEmployees: res.data.results })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  renderList = () => {
    if (this.state.search === "") {
      // use employee state
      return (this.state.employees.map(employee => (
        <EmployeeList
          id={employee.id.value}
          key={employee.id.value}
          first={employee.name.first}
          last={employee.name.last}
          picture={employee.picture.thumbnail}
          phone={employee.phone}
          email={employee.email}
        />
      )))
    } else {
      // use filtered employee state

      const filteredList = this.state.filteredEmployees.filter(employee => (
        employee.name.first.toLowerCase().includes(this.state.search)
      ))
      console.log("filteredList ", filteredList)
      return (filteredList.map(employee => (
        <EmployeeList
          id={employee.id.value}
          key={employee.id.value}
          first={employee.name.first}
          last={employee.name.last}
          picture={employee.picture.thumbnail}
          phone={employee.phone}
          email={employee.email}
        />
      )))

    }
  }

  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid p-4">
          <SearchForm
            employees={this.state.employees}
            search={this.state.search}
            handleInputChange={this.handleInputChange}
          />

          <div className="table-responsive">
            <table className="table-sort table-arrows table table-striped">
              <thead>
                <tr className="text-center align-middle">
                  <th>Image</th>
                  <th className="order-by-desc">Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.renderList()}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )
  }
};

export default Wrapper;