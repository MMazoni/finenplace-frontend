<template>
  <div id="tipo-despesa">
    <v-subheader class="grey--text">Tipo Despesa</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Tipos de Despesas</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/tipo-despesa/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="tipo in tipos" :key="tipo.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ tipo.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Tipo da Despesa</div>
            <div class="body-5">{{ tipo.tipo }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Descrição</div>
            <div class="body-5">{{ tipo.descricao }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getTipoDespesas } from "@/services/despesa";

export default {
  name: "TipoDespesa",
  data: () =>  {
    return {
      tipos: [],
    }
  },
  methods: {
    fetchTipoDespesas() {
      getTipoDespesas()
        .then(response => this.tipos = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },
  mounted() {
    this.fetchTipoDespesas();
  }
}
</script>
