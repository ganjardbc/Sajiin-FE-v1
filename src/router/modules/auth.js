import Layout from '@/components/containers/auth/Layout'
import Login from '@/components/containers/auth/Login'
import Register from '@/components/containers/auth/Register'

const routes = {
    path: '/',
    component: Layout,
    children: [
        {
            name: 'login',
            path: '/',
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
    ]
}

export default routes