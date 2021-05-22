import axios from "./config";

export const getCaixas = () => axios.get("caixa/abertura/");

export const showCaixa = id => axios.get(`caixa/abertura/${id}/`);

export const getControleCaixas = () => axios.get("controle/");

export const showControleCaixa = id => axios.get(`controle/${id}/`);

export const storeControleCaixa = (user_id, turno) => axios.post("controle/", {
  user: user_id,
  ds_TurnoCaixa: turno,
});

export const abrirCaixa = data => {

  return axios.post("caixa/abertura", {
    funcionario: {
      id: data.funcionario
    },
    valorInicial: data.valorInicial,
    turno: data.turno
  });
}

export const fecharCaixa = (id, data) => {
  return axios.post(`caixa/fechamento/`, {
    abertura: { id },
    totalDinheiro: data.dinheiro,
    totalCredito: data.credito,
    totalDebito: data.debito,
    totalRefeicao: data.refeicao,
  });
}

export const caixasFechados = () => axios.get('caixa/fechamento');

export const turnNumber = string => {
  const withoutDollar = string.split(" ");
  return parseFloat(withoutDollar[1].replaceAll(".", "").replace(",", "."));
}

export const money = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false,
}