<template>
    <div id="App">
        <div class="width width-100">
            <div class="display-flex space-between align-center margin margin-bottom-10px">
                <h1 class="fonts big black bold">Reports</h1>
                <div class="field-group" style="width: auto;">
                    <button class="btn btn-main" :disabled="!isButtonReportEnable">
                        <i class="icn icn-left fa fa-lw fa-download"></i> Download Report
                    </button>
                </div>
            </div>
            <div class="display-flex space-between display-mobile margin margin-bottom-15px" style="align-items: flex-end;">
                <div class="display-flex">
                    <div class="field-group width width-180px margin margin-right-15px no-margin-padding">
                        <div class="field-label">Search</div>
                        <SearchField 
                            :placeholder="'Search by order-id ..'" 
                            :enableResponsive="true" 
                            :onChange="(data) => onSearch(data)" />
                    </div>
                    <div class="field-group width width-150px margin margin-right-15px no-margin-padding">
                        <div class="field-label">Report Type</div>
                        <el-select 
                            v-model="filter.report_type" 
                            :clearable="false"
                            placeholder="Select"
                            no-data-text="No Data Disaplayed"
                            @change="handleReportType">
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
                            :clearable="false"
                            placeholder="Select"
                            no-data-text="No Data Disaplayed"
                            :disabled="!filter.order_status">
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
                            :clearable="false"
                            placeholder="Select"
                            no-data-text="No Data Disaplayed"
                            :disabled="!filter.payment_status">
                            <el-option
                                v-for="(item, i) in orderPaymentStatus"
                                :key="i"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="display-flex flex-end">
                    <div class="field-group margin margin-left-15px no-margin-padding display-flex" style="width: auto;">
                        <button class="btn btn-sekunder" :disabled="!isButtonApplyEnable" @click="handleFilterSearch">
                            Apply Filter
                        </button>
                    </div>
                    <div class="field-group margin margin-left-15px no-margin-padding display-flex" style="width: auto;">
                        <button class="btn btn-sekunder" :disabled="!isButtonApplyEnable" @click="handleFilterClear">
                            Clear Filter
                        </button>
                    </div>
                </div>
            </div>

            <div v-loading="loading" class="width widt-100">
                <Card />
            </div>

            <div class="width width-100 display-flex flex-end align-center padding padding-top-15px">
                <div class="fonts fonts-10 normal black">Total {{ totalRecord }}</div>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="totalRecord">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../../../modules/SearchField'
import Card from './Card'

export default {
    name: 'App',
    data () {
        return {
            currentPage: 1,
        }
    },
    mounted () {
        // this.getReport()
    },
    computed: {
        ...mapState({
            data: (state) => state.storeReports.data,
            filter: (state) => state.storeReports.filter,
            loading: (state) => state.storeReports.loading,
            limit: (state) => state.storeReports.limit,
            totalRecord: (state) => state.storeReports.totalRecord,
            downloadList: (state) => state.storeReports.downloadList,
            orderStatus: (state) => state.storeReports.orderStatus,
            orderPaymentStatus: (state) => state.storeReports.orderPaymentStatus,
        }),
        isButtonApplyEnable () {
            return this.filter.report_type && this.filter.payment_status && this.filter.order_status
        },
        isButtonReportEnable () {
            return this.data.length > 0
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    // watch: {
    //     shopId (prevProps, nextProps) {
    //         if (prevProps !== nextProps) {
    //             this.getReport()
    //         }
    //     }
    // },
    components: {
        SearchField,
        Card
    },
    methods: {
        ...mapActions({
            getData: 'storeReports/getData',
            resetFilter: 'storeReports/resetFilter',
            setPagination: 'storeReports/setPagination'
        }),
        getReport () {
            const token = this.$session.get('tokenBearer')
            const shop_id = this.shopId
            this.getData({ token, shop_id  })
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getReport()
        },
        handleFilterSearch () {
            this.currentPage = 1
            this.handleCurrentChange(1)
        },
        handleFilterClear () {
            this.currentPage = 1
            this.resetFilter()
        },
        onSearch (data) {
            this.filter.search = data 
            this.handleCurrentChange(1)
        },
        onRefresh () {
            console.log('onRefresh')
        },
        handleReportType () {
            this.filter.order_status = 'all'
            this.filter.payment_status = 'all'
        }
    }
}
</script>