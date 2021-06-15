import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const token = localStorage.getItem('key');
axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

const Axios = axios.create({
  baseURL: "http://localhost:8000/api/"
});

export default Axios;