<template>
	<div id="App">
		<el-table :data="data" border empty-text="No Data">
			<el-table-column 
				type="index" 
				label="No" 
				width="50" 
				:index="indexMethod"></el-table-column>
			<el-table-column label="Order ID" width="180">
				<template slot-scope="scope">
					<div style="font-weight: bold;">{{ scope.row.order.order_id }}</div>
					<div style="font-size: 13px;">{{ scope.row.order.created_at | moment("DD MMM YYYY") }}</div>
				</template>
			</el-table-column>
			<el-table-column label="Total Item">
				<template slot-scope="scope">
					<div>{{ scope.row.order.total_item }} products</div>
				</template>
			</el-table-column>
			<el-table-column label="Total Price">
				<template slot-scope="scope">
					<div>{{ format(scope.row.order.total_price) }}</div>
				</template>
			</el-table-column>
			<el-table-column label="Bills">
				<template slot-scope="scope">
					<div>{{ format(scope.row.order.bills_price) }}</div>
				</template>
			</el-table-column>
			<el-table-column label="Change">
				<template slot-scope="scope">
					<div>{{ format(scope.row.order.change_price) }}</div>
				</template>
			</el-table-column>
			<el-table-column label="Payment Status" width="130">
				<template slot-scope="scope">
					<AppCardCapsule :data="scope.row.order.payment_status ? 'paid' : 'unpaid'" />
				</template>
			</el-table-column>
			<el-table-column label="Order Status" width="130">
				<template slot-scope="scope">
					<AppCardCapsule :data="scope.row.order.status" />
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardCapsule from '../../../modules/AppCardCapsule'

export default {
    name: 'App',
    data () {
    	return {}
    },
    components: {
    	AppCardCapsule
    },
    computed: {
    	...mapState({
            data: (state) => state.storeReports.data,
            offset: (state) => state.storeReports.offset,
        })
    },
    methods: {
    	indexMethod(index) {
            return (index + 1) + this.offset
        },
    }
}
</script>