<template>
  <div id="novo-produto">
    <v-subheader class="grey--text">Produto / Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Produto</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">

            <v-text-field
              v-model.lazy="nome"
              label="Nome"
              required
            ></v-text-field>

            <v-text-field
              v-model.lazy="valor"
              v-money="money"
              label="Valor"
              required
            ></v-text-field>

            <v-select
              v-model="marca"
              :items="marcas"
              item-text="marca"
              item-value="id"
              label="Marca"
              required
            ></v-select>

            <v-select
              v-model="tipo"
              :items="produtoTipos"
              item-text="tipo"
              item-value="id"
              label="Tipo do Produto"
              required
            ></v-select>

            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar Produto</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { money, turnNumber } from "@/services/caixa";
import { VMoney } from "v-money";

export default {
  name: "ProdutoNovo",


  data: () => ({
    nome: "",
    valor: "",
    marca: "",
    tipo: "",
    marcas: [
      {id: 1, marca: 'ZeroTreze'},
      {id: 2, marca: 'San Yu'},
      {id: 3, marca: 'Seboi'},
      {id: 4, marca: 'Pundin'},
    ],
    produtoTipos: [
      {id: 1, tipo: 'Carne Bovina'},
      {id: 2, tipo: 'Carne Avina'},
      {id: 3, tipo: 'Peixe'},
      {id: 4, tipo: 'Leite'},
      {id: 5, tipo: 'Azeite'},
      {id: 6, tipo: 'Sorvete'},
      {id: 7, tipo: 'Arroz'},
      {id: 8, tipo: 'Feijão'},
    ],
    errors: [],
  }),

  directives: { money: VMoney },

  computed: {
    money() {
      return money;
    }
  },

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar esse produto?',
      });
      if (res) {
        this.criarProduto();
      }
    },

    criarProduto() {
      const produto = {
        nome: this.nome,
        valor: turnNumber(this.valor),
        marca_id: this.marca,
        produto_tipo_id: this.tipo
      };
      storeProduto(produto)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "Produto"
          });
        })
        .catch((error) => this.errors.push(error.response));
    },
  }
}
</script>
