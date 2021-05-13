import axios from "axios";

// eslint-disable-next-line
export default {
  search: function() {
    return axios.get("https://randomuser.me/api/");
  }
};
