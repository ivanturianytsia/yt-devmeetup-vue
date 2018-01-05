<template>
  <v-dialog persistant v-model="dialog">

    <v-btn class="primary" accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>

    <v-card>
      <v-container>

        <v-layout row>
          <v-flex x12>
            <v-card-title>{{ userIsRegistered ? 'Unregister from' : 'Register for' }} meetup?</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row>
          <v-flex x12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex x12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="dialog = false"
                >Cancel</v-btn>
                <v-btn
                  class="green--text darken-1"
                  flat
                  @click="onAgree"
                  >Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>

<style lang="css">
</style>
