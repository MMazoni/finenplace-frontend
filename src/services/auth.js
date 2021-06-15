import router from '../router';
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const Axios = axios.create({
  baseURL: "http://localhost:8000/api/"
});

export const login = ({ username, password }) => {
    return Axios.post('auth/login', { username, password });
}

export const logout = () => {
    localStorage.setItem('key', null);
    localStorage.setItem('user', null)
    router.push('login');
}