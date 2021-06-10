import axios from "./config";

export const storeUsuario = ({ nome, cargo }) =>
    axios.post("funcionario/", { nome, cargo });

export const usuarios = () => axios.get("funcionario/");

export const cargos = () => axios.get("funcionario/cargo/")