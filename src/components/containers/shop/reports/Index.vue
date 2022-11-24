<template>
    <div id="App">
        <div class="width width-100">
            <div class="display-flex space-between align-center">
                <h1 class="fonts big black bold">Reports</h1>
                <button class="btn btn-main">
                    <i class="icn icn-left fa fa-lw fa-download"></i> Download Report
                </button>
            </div>
            <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                <div class="width width-75 width-mobile display-flex">
                    <div class="field-group width width-150px margin margin-right-15px no-margin-padding">
                        <div class="field-label">Report Type</div>
                        <el-select 
                            v-model="filter.report_type" 
                            @change="handleFilterSearch"
                            clearable
                            placeholder="Select"
                            no-data-text="No Data Disaplayed">
                            <el-option
                                v-for="(item, i) in downloadList"
                                :key="i"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="field-group width width-150px margin margin-right-15px no-margin-padding">
                        <div class="field-label">Order Status</div>
                        <el-select 
                            v-model="filter.order_status" 
                            @change="handleFilterSearch"
                            clearable
                            placeholder="Select"
                            no-data-text="No Data Disaplayed">
                            <el-option
                                v-for="(item, i) in orderStatus"
                                :key="i"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="field-group width width-150px margin margin-right-15px no-margin-padding">
                        <div class="field-label">Payment Status</div>
                        <el-select 
                            v-model="filter.payment_status" 
                            @change="handleFilterSearch"
                            clearable
                            placeholder="Select"
                            no-data-text="No Data Disaplayed">
                            <el-option
                                v-for="(item, i) in orderPaymentStatus"
                                :key="i"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="width width-25 width-mobile">
                    <div class="field-group">
                        <div class="field-label">Search</div>
                        <SearchField 
                            :placeholder="'Search by order-id ..'" 
                            :enableResponsive="true" 
                            :onChange="(data) => onSearch(data)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../../../modules/SearchField'

export default {
    name: 'App',
    computed: {
        ...mapState({
            filter: (state) => state.storeReports.filter,
            downloadList: (state) => state.storeReports.downloadList,
            orderStatus: (state) => state.storeReports.orderStatus,
            orderPaymentStatus: (state) => state.storeReports.orderPaymentStatus,
        }),
    },
    components: {
        SearchField
    },
    methods: {
        onSearch (data) {
            console.log('onSearch', data)
        },
        onRefresh () {
            console.log('onRefresh')
        },
        handleFilterSearch () {
            console.log('handleFilterSearch')
        }
    }
}
</script>