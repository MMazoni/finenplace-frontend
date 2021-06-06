import axios from "./config";

export const storeUsuario = ({ usuario }) =>
    axios.post("usuario/", { usuario });

export const usuarios = () => axios.get("usuario/");
