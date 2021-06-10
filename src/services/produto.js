import axios from "./config";

export const storeProduto = ({ nome, valor, marca, tipoProduto, fornecedores }) =>
    axios.post("produto/", { nome, valor, marca, tipoProduto, fornecedores });

export const produtos = () => axios.get("produto/");
