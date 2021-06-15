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
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { abrirCaixa, turnNumber, money } from "@/services/caixa";
import { VMoney } from "v-money";

export default {
  name: "Caixa",

  data() {
    return {
      valorInicial: "",
      errors: [],
      alert: this.$route.params.alert,
      turno: [ 'Matutino', 'Noturno'],
      selectedTurno: ""
    };
  },

  computed: {
    money() {
      return money;
    }
  },

  directives: { money: VMoney },

  methods: {
    abrirCaixa() {
      console.log(this.valorInicial)
      abrirCaixa({
        funcionario: localStorage.getItem("user"),
        valorInicial: turnNumber(this.valorInicial),
        turno: this.selectedTurno
      })
        .then(response => {
          this.caixa = response.data;
          this.$router.push({
            name: "CaixaAberto",
            params: { caixaId: response.data.id }
          });
        })
        .catch(error => this.errors.push(error.response));
    },
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você tem certeza?',
      });
      if (res) {
        this.abrirCaixa();
      }
    }
  },
};
</script>
