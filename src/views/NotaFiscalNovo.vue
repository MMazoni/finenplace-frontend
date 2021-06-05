<template>
  <div id="novo-fornecedor">
    <v-subheader class="grey--text">NotaFiscal \ Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Nota Fiscal</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">
            <v-col cols="12">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dataCompraFormatada"
                    label="Data de Compra"
                    readonly
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="dataCompra = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dataCompra"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="12">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dataVencimentoFormatada"
                    label="Data de Vencimento"
                    readonly
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="dataVencimento = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dataVencimento"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="12">
              <v-text-field
                v-model.lazy="valor"
                v-money="money"
                label="Valor Total"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="fornecedor"
                :items="fornecedores"
                item-text="nome"
                item-value="id"
                label="Fornecedor"
                required
              ></v-select>
            </v-col>

            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar Nota Fiscal</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VMoney } from "v-money";
import { money, turnNumber } from "@/services/caixa";
import { fornecedores } from "@/services/fornecedor";
import { storeNotaFiscal } from "@/services/nota-fiscal";
import moment from 'moment';

export default {
  name: "NotaFiscalNovo",


  data: () => ({
    valor: "",
    fornecedor: "",
    fornecedores: [
      {id: 1, nome: 'Krisalda', telefone: '(11) 2131-2131'},
      {id: 2, nome: 'Lençol', telefone: '(11) 4252-3234'},
      {id: 3, nome: 'Balela', telefone: '(13) 2112-2234'},
      {id: 4, nome: 'YUGD', telefone: '(11) 97322-2423'},
    ],
    dataCompra: moment().format('YYYY-MM-DD'),
    dataVencimento: moment().format('YYYY-MM-DD'),
    menu1: false,
    menu2: false,
    errors: [],
  }),

  directives: { money: VMoney },

  computed: {
    money() {
      return money;
    },
    dataCompraFormatada () {
      return this.dataCompra ? moment(this.dataCompra).format('DD/MM/YYYY') : ''
    },
    dataVencimentoFormatada () {
      return this.dataVencimento ? moment(this.dataVencimento).format('DD/MM/YYYY') : ''
    },
  },

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar a nota fiscal?',
      });
      if (res) {
        this.criarNotaFiscal();
      }
    },

    criarNotaFiscal() {
      const notaFiscal = {
        data_compra: this.dataCompra,
        data_vencimento: this.dataVencimento,
        valor_total: turnNumber(this.valor),
        fornecedor_id: this.fornecedor
      };
      storeNotaFiscal(notaFiscal)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "NotaFiscal"
          });
        })
        .catch((error) => this.errors.push(error.response))
    },

    fetchFornecedores() {
      fornecedores()
        .then(response => this.fornecedores = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },

  mounted() {
    this.fetchFornecedores();
  }
}
</script>
