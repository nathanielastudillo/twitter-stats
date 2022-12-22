<template>
  <v-container>
    <v-card class="ma-3">
      <v-card-title>
        <h1>Stats</h1>
      </v-card-title>
      <v-card-subtitle v-if="$store.state.stats.archiveJSON"
        >As of {{ dateOfMostRecentTweet }}</v-card-subtitle
      >
    </v-card>
    <v-row v-if="$store.state.stats.archiveJSON">
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
        <v-col>
          <v-btn @click="clear">Clear</v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-progress-circular
        v-else
        class="ma-6"
      :size="70"
      :width="10"
      :value = 70
      color="blue"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
import DataCard from "../components/dataCard.vue";
import DataCardNumeric from "../components/dataCardNumeric.vue";
import DataCardText from "../components/dataCardText.vue";

function stripUpToFirstBracket(str) {
  // find the index of the first [ character
  const index = str.indexOf("[");
  let result = str.slice(index);
  // use the slice method to return everything after the first [ character
  return result;
}
function stripNonWords(str) {
  // remove links and replace
  str = str.replace(/(https?:\/\/[^\s]+)/g, "");
  // remove hashtags
  str = str.replace(/(#\w+)/g, "");
  // remove mentions
  str = str.replace(/(@\w+)/g, "");
  // remove RT
  str = str.replace(/(RT)/g, "");
  // remove non-ascii characters
  str = str.replace(/[^\x00-\x7F]/g, "");
  // remove newlines
  str = str.replace(/(\r\n|\n|\r)/gm, " ");
  // remove punctuation
  str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  return str;
}

export default {
  name: "Stats",
  data() {
    return {
        attrs: {
        class: 'ma-6',
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  mounted() {
    this.readFile();
  },
  components: { DataCardNumeric },
  methods: {
    async readFile() {
      const file = this.$store.state.stats.archive;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const strippedTilBrackets = stripUpToFirstBracket(text);
        this.$store.commit("stats/setArchiveJSON", strippedTilBrackets);
      };
      reader.readAsText(file);
    },
    clear() {
      this.$store.commit("stats/setArchive", null);
      this.$store.commit("stats/setArchiveJSON", null);
      this.$router.push("/");
    },
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
      return this.$store.state.stats.archiveJSON[
        this.$store.state.stats.archiveJSON.length - 1
      ].tweet.full_text;
    },
    numWordsInAllTweets() {
      return this.$store.state.stats.archiveJSON.reduce((acc, tweet) => {
        return (
          acc +
          stripNonWords(tweet.tweet.full_text)
            .split(" ")
            // remove empty strings
            .reduce((acc, cur) => {
              if (cur !== "") {
                acc.push(cur);
              }
              return acc;
            }, []).length
        );
      }, 0);
    },
    dateOfMostRecentTweet() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = Date.parse(
        this.$store.state.stats.archiveJSON[0].tweet.created_at
      );
      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
  components: { DataCard, DataCardNumeric, DataCardText, DataCardText },
};
</script>

<style lang="scss" scoped>
</style>