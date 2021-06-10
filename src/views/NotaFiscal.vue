<template>
  <div id="nota-fiscal">
    <v-subheader class="grey--text">Nota Fiscal</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Notas Fiscais</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/nota-fiscal/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="notaFiscal in notasFiscais" :key="notaFiscal.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ notaFiscal.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Data de Compra</div>
            <div class="body-2">{{ moment(notaFiscal.dataCompra).format('DD/MM/YYYY') }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Data de Vencimento</div>
            <div class="body-2">{{ moment(notaFiscal.dataVencimento).format('DD/MM/YYYY') }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Valor Total</div>
            <div class="body-2">{{ toReal(notaFiscal.valorTotal) }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Fornecedor</div>
            <div class="body-2">{{ notaFiscal.fornecedor.nome }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { toReal } from "@/utils";
import { notasFiscais } from "@/services/nota-fiscal";
import moment from 'moment';

export default {
  name: "NotaFiscal",
  data: () => {
    return {
      notasFiscais: [],
      errors: []
    }
  },

  methods: {
    toReal,
    moment,

    fetchNotaFiscal() {
      notasFiscais()
        .then(response => this.notasFiscais = response.data)
        .catch(error => this.errors.push(error.response))
    }
  },

  mounted() {
    this.fetchNotaFiscal();
  }
}
</script>
