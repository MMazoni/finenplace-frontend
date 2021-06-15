import axios from "./config";

export const getSangriasByCaixa = caixaId => axios.get(`caixa/sangria/${caixaId}/`);

export const storeSangrias = data => axios.post("caixa/sangria/", {
    funcionario: {
        id: data.user
    },
    caixa: {
        id: data.idCaixa
    },
    valor: data.sangria
});

export const sangriasPorCaixa = caixaId => axios.get(`caixa/sangria/lista/${caixaId}`);

export const deleteSangria = sangriaId => axios.delete(`caixa/sangria/${sangriaId}`);
