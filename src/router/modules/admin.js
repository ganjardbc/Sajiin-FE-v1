import Layout from '@/components/containers/admin/Layout'
import Profile from '@/components/containers/user/profile/Index'
import Settings from '@/components/containers/user/settings/Index'
// import Home from '@/components/containers/admin/Index'
import Bizpars from '@/components/containers/admin/bizpars/Index'
import Payments from '@/components/containers/admin/payments/Index'
import Shipments from '@/components/containers/admin/shipments/Index'
import Categories from '@/components/containers/admin/categories/Index'
import Shops from '@/components/containers/admin/shops/Index'
import Permissions from '@/components/containers/admin/permissions/Index'
import Roles from '@/components/containers/admin/roles/Index'

const routes = {
    path: '/admin',
    component: Layout,
    children: [
        {
            name: 'admin-profile',
            path: 'profile',
            component: Profile
        },
        {
            name: 'admin-settings',
            path: 'settings',
            component: Settings
        },
        {
            name: 'admin-home',
            path: 'home',
            redirect: 'bizpars'
        },
        {
            name: 'admin-bizpars',
            path: 'bizpars',
            component: Bizpars
        },
        {
            name: 'admin-payments',
            path: 'payments',
            component: Payments
        },
        {
            name: 'admin-shipments',
            path: 'shipments',
            component: Shipments
        },
        {
            name: 'admin-categories',
            path: 'categories',
            component: Categories
        },
        {
            name: 'admin-shops',
            path: 'shops',
            component: Shops
        },
        {
            name: 'admin-permissions',
            path: 'permissions',
            component: Permissions
        },
        {
            name: 'admin-roles',
            path: 'roles',
            component: Roles
        }
    ]
}

export default routes 