<template>
    <div id="admin">
        <div :class="`sidebar ${visibleSidebar && 'show'}`">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="width width-90px" style="margin-left: -5px;">
                        <div class="title">Owner</div>
                    </div>
                    <button 
                        class="close-button btn btn-icon btn-white btn-circle"
                        @click="onCloseSidebar">
                        <i class="fa fa-lg fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="content">
                <AppListMenu 
                    :data.sync="sidebar"
                    :isSidebarSmall="true"
                    @onClick="onCloseSidebar" />
            </div>
        </div>
        <div class="main">
            <div class="header">
                <div class="header-content-fixed">
                    <div class="header-content-main">
                        <div class="header-content-main-left">
                            <button 
                                class="btn btn-white btn-icon btn-circle margin margin-right-5px"
                                @click="onOpenSidebar">
                                <i class="icn fa fa-lw fa-bars"></i>
                            </button>
                        </div>
                        <div class="header-content-main-center">
                            <router-link :to="{name: 'owner-home'}" class="width width-90px">
                                <img :src="logo" alt="" style="width: 100%;">
                            </router-link>
                        </div>
                        <div class="header-content-main-right">
                            <div class="display-flex align-center padding padding-right-10px margin margin-right-10px border-right">
                                <AppCardNotification />
                            </div>
                            <AppCardProfile :data.sync="dataUser" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <div class="main-content-smalls">
                    <router-view />
                </div>
                <div class="display-flex center padding padding-20px">
                    <div class="fonts fonts-10 grey align-center">App Version 1.0.0</div>
                </div>
            </div>
        </div>

        <AppToast />

        <AppToastMessage />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueLoadImage from 'vue-load-image'
import logo from '@/assets/img/logo.png'
import icon from '@/assets/img/icon.png'
import AppListMenu from '../../modules/AppListMenu'
import AppToast from '../../modules/AppToast'
import AppToastMessage from '../../modules/AppToastMessage'
import AppCardNotification from '../../modules/AppCardNotification'
import AppCardProfile from '../../modules/AppCardProfile'

const defaultSidebar = [
    {
        icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-store', label: 'Shops', value: 0, link: 'owner-home', permission: 'shops'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'PROFILE', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-user', label: 'Profile', value: 0, link: 'owner-profile', permission: 'users'},
            {icon: 'fa fa-lg fa-cogs', label: 'Settings', value: 0, link: 'owner-settings', permission: 'users'},
        ]
    },
]

export default {
    name: 'admin',
    data () {
        return {
            logo: logo,
            icon: icon,
            visibleSidebar: false,
            sidebar: defaultSidebar,
            countNotif: 0,
        }
    },
    beforeMount (){
        if (!this.$session.get('token')) {
            this.$router.push({ name: 'login' })
        }
        if (this.$session.get('token')) {
            this.userData()
        }
    },
    mounted () {
        this.getShopData()
    },
    components: {
        VueLoadImage,
        AppToastMessage,
        AppToast,
        AppListMenu,
        AppCardNotification,
        AppCardProfile,
    },
    methods: {
        ...mapActions({
            // new store
            getUserData: 'storeAuth/getUserData',
            getShop: 'storeSelectedShop/getData',

            // old store
            setToast: 'toast/setToast',
            setMultipleToast: 'toastmessage/setMultipleToast',
        }),
        onOpenSidebar () {
            this.visibleSidebar = true 
        },
        onCloseSidebar () {
            this.visibleSidebar = false 
        },
        onChangeMenu (data) {
            this.selectedLabel = this.menuShops[data].label
        },
        makeToast (title, subtitle) {
            const time = new Date().getTime()
            const payload = {
                visible: true,
                title: title,
                subtitle: subtitle
            }
            this.setToast(payload)
        },
        makeMultipleToast (title, subtitle) {
            const time = new Date().getTime()
            const payload = {
                id: time,
                visible: true,
                title: title,
                subtitle: subtitle
            }
            this.setMultipleToast(payload)
        },
        async userData () {
            const token = this.$session.get('tokenBearer')
            const res = await this.getUserData(token)
            if (res.data.status === 'ok') {
                const data = res.data.data 

                this.$session.set('user', data.user)
                this.$session.set('role', data.role)
                this.$session.set('shop', data.shop)
                this.$session.set('employee', data.employee)
                this.$session.set('permissions', data.permissions)
            }
        },
        getShopData () {
            const token = this.$session.get('tokenBearer')
            this.getShop({ token })
        }
    },
    computed: {
        ...mapState({
            data: (state) => state.storeAuth.data,
        }),
        dataUser () {
            return this.data && this.data.user
        }
    },
    sockets: {
        orderList: function (data) {
            const lth = data.length
            const payload = data && data[lth - 1]
            this.makeMultipleToast(payload.title, payload.subtitle)
        }
    }
}
</script>