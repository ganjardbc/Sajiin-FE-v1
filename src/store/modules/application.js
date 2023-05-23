export default {
    namespaced: true,

    state: {
        updateApplication: false
    },

    getters: {},

    mutations: {
        SET_UPDATE_APPLICATION (state, value) {
            state.updateApplication = value
        },
    },

    actions: {
        setUpdateApplication ({ commit }, data) {
            commit('SET_UPDATE_APPLICATION', data)
        },
    }
}