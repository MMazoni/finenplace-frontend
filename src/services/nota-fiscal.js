import axios from "./config";

export const storeNotaFiscal = ({ fornecedor, dataCompra, dataVencimento, produtos }) =>{
  const config = {'Authorization': `Bearer ${localStorage.getItem('key')}`};
  return axios.post("fornecedor/nota-fiscal/", { fornecedor, dataCompra, dataVencimento, produtos },{headers: config});
}


export const notasFiscais = () => axios.get('fornecedor/nota-fiscal/');
