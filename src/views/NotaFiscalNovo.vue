<template>
  <div id="novo-nota-fiscal">
    <v-subheader class="grey--text">NotaFiscal \ Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Nota Fiscal</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">
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
            <v-spacer></v-spacer>

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
            <v-spacer></v-spacer>

            <v-select
              v-model="fornecedor"
              :items="fornecedores"
              item-text="nome"
              item-value="id"
              label="Fornecedor"
              required
            ></v-select>

            <v-row justify="center">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-6" color="primary" block dark v-bind="attrs" v-on="on">
                    Adicionar Produtos
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Adicionar Produtos</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form>
                        <v-row>
                          <v-col cols="12">
                            <v-select
                              v-model="produto.id"
                              :items="produtos"
                              item-text="nome"
                              item-value="id"
                              label="Produto"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model.lazy="qtd"
                              label="Quantidade"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Fechar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="confirmTwo">
                      Adicionar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>

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
import moment from 'moment';
import {fornecedores} from "@/services/fornecedor";
import {storeNotaFiscal} from "@/services/nota-fiscal";
import {produtos} from "@/services/produto";

export default {
  name: "NotaFiscalNovo",


  data: () => ({
    valor: "",
    dialog: false,
    fornecedor: "",
    fornecedores: [],
    produtos: [],
    produto: {
      id: "",
    },
    qtd: "",
    produtosNotaFiscal: [],
    dataCompra: moment().format('YYYY-MM-DD'),
    dataVencimento: moment().format('YYYY-MM-DD'),
    menu1: false,
    menu2: false,
    errors: [],
  }),

  computed: {
    dataCompraFormatada() {
      return this.dataCompra ? moment(this.dataCompra).format('DD/MM/YYYY') : ''
    },
    dataVencimentoFormatada() {
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

    async confirmTwo() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de adicionar o produto na nota fiscal?',
      });
      if (res) {
        this.adicionarProduto();
      }
    },

    criarNotaFiscal() {
      const notaFiscal = {
        fornecedor: {
          id: this.fornecedor
        },
        dataCompra: this.dataCompraFormatada,
        dataVencimento: this.dataVencimentoFormatada,
        produtosNotaFiscal: this.produtosNotaFiscal,
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
    },

    fetchProduto() {
      produtos()
        .then(response => this.produtos = response.data)
        .catch(error => this.errors.push(error.response));
    },

    adicionarProduto: function () {
      const produto = {
        produto: this.produto,
        qtd: this.qtd
      };
      this.produtosNotaFiscal.push(produto);
      this.produto = {
        id: "",
      };
      this.qtd = "";
    }
  },

  mounted() {
    this.fetchFornecedores();
    this.fetchProduto();
  }
}
</script>
