<template lang="html">
  <v-alert error dismissible v-model="alert" @input="onClose" :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  data () {
    return {
      alert: {}
    }
  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="css">
</style>
