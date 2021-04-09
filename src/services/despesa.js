import axios from "./config";

export const getDespesasByCaixa = caixaId => axios.get(`caixa/despesa/${caixaId}/`);

export const storeDespesas = data =>  {
  console.log(data);
  return axios.post("caixa/despesa/", {
    caixa: {
        id: data.idCaixa,
    },
    tipo: {
      id: data.idTipo,
    },
    valor: data.despesa
  });
}

export const getTipoDespesas = () => axios.get("despesa/tipo/");

export const storeTipoDespesas = data => axios.post("despesa/tipo/", {
    tipo: data.tipoDespesa,
    descricao: data.descricao
});
