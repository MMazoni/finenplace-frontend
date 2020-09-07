<template>
  <div class="equipe">
    <v-subheader class="grey--text">Equipe</v-subheader>
    <v-container class="my-5">
      <v-row>
        <v-col sm="12" md="6" lg="4" xl="3" v-for="person in team" :key="person.name">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" :alt="`${person.name} Avatar`">
              </v-avatar>
            </v-responsive>
            <v-card-text class="text-center">
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="#ecc30b">
                <v-icon small left>message</v-icon>
                <span>Mensagem</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>  
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Equipe',
  data() {
      return {
        team: [
          { name: "Matheus Mazoni", role: "Front-end Developer", avatar: "https://avatars1.githubusercontent.com/u/37179593?s=460&u=49c29fed6531de1a1e09fed0ff13d2582033d060&v=4" },
          { name: "Fabio Sales", role: "Back-end Developer", avatar: "https://avatars2.githubusercontent.com/u/55097023?s=460&u=a0eed4f40173c8cd72f53e73f0d392b5ccdd3008&v=4" },
          { name: "Felipe Ramos", role: "DevOps Engineer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQg1IHcQ131skMdqGMVqVxmj4aZfrGm74UJhQ&usqp=CAU" },
          { name: "Henrique Berg", role: "Designer", avatar: "https://i1.sndcdn.com/avatars-000628236168-u7a4ml-t500x500.jpg" },
        ]
      }
  }
}
</script>
