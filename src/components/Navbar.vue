<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Finen</span>
        <span>Place</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="grey">
        <span>Sair</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary lighten-1">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="https://avatars1.githubusercontent.com/u/37179593?s=460&u=49c29fed6531de1a1e09fed0ff13d2582033d060&v=4" alt="Usuário Avatar">
          </v-avatar>
        </v-flex>
        <p class="dark_gray--text subheading mt-1">Matheus Mazoni</p>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="dark_gray--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      links: [
        {icon: 'dashboard', text: 'Dashboard', route: '/'},
        {icon: 'local_atm', text: 'Caixa', route: '/caixa'},
        {icon: 'local_shipping', text: 'Fornecedor', route: '/fornecedor'},
        {icon: 'receipt', text: 'Nota Fiscal', route: '#'},
        {icon: 'inventory_2', text: 'Produto', route: '#'},
        {icon: 'person', text: 'Equipe', route: '/equipe'},
      ]
    };
  },
};
</script>