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
import { storeProduto } from "@/services/produto";
import { tipoProdutos } from "@/services/tipo-produto";
import { marcas } from "@/services/marca";

export default {
  name: "ProdutoNovo",


  data: () => ({
    nome: "",
    valor: "",
    marca: "",
    tipo: "",
    marcas: [],
    produtoTipos: [],
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
        marca: {
          id: this.marca,
        },
        tipoProduto: {
          id: this.tipo,
        },
        fornecedores: []
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

    fetchMarca() {
      marcas()
        .then(response => this.marcas = response.data)
        .catch(error => this.errors.push(error.response));
    },

    fetchTipoProduto() {
      tipoProdutos()
        .then(response => this.produtoTipos = response.data)
        .catch(error => this.errors.push(error.response));
    }

  },

  mounted() {
    this.fetchMarca();
    this.fetchTipoProduto();
  }
}
</script>
