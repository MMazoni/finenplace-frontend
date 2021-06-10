<template>
  <div id="produto">
    <v-subheader class="grey--text">Produto</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Produtos</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/produto/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="produto in produtos" :key="produto.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ produto.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Nome</div>
            <div class="body-5">{{ produto.nome }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Valor de Custo</div>
            <div class="body-5">{{ toReal(produto.valor) }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Marca</div>
            <div class="body-5">{{ produto.marca.marca }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Tipo do Produto</div>
            <div class="body-5">{{ produto.tipoProduto.tipo }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { toReal } from "@/utils";
import { produtos } from "@/services/produto";

export default {
  name: "Produto",
  data: () =>  {
    return {
      produtos: []
    }
  },
  methods: {
    toReal,
    fetchProduto() {
      produtos()
        .then(response => this.produtos = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },
  mounted() {
    this.fetchProduto();
  }
}
</script>
