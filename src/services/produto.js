import axios from "./config";

export const storeProduto = ({ nome, valor, marca_id, produto_tipo_id }) => 
    axios.post("produto/", { nome, valor, marca_id, produto_tipo_id });

export const produtos = () => axios.get("produto/");
