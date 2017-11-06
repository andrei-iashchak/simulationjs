import Vue from 'vue'
import Vuex from 'vuex'
import Man from './classes/Human'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: moment('0000-01-01'),
    humans: [],
    started: false
  },
  actions: {
    startWorld: ({state, commit}) => {
      if (!state.started) {
        state.started = true
        setInterval(() => commit('TICK'), 1000)
      }
    },
    addMan: ({state, commit}, {name}) => {
      commit('ADD_MAN', {name, currentTime: state.date})
    }
  },
  getters: {
    getDate: (state) => state.date,
    getMen: (state) => state.humans
  },
  mutations: {
    TICK (state) {
      state.date = moment(state.date.add(1, 'hour'))
      state.humans.forEach((m) => m.tick())
    },
    ADD_MAN (state, {name, currentTime}) {
      state.humans = [...state.humans, new Man({name, currentTime})]
    }
  }
})
