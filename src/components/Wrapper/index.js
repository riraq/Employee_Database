import React from "react";
import EmployeeList from "../EmployeeList";
import Header from "../Header";
import SearchForm from "../SearchForm";
import API from "../../utils/API";
import TableHead from "../TableHead"

class Wrapper extends React.Component {
  state = {
    employees: [],
    sortedList: [],
    search: "",
    sortedBy: ""
  };

  componentDidMount() {
    this.generateEmployees();
  };

  generateEmployees = () => {
    API.generate()
      .then(res => {
        this.setState({ employees: res.data.results })
        this.setState({ sortedList: res.data.results })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  sortEmployees = (event) => {
    event.preventDefault();
    if (this.state.sortedBy === "" || this.state.sortedBy === "descending") {
      this.setState({ sortedBy: "ascending" })
      this.setState({
        sortedList: this.state.sortedList.sort(function (a, b) {
          return a.name.first < b.name.first ? -1 : (a.name.first === b.name.first ? 0 : 1)
        })
      })
    } else {
      this.setState({ sortedBy: "descending" })
      this.setState({
        sortedList: this.state.sortedList.sort(function (a, b) {
          return b.name.first < a.name.first ? -1 : (b.name.first === a.name.first ? 0 : 1)
        })
      })
    }
  }

  // conditional rendering of list of employees based on search form value
  // if search is empty, display all employees
  // else, create a filtered list that displays employees with first name matching search form
  renderList = () => {
    
    // creates component prop structure
    const employeeList = (
      employee => (
        <EmployeeList
          id={employee.id.value}
          key={employee.id.value}
          first={employee.name.first}
          last={employee.name.last}
          picture={employee.picture.thumbnail}
          phone={employee.phone}
          email={employee.email}
        />
      ))

    if (this.state.search === "") {
      return this.state.employees.map(employeeList);
    } else {
      const filteredList = this.state.sortedList.filter(employee => (
        employee.name.first.toLowerCase().includes(this.state.search)
      ))
      return (filteredList.map(employeeList))
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
            <table className="table table-striped">
              <TableHead onClick={this.sortEmployees} />
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