<template>
  <div id="novo-fornecedor">
    <v-subheader class="grey--text">Fornecedor / Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Fornecedor</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">

            <v-text-field v-model.lazy="nome" label="Nome" required></v-text-field>

            <v-text-field-simplemask
              v-model.lazy="telefone"
              v-bind:label="'Telefone'"
              v-bind:properties="{
                prefix: '',
                suffix: '',
                readonly: false,
                disabled: false,
                outlined: false,
                clearable: true,
                placeholder: '(11) 11111-1111',
              }"
              v-bind:options="{
                inputMask: '(##) #####-####',
                outputMask: '###########',
                empty: null,
                applyAfter: false,
                alphanumeric: false,
                lowerCase: false,
              }"
            />

            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar Fornecedor</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { storeFornecedor } from "@/services/fornecedor";

export default {
  name: "FornecedorNovo",

  data: () => ({
    nome: "",
    telefone: "",
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar o fornecedor?',
      });
      if (res) {
        this.criarFornecedor();
      }
    },

    criarFornecedor() {
      storeFornecedor({
        nome: this.nome,
        telefone: this.telefone
      }).then(response => {
        console.log(response)
        this.$router.push({
          name: "Fornecedor"
        });
      }).catch(error => this.errors.push(error.response));
    }
  }
}
</script>
