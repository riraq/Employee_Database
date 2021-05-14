import React from "react";
import EmployeeList from "./EmployeeList";
import Header from "./Header";
import SearchForm from "./SearchForm";
import API from "../utils/API";
import tableSort from "table-sort-js/table-sort.js";

class Wrapper extends React.Component {
  state = {
    users: [],
    search: ""
  };

  componentDidMount() {
    this.generateUsers();
    tableSort();
  };

  generateUsers = () => {
    API.generate()
      .then(res => this.setState({users: res.data.results}))
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
          users={this.state.users}
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
            {this.state.users.map(user => (
              <EmployeeList
                id={user.id.value}
                key={user.id.value}
                first={user.name.first}
                last={user.name.last}
                picture={user.picture.thumbnail}
                phone={user.phone}
                email={user.email}
              />
            ))}
          </tbody>
        </table>

      </div>
    )
  }
};

export default Wrapper;