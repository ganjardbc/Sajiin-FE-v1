<template>
    <div id="App">
        <div class="card no-padding bg-white border-full"  style="cursor: pointer;" @click="onOpen">
            <div class="display-flex space-between align-center" style="padding: 10px 15px;">
                <div v-if="selectedData" class="display-flex align-center" style="width: calc(100% - 40px);">
                    <div style="width: 45px; margin-right: 15px">
                        <div class="image image-padding border-full">
                            <img v-if="selectedData.image" :src="selectedData ? (tableImageThumbnailUrl + selectedData.image) : ''" alt="" class="post-center">
                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 60px);">
                        <div style="width: 100%;">
                            <div class="fonts fonts-10 semibold black">
                                {{ selectedData && selectedData.name }} ({{ selectedData && selectedData.code }})
                            </div>
                            <div class="fonts fonts-10 grey">
                                {{ selectedData && selectedData.description }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="fonts fonts-10 normal grey">
                    Choose Table 
                </div>
                <button class="btn btn-white btn-small-icon" @click="onOpen">
                    <i class="fa fa-lw fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <AppCardPopup 
            v-if="visiblePopup" 
            title="Choose Table" 
            @onClose="onClose">
            <div class="width width-100">
                <div class="width width-100 display-flex space-between">
                    <div style="width: calc(100% - 50px);">
                        <SearchField 
                            :placeholder="'Search tables ..'" 
                            :enableResponsive="true" 
                            :onChange="(data) => onSearch(data)" />
                    </div>
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onRefresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                </div>
                <div v-loading="loading" class="width width-100">
                    <AppEmpty v-if="data.length === 0" />
                    <div v-for="(dt, i) in data" :key="i" class="margin margin-top-15px margin-bottom-15px">
                        <div class="card no-padding border-full">
                            <div class="padding padding-15px display-flex space-between align-center">
                                <div class="width width-60px">
                                    <div class="image image-45px">
                                        <img v-if="dt.image" :src="tableImageThumbnailUrl + dt.image" alt="" class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div style="width: calc(100% - 100px);">
                                    <div class="fonts fonts-10 semibold">{{ dt.name }} ({{ dt.code }})</div>
                                    <div class="fonts fonts-9 grey">{{ dt.description }}</div>
                                </div>
                                <div class="width width-40px">
                                    <button 
                                        :class="`btn btn-icon ${selectedID === dt.id ? 'btn-main' : 'btn-sekunder'}`" 
                                        @click="onChange(dt)">
                                        <i class="fa fa-lw fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="width width-100 display-flex flex-end align-center">
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
        </AppCardPopup>

        <!-- <div v-if="visiblePopup" class="display-popup">
            <div class="card-container-popup">
                <div class="card-popup no-padding mobile bg-white box-shadow">
                    <div class="card-popoup-header display-flex align-center space-between">
                        <div class="fonts normal semibold">Choose Table</div>
                        <button class="btn btn-icon btn-white" @click="onClose">
                            <i class="fa fa-lw fa-times" />
                        </button>
                    </div>
                    <div class="card-popup-body">
                        
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../../../../modules/SearchField'
import AppEmpty from '../../../../modules/AppEmpty'
import AppCardPopup from '../../../../modules/AppCardPopup'

export default {
    name: 'App',
    data () {
        return {
            visiblePopup: false,
            currentPage: 1
        }
    },
    mounted () {
        this.getDataTable()
    },
    components: {
        SearchField,
        AppEmpty,
        AppCardPopup
    },
    computed: {
        ...mapState({
            data: (state) => state.storeCashierTable.data,
            totalRecord: (state) => state.storeCashierTable.totalRecord,
            limit: (state) => state.storeCashierTable.limit,
            filter: (state) => state.storeCashierTable.filter,
            loading: (state) => state.storeCashierTable.loading,
            form: (state) => state.storeOrders.form,
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        selectedID () {
            return this.form.table_id
        },
        selectedData () {
            return this.form.table
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getDataTable()
            }
        }
    },
    methods: {
        ...mapActions({
            getData: 'storeCashierTable/getData',
            resetFilter: 'storeCashierTable/resetFilter',
            setPagination: 'storeCashierTable/setPagination',
        }),
        onClose () {
            this.visiblePopup = false 
        },
        onOpen () {
            this.visiblePopup = true 
        },
        onChange (data) {
            this.form.table_id = data.id 
            this.form.table_name = data.name 
            this.form.table = data 
            this.visiblePopup = false 
        },
        onRefresh () {
            this.getDataTable()
        },
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getDataTable()
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getDataTable()
        },

        // LIST DATA
        getDataTable () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            this.getData({ token, shop_id })
        },
    }
}
</script>