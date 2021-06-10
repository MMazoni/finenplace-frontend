import axios from "./config";

export const storeFornecedor = ({nome, telefone}) => axios.post("fornecedor/", { nome, telefone });

export const fornecedores = () => axios.get('fornecedor/');
