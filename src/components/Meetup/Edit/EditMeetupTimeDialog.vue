<template>
  <v-dialog width="350px" persistant v-model="editDialog">

    <v-btn accent slot="activator">
      Edit Time
    </v-btn>

    <v-card>
      <v-container>

        <v-layout row>
          <v-flex x12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row>
          <v-flex x12>
            <v-card-text>
              <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
                <template scope="{save, cancel}">
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="editDialog = false">Close</v-btn>
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="onSaveChanges">Save</v-btn>
                </template>
              </v-time-picker>
            </v-card-text>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableTime: ''
    }
  },
  methods: {
    onSaveChanges () {
      const date = new Date(this.meetup.date)
      date.setHours(this.editableTime.match(/^(\d+)/)[1])
      date.setMinutes(this.editableTime.match(/:(\d+)/)[1])

      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: date.toISOString()
      })
    }
  },
  created () {
    this.editableTime = new Date(this.meetup.date).toTimeString()
  }
}
</script>

<style lang="css">
</style>
