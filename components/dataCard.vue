<template>
    <v-card>
        
                <v-badge overlap large color="blue" :icon="badgeIcon">
               <v-icon x-large>{{ mainIcon }}</v-icon>  
            </v-badge>
        
        <v-card-title>
            {{ number }}
        </v-card-title>
        <v-card-text>
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'DataCardNumeric',
        props: {
            number: Number,
            text: String,
            mainIcon: String,
            badgeIcon: String,
            
        }
    }
</script>

<style lang="scss" scoped>

</style>