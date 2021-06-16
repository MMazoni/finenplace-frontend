import axios from "./config";

export const storeNotaFiscal = ({ fornecedor, dataCompra, dataVencimento, produtosNotaFiscal }) =>{
  const config = {'Authorization': `Bearer ${localStorage.getItem('key')}`};
  return axios.post("fornecedor/nota-fiscal/", { fornecedor, dataCompra, dataVencimento, produtosNotaFiscal },{headers: config});
}


export const notasFiscais = () => axios.get('fornecedor/nota-fiscal/');
