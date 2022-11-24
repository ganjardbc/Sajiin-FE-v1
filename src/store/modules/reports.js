import axios from 'axios'

const defaultOrderStatus = () => {
    return [
        {value: 'all', label: 'All'},
        {value: 'new-order', label: 'New Order'},
        {value: 'on-progress', label: 'On Progress'},
        {value: 'done', label: 'Done'},
        {value: 'canceled', label: 'Canceled'},
    ]
}

const defaultOrderType = () => {
    return [
        {value: 'dine-in', label: 'Dine In'},
        {value: 'dine-out', label: 'Dine Out'}
    ]
}

const defaultOrderPaymentStatus = () => {
    return [
        {value: 'all', label: 'All'},
        {value: '1', label: 'Paid'},
        {value: '0', label: 'Unpaid'},
    ]
}

const downloadList = () => {
    return [
        {value: 'all', label: 'All'},
        {value: 'daily', label: 'Daily'},
        {value: 'weekly', label: 'Weekly'},
        {value: 'monthly', label: 'Monthly'},
        {value: 'yearly', label: 'Yearly'},
    ]
}

export default {
    namespaced: true,

    state: {
        orderStatus: defaultOrderStatus(),
        orderType: defaultOrderType(),
        orderPaymentStatus: defaultOrderPaymentStatus(),
        downloadList: downloadList(),
        limit: 10,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            status: '',
            report_type: 'all',
            order_status: 'all',
            payment_status: 'all',
        }
    },

    getters: {},

    mutations: {
        SET_LOADING (state, value) {
            state.loading = value
        },
        SET_LOAD_MORE (state, value) {
            state.loadMore = value
        },
        SET_OFFSET (state, value) {
            state.offset += value
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },
        SET_ORDER_BILLS (state, data) {
            const bills_price = data ? parseInt(data) : 0
            const total_price = parseInt(state.form.total_price)
            const total = bills_price - total_price
            const payload = {
                ...state.form,
                bills_price: bills_price,
                change_price: total,
                payment_status: total >= 0 ? 1 : 0
            }
            state.form = payload 
        }
    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        setOrderBills ({ commit, state }, data) {
            commit('SET_ORDER_BILLS', data)
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
                payment_status: state.filter.payment_status,
                shop_id: data.shop_id
            }

            return axios.post('/api/order/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
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
    }
}