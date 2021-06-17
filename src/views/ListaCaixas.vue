<template>
  <div class="caixas">
    <v-snackbar
      v-model="alert"
      top
      color="success"
      timeout="3000"
    >
      Caixa fechado com sucesso.
    </v-snackbar>
    <v-subheader class="grey--text">Dashboard</v-subheader>
    <v-container class="my-5">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" x-large dark v-bind="attrs" v-on="on">
              Gerar DRE
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">DRE</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form>
                  <v-row justify="center">
                    <v-date-picker
                      v-model="picker"
                      type="month"
                    ></v-date-picker>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Fechar
              </v-btn>
              <v-btn color="blue darken-1" text @click="confirm">
                Gerar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <h1 class="grey--text subtitle-1">Caixas</h1>
      <v-card class="px-3 py-1 mt-2" v-for="caixa in caixas" :key="caixa.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ caixa.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Funcionário</div>
            <div class="body-2">
              {{ firstName(caixa.abertura.funcionario.nome) }}
            </div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Turno</div>
            <div class="body-2">{{ caixa.abertura.turno }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Valor Inicial</div>
            <div class="body-2">{{ toReal(caixa.abertura.valorInicial) }}</div>
          </v-col>
          <v-col sm="2" md="4" lg="2s">
            <div class="caption grey--text">Faturamento</div>
            <div class="body-2">{{ toReal(caixa.valorFinal) }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { caixasFechados } from "@/services/caixa";
import { dre } from "@/services/dre";
import { toReal } from "@/utils";
import moment from 'moment';

export default {
  name: "ListaCaixas",
  data: () => ({
    caixas: [],
    dialog: false,
    dataInicio: moment().format('YYYY-MM-DD'),
    picker: new Date().toISOString().substr(0, 10),
    menu1: false,
    errors: [],
  }),

  computed: {
    dataInicioFormatada () {
      return this.picker ? moment(`${this.picker}-01`).format('DD/MM/YYYY') : ''
    },
    alert () {
      return this.$route.params.alert;
    }
  },

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de gerar o DRE?',
      });
      if (res) {
        this.dialog = false;
        this.fetchDRE();
      }
    },

    fetchDRE() {
      dre({
        inicio: this.dataInicioFormatada,
      })
        .then(() => {
          this.$router.push({
            name: 'Dre',
            params: { alert: true }
          });
        })
        .catch(error => this.errors.push(error.response));
    },

    fetchCaixas() {
      caixasFechados()
        .then(response => this.caixas = response.data)
        .catch(error => this.errors.push(error.response));
    },

    firstName(name) {
      const array = name.split(" ");
      return array[0];
    },

    toReal,
  },

  mounted() {
    this.fetchCaixas();
  },
};
</script>
