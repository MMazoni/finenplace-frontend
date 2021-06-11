import axios from "./config";

export const storeProduto = ({ nome, valor, marca, tipoProduto, fornecedor }) =>
    axios.post("produto/", { nome, valor, marca, tipoProduto, fornecedor });

export const produtos = () => axios.get("produto/");
