<template>
  <div id="fornecedor">
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
            <div class="body-2">{{ notaFiscal.data_compra }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Data de Vencimento</div>
            <div class="body-2">{{ notaFiscal.data_vencimento }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Valor Total</div>
            <div class="body-2">{{ toReal(notaFiscal.valor_total) }}</div>
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

export default {
  name: "NotaFiscal",
  data: () => {
    return {
      notasFiscais: [
        {
          id: 1,
          data_compra: '10/04/2020',
          data_vencimento: '10/05/2020',
          valor_total: 1000,
          fornecedor: {
            nome: 'Krisalda'
          }
        },
        {
          id: 2,
          data_compra: '17/01/2021',
          data_vencimento: '17/03/2021',
          valor_total: 500,
          fornecedor: {
            nome: 'YUGD'
          }
        },
      ],
      errors: []
    }
  },

  methods: {
    toReal,

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
