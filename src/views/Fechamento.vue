<template>
  <div id="fechamento">
    <v-subheader class="grey--text">Fechamento</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">
            <v-text-field
              v-model.lazy="dinheiro"
              v-money="money"
              label="Dinheiro em caixa"
              required
            ></v-text-field>

            <v-text-field v-model.lazy="credito" v-money="money" label="Cartão de crédito" required></v-text-field>

            <v-text-field v-model.lazy="debito" v-money="money" label="Cartão de débito" required></v-text-field>

            <v-text-field v-model.lazy="refeicao" v-money="money" label="Vale refeição" required></v-text-field>

            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Fechar Caixa</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { fecharCaixa, turnNumber, money } from "@/services/caixa";
import { VMoney } from "v-money";

export default {
  name: "Fechamento",

  data: () => ({
    caixa: {},
    dinheiro: "",
    credito: "",
    debito: "",
    refeicao: "",
    errors: [],
  }),

  computed: {
    money() {
      return money;
    }
  },

  directives: { money: VMoney },

  methods: {
    fechamento() {
      fecharCaixa(this.$route.params.caixaId, {
        dinheiro: turnNumber(this.dinheiro),
        credito: turnNumber(this.credito),
        debito: turnNumber(this.debito),
        refeicao: turnNumber(this.refeicao),
      })
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "Caixa",
            params: { alert: true },
          });
        })
        .catch((error) => this.errors.push(error.response));
    },
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de fechar o caixa?',
      });
      if (res) {
        this.fechamento();
      }
    },
  },
};
</script>