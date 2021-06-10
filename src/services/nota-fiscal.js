import axios from "./config";

export const storeNotaFiscal = ({ fornecedor, dataCompra, dataVencimento, valorTotal }) =>
    axios.post("fornecedor/nota-fiscal/", { fornecedor, dataCompra, dataVencimento, valorTotal });

export const notasFiscais = () => axios.get('fornecedor/nota-fiscal/');
