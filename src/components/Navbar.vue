<template>
    <nav>
        <v-app-bar text app>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Finan</span>
                <span>Place</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="grey">
                <span>Sair</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>    
    </nav>    
</template>

<script>
export default {
    name: "Navbar"
}
</script>