import axios from "./config";

export const storeUsuario = ({ nome, cargo, email, username, password }) => {
    return axios.post("funcionario/", { nome, cargo }).then(() => {
        const role = [];
        return axios.post("auth/signup/", { email, username, role, password })
    });
}
    

export const usuarios = () => axios.get("funcionario/");

export const cargos = () => axios.get("funcionario/cargo/")