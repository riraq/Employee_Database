import React from "react";
import EmployeeList from "./EmployeeList";
import Header from "./Header";
import SearchForm from "./SearchForm";
import API from "../utils/API";

class Wrapper extends React.Component {
  state = {
    users: [],
    search: ""
  };

  componentDidMount() {
    this.generateUsers();
  };

  generateUsers = () => {
    API.generate()
      .then(res => this.setState({ users: res.data.results }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchForm
          search={this.state.search}
          handleInputChange={this.handleInputChange}
        />

        <table className="sortable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
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