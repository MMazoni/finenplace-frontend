import axios from "./config";

export const storeNotaFiscal = ({ fornecedor, dataCompra, dataVencimento, produtosNotaFiscal }) =>
    axios.post("fornecedor/nota-fiscal/", { fornecedor, dataCompra, dataVencimento, produtosNotaFiscal });

export const notasFiscais = () => axios.get('fornecedor/nota-fiscal/');
