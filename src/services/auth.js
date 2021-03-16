import axios from "./config";
import router from '../router';

export const login = data => {
    return axios.post('user/login', {
        username: data.email,
        password: data.password
    });
}

export function logout(data) {
    localStorage.setItem(data, null);
    //    localStorage.setItem('role_id',null);
    localStorage.setItem('id', null)
    router.push('login');
}