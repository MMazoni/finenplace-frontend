<template>
  <div class="caixa-aberto">
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

            <v-text-field v-model.lazy="online" v-money="money" label="Valor Online" required></v-text-field>

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
import { bus } from "@/plugins/bus.js";
import { showCaixa, fecharCaixa, turnNumber } from "@/services/caixa";
import { getDespesasByCaixa } from "@/services/despesa";
import { getSangriasByCaixa } from "@/services/sangria";
import { getEntradasByCaixa } from "@/services/entrada";
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
    online: "",
    sangrias: [],
    sangriaTotal: 0,
    entradas: [],
    entradaTotal: 0,
    despesas: [],
    despesaTotal: 0,
    errors: [],
    confirmation: null,
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2,
      masked: false,
    },
  }),

  watch: {
    confirmation(value) {
      if (value === true) {
        this.fechamento();
      }
    },
  },

  computed: {
    faturamento() {
      return (
        turnNumber(this.dinheiro) +
        turnNumber(this.credito) +
        turnNumber(this.debito) +
        turnNumber(this.refeicao) +
        turnNumber(this.online) +
        this.sangriaTotal +
        this.despesaTotal -
        parseFloat(this.caixa.vl_CaixaInicial) -
        this.entradaTotal
      ).toFixed(2);
    },
  },

  directives: { money: VMoney },

  methods: {
    fechamento() {
      //POST 'Fecha o caixa e faz as contas gerando o faturamento, retorna o faturamento'
      console.log(this.faturamento);
      fecharCaixa(this.$route.params.caixaId, {
        dinheiro: turnNumber(this.dinheiro),
        credito: turnNumber(this.credito),
        debito: turnNumber(this.debito),
        refeicao: turnNumber(this.refeicao),
        online: turnNumber(this.online),
        sangrias: this.sangriaTotal,
        despesas: this.despesaTotal,
        entradas: this.entradaTotal,
        faturamento: this.faturamento,
      })
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "Caixa",
            params: { alert: true },
          });
        })
        .catch((err) => this.errors.push(err.response));
    },

    async fetchSangrias() {
      // GET 'Lista todas as sangrias pelo id do caixa'
      await getSangriasByCaixa(this.$route.params.caixaId)
        .then((res) => (this.sangrias = res.data))
        .catch((err) => this.errors.push(err.response));
      await this.sangrias.reduce(
        (acc, value) => (this.sangriaTotal += parseFloat(value.vl_Sangria)),
        {}
      );
    },
    async fetchEntradas() {
      // GET 'Lista todas as entradas pelo id do caixa'
      await getEntradasByCaixa(this.$route.params.caixaId)
        .then((res) => (this.entradas = res.data))
        .catch((err) => this.errors.push(err.response));
      await this.entradas.reduce(
        (acc, value) => (this.entradaTotal += parseFloat(value.vl_Entrada)),
        {}
      );
    },
    async fetchDespesas() {
      // GET 'Lista todas as despesas pelo id do caixa'
      await getDespesasByCaixa(this.$route.params.caixaId)
        .then((res) => {
          this.despesas = res.data;
          console.log(res.data);
        })
        .catch((err) => this.errors.push(err.response));
      await this.despesas.reduce(
        (acc, value) => (this.despesaTotal += parseFloat(value.vl_Despesa)),
        {}
      );
    },
    fetchCaixa() {
      // GET 'Exibe o caixa pelo seu id'
      showCaixa(this.$route.params.caixaId)
        .then((res) => (this.caixa = res.data))
        .catch((err) => this.error.push(err.response));
    },
    confirm() {
      bus.$emit("toggle", true);
    },
  },

  created() {
    bus.$on("runConfirmation", (data) => {
      this.confirmation = data;
    });
  },

  mounted() {
    this.fetchCaixa();
    this.fetchSangrias();
    this.fetchEntradas();
    this.fetchDespesas();
  },
};
</script>