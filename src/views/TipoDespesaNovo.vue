<template>
  <div id="novo-tipo-despesa">
    <v-subheader class="grey--text">Tipo Despesa / Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Tipo de Despesa</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">
            <v-text-field
              v-model.lazy="tipo"
              label="Tipo de Despesa"
              required
            ></v-text-field>
            <v-text-field
              v-model.lazy="descricao"
              label="Descrição"
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
import { storeTipoDespesas } from "@/services/despesa";

export default {
  name: "TipoDespesaNovo",

  data: () => ({
    tipo: "",
    descricao: "",
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar esse tipo de despesa?',
      });
      if (res) {
        this.criarProduto();
      }
    },

    criarProduto() {
      const tipo = {
        tipo: this.tipo,
        descricao: this.descricao,
      };
      storeTipoDespesas(tipo)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "TipoDespesa"
          });
        })
        .catch(error => this.errors.push(error));
    },
  }
}
</script>
