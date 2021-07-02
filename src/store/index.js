import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 'Guillaume',
    events: [],
    eventsPerPage: 4
  },
  mutations: {
    ADD_EVENT (state, event) {
      state.events.push(event)
    },
    DELETE_EVENT (state, event) {
      const index = state.events.indexOf(event)
      state.events.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
