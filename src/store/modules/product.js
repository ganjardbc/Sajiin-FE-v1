import axios from 'axios'

const defaultForm = () => {
    return {
        id: '',
        product_id: '',
        image: '',
        name: '',
        description: '',
        note: '',
        is_pinned: 0,
        is_available: 0,
        status: '',
        category_id: ''
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultForm(),
        limit: 10,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        loadingForm: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            status: '',
        },
        category: {
            limit: 10,
            offset: 0,
            totalRecord: 0,
            loading: false,
            data: [],
            filter: {
                search: '',
                status: 'active',
            },
        }
    },

    getters: {},

    mutations: {
        RESET_ERROR_MESSAGE (state) {
            state.errorMessage = defaultForm()
        },
        SET_LOADING (state, value) {
            state.loading = value
        },
        SET_LOAD_MORE (state, value) {
            state.loadMore = value
        },
        SET_LOADING_FORM (state, value) {
            state.loadingForm = value 
        },
        SET_OFFSET (state, value) {
            state.offset += value
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_MESSAGE_DATA (state, value) {
            if (value) {
                state.errorMessage = value 
            } else {
                state.errorMessage = defaultForm() 
            }
        },
        SET_FORM_DATA (state, value) {
            if (value) {
                state.form = value
            } else {
                const time = new Date().getTime()
                state.form = {
                    ...defaultForm(),
                    product_id: `PR-${time}`,
                    status: 'active',
                    is_available: 1
                }
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },

        SET_CATEGORY_LOADING (state, value) {
            state.category.loading = value
        },
        SET_CATEGORY_TOTAL_RECORD (state, value) {
            state.category.totalRecord = value
        },
        SET_CATEGORY_DATA (state, value) {
            state.category.data = value
        },
    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        setFormData ({ commit, state }, data) {
            commit('SET_FORM_DATA', data)
        },
        setLoadingForm ({ commit, state }, data) {
            commit('SET_LOADING_FORM', data)
        },
        resetFormData ({ commit, state }) {
            commit('SET_FORM_DATA', null)
            commit('SET_MESSAGE_DATA', null)
        },
        resetFilter ({ commit, state }) {
            state.limit = 10
            state.offset = 0
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)
            commit('SET_LOAD_MORE', false)

            let dataPrev = []

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                status: state.filter.status,
                shop_id: data.shop_id
            }

            return axios.post('/api/product/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt.product, details: dt.details })
                    })

                    commit('SET_DATA', dataPrev)
                    commit('SET_TOTAL_RECORD', res.data.total_record)

                    if (payload.length < state.limit) {
                        commit('SET_LOAD_MORE', false)
                    } else {
                        commit('SET_LOAD_MORE', true)
                    }

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        },
        createData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/product/post', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data 
                    if (data.status === 'ok') {
                        commit('SET_MESSAGE_DATA', data.message)
                    } else {
                        commit('SET_MESSAGE_DATA', data.message)
                    }
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        updateData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/product/update', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data 
                    if (data.status === 'ok') {
                        commit('SET_MESSAGE_DATA', data.message)
                    } else {
                        commit('SET_MESSAGE_DATA', data.message)
                    }
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        deleteData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/product/delete', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        uploadCover ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
    
            let params = new FormData()
            params.append('product_id', data.product_id)
            params.append('image', data.image)
    
            return axios.post('/api/product/uploadImage', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        getDataCategory ({ commit, state }, data) {
            commit('SET_CATEGORY_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.category.limit,
                offset: state.category.offset,
                search: state.category.filter.search,
                status: state.category.filter.status,
            }

            return axios.post('/api/category/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_CATEGORY_DATA', dataPrev)
                    commit('SET_CATEGORY_TOTAL_RECORD', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_CATEGORY_LOADING', false)
                })
        },
    }
}