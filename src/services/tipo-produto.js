import axios from "./config";

export const storeTipoProduto = ({ tipo }) => 
    axios.post("produto/tipo/", { tipo });

export const tipoProdutos = () => axios.get("produto/tipo/");
