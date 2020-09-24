import axios from "./config";

export const getCaixas = () =>  axios.get("caixa/");

export const showCaixa = id => axios.get(`caixa/${id}/`);

export const getControleCaixas = () => axios.get("controle/");

export const showControleCaixa = id => axios.get(`controle/${id}/`);

export const storeControleCaixa = () => axios.post("controle/");

export const storeCaixa = data => {
    console.log(data);
    return axios.post("caixa/", {
      cd_ControleCaixa: data.cd_ControleCaixa,
      vl_CaixaInicial: data.vl_CaixaInicial
    });
  }
  
  export const fecharCaixa = (id, data) => {
    return axios.patch(`caixa/${id}/`, {
      vl_Dinheiro: data.dinheiro,
      vl_CartaoCredito: data.credito,
      vl_CartaoDebito: data.debito,
      vl_Refeicao: data.refeicao,
      vl_Online: data.online,
      vl_Sangrias: data.sangrias,
      vl_Despesas: data.despesas,
      vl_Entradas: data.entradas,
      vl_Faturamento: data.faturamento
    });
}

export const turnNumber = (string) => {
  const withoutDollar = string.split(" ");
  return parseFloat(withoutDollar[1].replaceAll(".", "").replace(",", "."));
}

export const money =  {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false,
}