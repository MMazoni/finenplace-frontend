import axios from "./config";

export const getDespesasByCaixa = caixaId => axios.get(`caixa/despesa/${caixaId}/`);

export const storeDespesas = data =>  {
  console.log(data);
  return axios.post("caixa/despesa/", {
    caixa: {
        id: data.idCaixa,
    },
    tipo: {
      id: 37,
    },
    valor: data.despesa
  });
}

export const getTipoDespesas = () => axios.get("despesa/tipo/");

export const storeTipoDespesas = ({ tipo, descricao }) => axios.post("despesa/tipo/", { tipo, descricao });

export const despesasPorCaixa = caixaId => axios.get(`caixa/despesa/lista/${caixaId}`);

export const deleteDespesa = despesaId => axios.delete(`caixa/despesa/${despesaId}`);
