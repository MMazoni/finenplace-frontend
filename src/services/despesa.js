import axios from "./config";

export const getDespesasByCaixa = caixaId => axios.get(`despesa/caixa/${caixaId}/`);

export const storeDespesas = data =>  {
  console.log(data);
  return axios.post("despesa/", {
    cd_Caixa: data.idCaixa,
    cd_DespesaTipo: data.idTipo,
    vl_Despesa: data.despesa
  });
}

export const getTipoDespesas = () => axios.get("despesa/tipo/");

export const storeTipoDespesas = data => axios.post("despesa/tipo/", {
    ds_DespesaTipo: data.tipoDespesa
});
