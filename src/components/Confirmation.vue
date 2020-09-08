<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Você tem certeza?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary darken-1" text @click="runConfirmation(false)">Não</v-btn>

          <v-btn color="primary darken-1" text @click="runConfirmation(true)">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { bus } from "@/plugins/bus.js";

export default {
  name: "Confirmation",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    runConfirmation(confirmation) {
      this.dialog = false;
      bus.$emit('runConfirmation', confirmation);
    }
  },
  created() {
    bus.$on("toggle", (data) => (this.dialog = data));
  },
};
</script>
