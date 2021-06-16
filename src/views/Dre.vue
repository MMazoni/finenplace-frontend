<template>
  <div id="dre">
    <v-subheader class="grey--text">DRE</v-subheader>
    <v-container class="my-5 pt-5 fill-height" fluid>
      <h1 class="primary--text subtitle-1 justify-center">{{ dre.inicio }} - {{ moment(dre.fim).format('DD/MM/YYYY') }}</h1>
      <v-row align="center" justify="center">

        <v-col cols="12" sm="8" md="4">
          <v-card class="px-3 py-1 mt-2">
            <v-row>
              <v-col>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.totalDia) }}</v-list-item-title>
                    <v-list-item-subtitle>Total Período Dia</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.totalNoite) }}</v-list-item-title>
                    <v-list-item-subtitle>Total Período Noite</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.carnes) }}</v-list-item-title>
                    <v-list-item-subtitle>Carnes</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.aves) }}</v-list-item-title>
                    <v-list-item-subtitle>Aves</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.suinos) }}</v-list-item-title>
                    <v-list-item-subtitle>Suínos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.laticinios) }}</v-list-item-title>
                    <v-list-item-subtitle>Laticínios</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.peixes) }}</v-list-item-title>
                    <v-list-item-subtitle>Peixes</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.suinos) }}</v-list-item-title>
                    <v-list-item-subtitle>Data Início</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.secos) }}</v-list-item-title>
                    <v-list-item-subtitle>Secos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.legumes) }}</v-list-item-title>
                    <v-list-item-subtitle>Legumes</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.frutas) }}</v-list-item-title>
                    <v-list-item-subtitle>Frutas</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.oleo) }}</v-list-item-title>
                    <v-list-item-subtitle>Óleo</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.doces) }}</v-list-item-title>
                    <v-list-item-subtitle>Doces</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.docted) }}</v-list-item-title>
                    <v-list-item-subtitle>DOC/TED</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.pcteServico) }}</v-list-item-title>
                    <v-list-item-subtitle>Porcentagem Serviço</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.mensalSeguro) }}</v-list-item-title>
                    <v-list-item-subtitle>Seguro Mensal</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.paes) }}</v-list-item-title>
                    <v-list-item-subtitle>Pães</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.congelados) }}</v-list-item-title>
                    <v-list-item-subtitle>Congelados</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.enlatados) }}</v-list-item-title>
                    <v-list-item-subtitle>Enlatados</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.cervejas) }}</v-list-item-title>
                    <v-list-item-subtitle>Cervejas</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.cervejasEspeciais) }}</v-list-item-title>
                    <v-list-item-subtitle>Cervejas Especiais</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.refrigerantes) }}</v-list-item-title>
                    <v-list-item-subtitle>Refrigerantes</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.bebidas) }}</v-list-item-title>
                    <v-list-item-subtitle>Bebidas</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.descartaveis) }}</v-list-item-title>
                    <v-list-item-subtitle>Descartáveis</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.embalagens) }}</v-list-item-title>
                    <v-list-item-subtitle>Embalagens</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.aluguel) }}</v-list-item-title>
                    <v-list-item-subtitle>Aluguel</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.iptu) }}</v-list-item-title>
                    <v-list-item-subtitle>IPTU</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.energia) }}</v-list-item-title>
                    <v-list-item-subtitle>Energia</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.agua) }}</v-list-item-title>
                    <v-list-item-subtitle>Água</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.gas) }}</v-list-item-title>
                    <v-list-item-subtitle>Gás</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.internet) }}</v-list-item-title>
                    <v-list-item-subtitle>Internet</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.saque) }}</v-list-item-title>
                    <v-list-item-subtitle>Saque</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.contabilidade) }}</v-list-item-title>
                    <v-list-item-subtitle>Contabilidade</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.marketing) }}</v-list-item-title>
                    <v-list-item-subtitle>Marketing</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.limpeza) }}</v-list-item-title>
                    <v-list-item-subtitle>Limpeza</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.assessoria) }}</v-list-item-title>
                    <v-list-item-subtitle>Assessoria</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.alarme) }}</v-list-item-title>
                    <v-list-item-subtitle>Alarme</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.pdv) }}</v-list-item-title>
                    <v-list-item-subtitle>PDV</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.eventos) }}</v-list-item-title>
                    <v-list-item-subtitle>Eventos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.manutencao) }}</v-list-item-title>
                    <v-list-item-subtitle>Manutenção</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.perdas) }}</v-list-item-title>
                    <v-list-item-subtitle>Perdas</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.usos) }}</v-list-item-title>
                    <v-list-item-subtitle>Usos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.escritorio) }}</v-list-item-title>
                    <v-list-item-subtitle>Escritório</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.dedetizacao) }}</v-list-item-title>
                    <v-list-item-subtitle>Detetização</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.estacionamento) }}</v-list-item-title>
                    <v-list-item-subtitle>Estacionamento</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.administrativa) }}</v-list-item-title>
                    <v-list-item-subtitle>Administativa</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.antecipacao) }}</v-list-item-title>
                    <v-list-item-subtitle>Antecipação</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ toReal(dre.extrato) }}</v-list-item-title>
                    <v-list-item-subtitle>Extrato</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {listDre} from "@/services/dre";
import {toReal} from "@/utils";
import moment from 'moment';

export default {
  name: "Dre",
  data: () => {
    return {
      dre: []
    }
  },
  methods: {
    toReal,
    moment,
    fetchDre() {
      listDre()
        .then(response => this.dre = response.data)
        .catch(error => this.errors.push(error.response));
    },
  },
  mounted() {
    this.fetchDre();
  }
}
</script>
