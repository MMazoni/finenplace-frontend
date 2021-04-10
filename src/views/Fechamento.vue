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
    <Confirmation />
  </div>
</template>
<script>
import Confirmation from "@/components/Confirmation";
import { confirmation, dialogConclude, openDialog } from '../store.js';
import { fecharCaixa, turnNumber, money } from "@/services/caixa";
import { VMoney } from "v-money";

export default {
  name: "Fechamento",
  components: { Confirmation },
  data: () => ({
    caixa: {},
    dinheiro: "",
    credito: "",
    debito: "",
    refeicao: "",
    errors: [],
  }),

  watch: {
    dialogConfirmation(value) {
      if (value === true) {
        this.fechamento();
      }
    },
  },

  computed: {
    dialogConfirmation() {
      return confirmation.confirm;
    },
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
          dialogConclude();
          this.$router.push({
            name: "Caixa",
            params: { alert: true },
          });
        })
        .catch((error) => this.errors.push(error.response))
        .finally(() => { dialogConclude() });
    },
    confirm() {
      openDialog();
    },
  },
};
</script>