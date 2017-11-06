<template>
  <div class="hello">
    <div class="constuctor">
      <h1>Create man</h1>
      <div class="">
        <label>Name: </label><input v-model="name"/>
      </div>
      <button @click="createUnit">Create</button>
    </div>
    <div class="men">
      <button class="tick" @click="$store.commit('TICK')">TICK!</button>
      <h2>Date: {{getDate.calendar()}}</h2>
      <div v-for="man in getMen" class="man">
        <h1>Name: {{man.name}}</h1>
        <p>Age: {{dateDifference(man)}}</p>
        <p>Current action {{man.action}}</p>
        <span>Health:</span><progress :value="man.powers" max="100"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['getDate', 'getMen'])
  },
  methods: {
    dateDifference (human) {
      return moment.duration(this.getDate.diff(human.birthDate)).humanize(true)
    },
    createUnit () {
      this.$store.dispatch('addMan', {name: this.name})
    }
  },
  mounted () {
    this.$store.dispatch('startWorld')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
}
</style>addValue
