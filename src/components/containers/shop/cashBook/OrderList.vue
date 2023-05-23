<template>
    <div id="OrderList">
        <AppSideForm 
            :title="'Order Lists'" 
            :enableSaveButton="false"
            :enableCustomFooter="true"
            :onClose="onClose">
            <div class="width width-100">
                <div class="margin margin-bottom-15px margin-top-5px">
                    <OrderStatus :data="form" />
                </div>
                <div 
                    v-for="(dt, i) in data" :key="i" 
                    class="card bg-white box-shadow margin margin-bottom-15px">
                    <div class="display-flex space-between align-center margin margin-bottom-8px">
                        <div class="fonts fonts-10 semibold black">{{ dt.order.order_id }}</div>
                        <AppCardCapsule :data="dt.order.status" />
                    </div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-10 normal black">Date</div>
                        <div class="fonts fonts-10 semibold black align-right">{{ dt.order.created_at | moment("DD MMM YYYY") }}</div>
                    </div>
                    <div v-if="dt.order.customer_name" class="display-flex space-between align-center">
                        <div class="fonts fonts-10 normal black">Customer</div>
                        <div class="fonts fonts-10 semibold black align-right">{{ dt.order.customer_name }}</div>
                    </div>
                    <div v-if="dt.order.table_name" class="display-flex space-between align-center">
                        <div class="fonts fonts-10 normal black">Table</div>
                        <div class="fonts fonts-10 semibold black align-right">{{ dt.order.table_name }}</div>
                    </div>
                    <el-table :data="dt.details" border empty-text="No Data" class="margin margin-top-15px margin-bottom-15px">
                        <el-table-column label="Item" min-width="160">
                            <template slot-scope="scope">
                                <div class="fonts fonts-9 normal black">{{ scope.row.product_name }}</div>
                                <div class="display-flex space-between">
                                    <div class="fonts fonts-9 normal black"> {{ scope.row.quantity }} x {{ scope.row.product_detail }}</div>
                                    <div class="fonts fonts-9 semibold black">{{ format(scope.row.price) }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Total" align="right">
                            <template slot-scope="scope">
                                <div class="fonts fonts-9 semibold black">{{ format(scope.row.subtotal) }}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="display-flex space-between">
                        <div class="fonts fonts-10 normal black">Subtotal</div>
                        <div class="display-flex column">
                            <div class="fonts fonts-10 semibold black align-right">{{ format(dt.order.total_price) }}</div>
                            <div class="fonts fonts-9 normal black align-right">{{ dt.order.total_item }} items</div>
                        </div>
                    </div>
                </div>
                
                <div class="card bg-white box-shadow margin margin-bottom-15px">
                    <div class="padding padding-bottom-8px">
                        <div class="fonts fonts-10 semibold black">Grand Total</div>
                    </div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-10 semibold black">{{ grandItem }} items</div>
                        <div class="fonts fonts-10 semibold main-color align-right">{{ format(grandTotal) }}</div>
                    </div>
                </div>

                <div class="card bg-white box-shadow margin margin-bottom-15px">
                    <div class="padding padding-bottom-8px">
                        <div class="fonts fonts-10 semibold black">Cash Detail</div>
                    </div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-10 semibold black">Summary</div>
                        <div class="fonts fonts-10 semibold black align-right">{{ format(form.cash_summary) }}</div>
                    </div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-9 normal black">Cash Modal</div>
                        <div class="fonts fonts-9 normal black align-right">{{ format(form.cash_modal) }}</div>
                    </div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-9 normal black">Cash In</div>
                        <div class="fonts fonts-9 normal black align-right">{{ format(form.cash_in) }}</div>
                    </div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-9 normal black">Cash Out</div>
                        <div class="fonts fonts-9 normal black align-right">{{ format(form.cash_out) }}</div>
                    </div>
                    <div class="width width-100 border-bottom margin margin-bottom-15px padding padding-top-15px"></div>
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-10 semibold black">Profit</div>
                        <div class="fonts fonts-10 semibold main-color align-right">{{ format(form.cash_profit) }}</div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <div class="fonts fonts-10 normal red margin margin-bottom-10px">
                    You can download this reports after close this cash book.
                </div>
                <button 
                    :disabled="form.cash_status === 'open'"
                    class="btn btn-main btn-full" 
                    @click="onDownload(form)">
                    Download Reports 
                </button>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppCardCollapse from '../../../modules/AppCardCollapse'
import Card from '../reports/Card'
import OrderStatus from './OrderStatus'

export default {
    name: 'OrderList',
    data () {
        return {}
    },
    mounted () {},
    computed: {
        ...mapState({
            form: (state) => state.storeCashBook.form,
            errorMessage: (state) => state.storeCashBook.errorMessage,
            data: (state) => state.storeReports.data,
            grandItem: (state) => state.storeReports.grandItem,
            grandTotal: (state) => state.storeReports.grandTotal,
        }),
    },
    components: {
        AppSideForm,
        AppCardCapsule,
        AppCardCollapse,
        Card,
        OrderStatus,
    },
    methods: {
        onDownload (data) {
            this.$emit('onDownload', data)
        },
        onClose () {
            this.$emit('onClose')
        },
    },
}
</script>