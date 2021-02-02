import {RootContext, Participants} from './parser/index.js'

import SeqDiagram from './components/SeqDiagram.vue'

import './components/Cosmetic.scss'
import './components/theme-blue-river.scss'

const Store = () => {
  return {
    state: {
      // 'lifeLineDimensions' is decided by code and browser's behavior.
      // It cannot be a simple getter (which is a computed value of a state property).
      lifeLineDimensions: new Map(),
      firstInvocations: {},
      code: '',
      events: [],
      selected: [],
      cursor: undefined,
      // To be overridden by plugins
      onLifelineMounted: () => {
      }
    },
    getters: {
      // We are using getters to avoid hard coding module's name ($store.Store.state)
      // in the components. Not sure if this is the best practice.
      firstInvocations: (state) => state.firstInvocations,
      cursor: (state) => state.cursor,
      starter: (state, getters) => {
        let starterExp = getters.rootContext.head()?.starterExp()
        return starterExp?.starter()?.getCode() || 'Starter'
      },
      rootContext: (state) => {
        return RootContext(state.code)
      },
      participants: (state, getters) => {
        return Participants(getters.rootContext)
      },
      centerOf: (state) => (entity) => {
        return state.lifeLineDimensions.get(entity) &&
          (state.lifeLineDimensions.get(entity).left + state.lifeLineDimensions.get(entity).width / 2)
      },
      leftOf: (state) => (entity) => {
        return state.lifeLineDimensions.get(entity) && state.lifeLineDimensions.get(entity).left
      },
      rightOf: (state) => (entity) => {
        return state.lifeLineDimensions.get(entity) &&
          (state.lifeLineDimensions.get(entity).left + state.lifeLineDimensions.get(entity).width)
      },
      widthOf: (state) => (entity) => {
        return state.lifeLineDimensions.get(entity) && state.lifeLineDimensions.get(entity).width
      },
      // deprecated, use distances that returns centerOf(to) - centerOf(from)
      distance: (state, getters) => (from, to) => {
        return getters.centerOf(from) - getters.centerOf(to)
      },
      // deprecated: It should return centerOf(to) - centerOf(from)
      distance2: (state, getters) => (from, to) => {
        if (!from || !to) return 0
        return getters.centerOf(to) - getters.centerOf(from)
      },
      onLifelineMounted: (state) => state.onLifelineMounted
    },
    mutations: {
      code: function (state, payload) {
        state.code = payload
      },
      event: function (state, payload) {
        state.events.push(payload)
      },
      onLifelinePositioned: function(state, payload) {
        state.lifeLineDimensions.set(payload.name, payload.dimensions)
      },
      onLifeLineLayerMountedOrUpdated: function (state, payload) {
        state.lifeLineDimensions = payload
      },
      onMessageLayerMountedOrUpdated: function (state, payload) {
        state.firstInvocations = payload
      },
      onSelect: function (state, payload) {
        if (state.selected.includes(payload)) {
          state.selected = state.selected.filter(p => p !== payload)
        } else {
          state.selected.push(payload)
        }
      }
    },
    actions: {
      updateCode: function (context, payload) {
        context.commit('code', payload)
      }
    },
    // TODO: Enable strict for development?
    strict: false,
  }
}

let Version = '2.6.3'
export {
  Version,
  Store,
  SeqDiagram
}
