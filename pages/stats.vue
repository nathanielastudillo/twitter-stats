<template>
<v-container>
                <v-card>
                    <v-card-title>
                        <h1>Stats</h1>
                        <v-subtitle v-if="$store.state.stats.archiveJSON">As of {{ dateOfMostRecentTweet }}</v-subtitle>
                    </v-card-title>
                    <v-card-text v-if="$store.state.stats.archiveJSON">
                        
                        <p>
                            {{ "Most Recent Archive Tweet: " + mostRecentTweet }}
                            <br><br>
                            {{ "First Archive Tweet: " + firstTweet }}
                            <br><br>
                            {{ "Keys: " }}
                            <br><br>
                            <!-- bulleted list of tweetKeys -->
                            <ul>
                                <li v-for="key in tweetKeys" :key="key">
                                    {{ key }}
                                </li>
                            </ul>
                        </p>

                    </v-card-text>
                </v-card>
                        <v-row> 
                            <v-col>
                                <DataCardNumeric
                                        width="30%"
                                        :number="numTweets"
                                        label="Number of Tweets"
                                        mainIcon="mdi-bird"
                                        badgeIcon="mdi-pound"
                                        ></DataCardNumeric>
                                    <DataCardNumeric
                                        width="30%"
                                        :number="numWordsInAllTweets"
                                        label="Number of Words in All Tweets"
                                        mainIcon="mdi-bird"
                                        badgeIcon="mdi-card-text"
                                        ></DataCardNumeric>
                                        <DataCardText
                                        :text="mostRecentTweet"
                                        label="Most Recent Tweet"
                                        mainIcon="mdi-pin"
                                        badgeIcon="mdi-clock"
                                        ></DataCardText>
                                        <DataCardText
                                        :text="firstTweet"
                                        label="First Tweet"
                                        mainIcon="mdi-home-floor-1"
                                        badgeIcon="mdi-clock"
                                        ></DataCardText>
                            </v-col>
                        </v-row>
    </v-container>
</template>

<script>
import DataCard from '../components/dataCard.vue'
import DataCardNumeric from '../components/dataCardNumeric.vue'
import DataCardText from '../components/dataCardText.vue'


function stripUpToFirstBracket(str) {
  // find the index of the first [ character
  const index = str.indexOf('[')
  let result = str.slice(index)
  // use the slice method to return everything after the first [ character
  return result
}
    export default {
    name: "Stats",
    mounted() {
        console.log("mounted stats");
        this.readFile();
    },
    components: { DataCardNumeric },
    methods: {
        async readFile() {
            console.log("readFile");
            const file = this.$store.state.stats.archive;
            console.log("file", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("reader.onload");
                const text = e.target.result;
                this.$store.commit("stats/setArchiveJSON", stripUpToFirstBracket(text));
                console.log("text", text);
            };
            reader.readAsText(file);
        }
    },
    computed: {
        numTweets() {
            return this.$store.state.stats.archiveJSON.length;
        },
        tweetKeys() {
            return Object.keys(this.$store.state.stats.archiveJSON[0].tweet);
        },
        mostRecentTweet() {
            return this.$store.state.stats.archiveJSON[0].tweet.full_text;
        },
        firstTweet() {
            return this.$store.state.stats.archiveJSON[this.$store.state.stats.archiveJSON.length - 1].tweet.full_text;
        },
        numWordsInAllTweets() {
            let numWords = 0;
            this.$store.state.stats.archiveJSON.forEach(tweet => {
                numWords += tweet.tweet.full_text.split(" ").length;
            });
            return numWords;
        },
        dateOfMostRecentTweet() {
            return this.$store.state.stats.archiveJSON[0].tweet.created_at;
        },
    },
    components: { DataCard, DataCardNumeric, DataCardText, DataCardText }
}
</script>

<style lang="scss" scoped>

</style>