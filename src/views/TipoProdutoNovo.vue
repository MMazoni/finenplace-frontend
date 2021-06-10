<template>
  <div id="novo-tipo-produto">
    <v-subheader class="grey--text">Tipo Produto / Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Tipo de Produto</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">
            <v-text-field
              v-model.lazy="tipo"
              label="Tipo de Produto"
              required
            ></v-text-field>
            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { storeTipoProduto } from "@/services/tipo-produto";

export default {
  name: "TipoProdutoNovo",


  data: () => ({
    tipo: "",
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar esse tipo de produto?',
      });
      if (res) {
        this.criarProduto();
      }
    },

    criarProduto() {
      const tipo = {
        tipo: this.tipo,
      };
      storeTipoProduto(tipo)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "TipoProduto"
          });
        })
        .catch((error) => this.errors.push(error.response));
    },
  }
}
</script>
