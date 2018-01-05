<template>
  <v-dialog width="350px" persistant v-model="editDialog">

    <v-btn accent slot="activator">
      Edit Date
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
              <v-date-picker v-model="editableDate" style="width: 100%" actions="">
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
              </v-date-picker>
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
      editableDate: ''
    }
  },
  methods: {
    onSaveChanges () {
      const date = new Date(this.meetup.date)
      const newDate = new Date(this.editableDate)
      date.setUTCDate(newDate.getUTCDate())
      date.setUTCMonth(newDate.getUTCMonth())
      date.setUTCFullYear(newDate.getUTCFullYear())

      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: date.toISOString()
      })
    }
  },
  created () {
    this.editableDate = this.meetup.date
  }
}
</script>

<style lang="css">
</style>
