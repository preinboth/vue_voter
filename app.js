const app = Vue.createApp({
  // Optionen
  data: function () {
    return {
      submissions: submissions, // aus seed.js
      // totalVotes: 0,
    };
  },


  computed: {
      totalVotes(newValue, oldValue) {
        return this.submissions.reduce((totalVotes, submission) => {
          return totalVotes + submission.votes;
        }, 0);
    },
    sortedSubmissions() {
      return this.submissions.sort((a, b) => {
        return b.votes - a.votes;
      });

    },
    cardHeaderBackgroundColor() {
      return {
        'bg-success text-white': this.totalVotes >= 70,
        'bg-warning text-danger': this.totalVotes < 70,
      };
    },
    // cardTitleFontSize() {
    //   return {
    //     fontSize: this.totalVotes + 'px',
    //   };
    // },
  },
  watch: {
  //   submissions: {
  //     handler(newValue, oldValue) {
  //       this.totalVotes = this.submissions.reduce((totalVotes, submissions) => {
  //         return totalVotes + submissions.votes;
  //       }, 0);
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  // totalVotes(newValue, oldValue) {
  //   console.log(newValue);
  //   console.log(oldValue);
  },
});

// Globale Component
app.component("SubmissionListItem", {
  //  Optionen
  props: [ "submission" ],
  methods: {
      upvote(submissionId) {
        this.submission.votes++;
      },
  },
  template: `                                        
  <div class="d-flex">
    <div class="d-shrink-0">
      <img v-bind:src="submission.img" alt="64">
    </div>
    <div class="flex-grow-1 ms-3">
      <h5>[{{ submission.id }}]  {{ submission.title }}
        <span class="float-end text-primary"
            style="cursor: pointer"
            @click="upvote()">
            <i class="fa fa-chevron-up"></i>
            <strong>{{ submission.votes }}</strong>
        </span>
      </h5> 
      <div v-html="submission.desc"></div>
      <small class="text-muted">eingereicht von: {{ submission.author }}</small>
    </div>
  </div>
  `
});

// Liefert eine Instanz zur Root-Component zurück
const vm = app.mount("#app");
