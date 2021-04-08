<template>
  <div class="caixa">
    <v-snackbar
      v-model="alert"
      top
      color="success"
      timeout="3000"
    >
    Caixa fechado com sucesso.
    </v-snackbar>
    <v-subheader class="grey--text">Caixa</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row dense align="center" justify="center">
        <v-col cols="4">
          <v-card color="pa-3 mt-5">
            <v-card-title class="dark_gray--text subheading d-flex justify-center">Caixa Inicial</v-card-title>
            <v-card-actions>
              <v-container fluid class>
                <v-row align="center" justify="center">
                  <v-col cols="7">
                    <v-form @submit.prevent="confirm">
                      <v-text-field
                        v-model.lazy="valorInicial"
                        v-money="money"
                        class="mt-0 pt-0"
                        prepend-inner-icon="local_atm"
                        label="Insira o valor"
                      ></v-text-field>
                      <v-select
                        v-model="selectedTurno"
                        :items="turno"
                        label="Turno"
                      ></v-select>
                      <v-btn text color="secondary" block type="submit">
                        <span>Abrir Caixa</span>
                        <v-icon small right>lock_open</v-icon>
                      </v-btn>
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
              <Confirmation />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Confirmation from "@/components/Confirmation";
import { confirmation, dialogConclude, openDialog } from '../store.js';
import { abrirCaixa, turnNumber } from "@/services/caixa";
import { VMoney } from "v-money";

export default {
  name: "Caixa",
  components: { Confirmation },
  computed: {
    dialogConfirmation() {
      return confirmation.confirm;
    }
  },
  data() {
    return {
      valorInicial: "",
      errors: [],
      alert: this.$route.params.alert,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
      //user_id: localStorage.getItem("user"), //[TODO] authentication in backend is not built
      turno: [ 'Manhã', 'Noite'],
      selectedTurno: ""
    };
  },

  watch: {
    dialogConfirmation(value) {
      if (value === true) {
        this.abrirCaixa();
      }
    }
  },

  directives: { money: VMoney },

  methods: {
    abrirCaixa() {
      console.log(this.valorInicial)
      abrirCaixa({
        funcionario: 1, //TODO that
        valorInicial: turnNumber(this.valorInicial),
        turno: this.selectedTurno
      })
        .then(response => {
          this.caixa = response.data; //[TODO] make backend return caixaId
          dialogConclude();
          this.$router.push({
            name: "Caixa Aberto",
            params: { caixaId: response.data.id }
          });
        })
        .catch(error => this.errors.push(error.response))
        .finally(() => { dialogConclude() });
    },
    confirm() {
      openDialog();
    }
  },
};
</script>
