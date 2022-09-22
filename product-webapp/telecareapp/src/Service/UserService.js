import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../environment";

const baseUrl = `${BASE_URL}/user-service`;

const UserService = {
  getUserData: function (url) {
    return axios.get(baseUrl + url);
  },

  updateUserData: function (url, data) {
    return axios.patch(baseUrl + url, data);
  },
  tostErr: function (err) {
    toast.error(err);
  },
  tostSuccess: function (success) {
    toast.success(success);
  },
};

export default UserService;
