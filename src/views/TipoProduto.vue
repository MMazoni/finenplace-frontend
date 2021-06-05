<template>
  <div id="produto">
    <v-subheader class="grey--text">Tipo Produto</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Tipos de Produto</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/tipo-produto/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="tipo in tipos" :key="tipo.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ tipo.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Tipo do Produto</div>
            <div class="body-5">{{ tipo.tipo }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { tipoProdutos } from "@/services/tipo-produto";

export default {
  name: "Tipo Produto",
  data: () =>  {
    return {
      tipos: [
        {id: 1, tipo: 'Carne Bovina'},
        {id: 2, tipo: 'Carne Avina'},
        {id: 3, tipo: 'Peixe'},
        {id: 4, tipo: 'Leite'},
        {id: 5, tipo: 'Azeite'},
        {id: 6, tipo: 'Sorvete'},
        {id: 7, tipo: 'Arroz'},
        {id: 8, tipo: 'Feijão'},
      ],
    }
  },
  methods: {
    fetchTipoProduto() {
      tipoProdutos()
        .then(response => this.tipos = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },
  mounted() {
    this.fetchTipoProduto();
  }
}
</script>
