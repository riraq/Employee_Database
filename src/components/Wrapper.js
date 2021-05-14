import React from "react";
import EmployeeList from "./EmployeeList";
import Header from "./Header";
import SearchForm from "./SearchForm";
import API from "../utils/API";
import tableSort from "table-sort-js/table-sort.js";

class Wrapper extends React.Component {
  state = {
    employees: [],
    search: ""
  };

  componentDidMount() {
    this.generateEmployees();
    tableSort();
  };

  generateEmployees = () => {
    API.generate()
      .then(res => this.setState({employees: res.data.results}))
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

  render() {
    return (
      <div>
        <Header />
        <SearchForm
          employees={this.state.employees}
          search={this.state.search}
          handleInputChange={this.handleInputChange}
        />

        <table className="table-sort table-arrows">
          <thead>
            <tr>
              <th>Image</th>
              <th className="order-by-desc">Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => (
              <EmployeeList
                id={employee.id.value}
                key={employee.id.value}
                first={employee.name.first}
                last={employee.name.last}
                picture={employee.picture.thumbnail}
                phone={employee.phone}
                email={employee.email}
              />
            ))}
          </tbody>
        </table>

      </div>
    )
  }
};

export default Wrapper;