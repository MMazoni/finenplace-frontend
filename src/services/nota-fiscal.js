import axios from "./config";

export const storeNotaFiscal = ({ data_compra, data_vencimento, valor_total, fornecedor_id }) => 
    axios.post("nota-fiscal/", { data_compra, data_vencimento, valor_total, fornecedor_id });

export const notasFiscais = () => axios.get('nota-fiscal/');
