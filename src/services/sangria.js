import axios from "./config";

export const getSangriasByCaixa = caixaId => axios.get(`sangria/caixa/${caixaId}/`);

export const storeSangrias = data => axios.post("sangria/", {
    cd_Caixa: data.idCaixa,
    vl_Sangria: data.sangria
});