import FormLatih from "@/components/form-data/FormLatih.vue";
import FormProduct from "@/components/form-data/FormProduct.vue";
import FormSales from "@/components/form-data/FormSales.vue";
import FormTrain from "@/components/form-data/FormTrain.vue";
import DataLatih from "@/components/product/DataLatih.vue";
import DataPenjualan from "@/components/product/DataPenjualan.vue";
import DataPredict from "@/components/product/DataPredict.vue";
import DataProduct from "@/components/product/DataProduct.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import Layout from "@/pages/Layout.vue";

import { createRouter, createWebHistory} from "vue-router";

const routes = [
   
    {
        path: '/',
        component: Layout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                component: DataProduct
            },
            {
                path: 'sales',
                component: DataPenjualan
            },
            {
                path: 'train',
                component: DataLatih
            },

            {
                path: 'result',
                component: DataPredict
            },

            {
                path: 'form',
                component: FormLatih
            },
            {
                path: 'form-product',
                component: FormProduct
            },
            {
                path: 'form-sales',
                component: FormSales
            },
            {
                path: 'form-train',
                component: FormTrain
            }
        ]
    },
    
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')
    // const isAuthenticated = !!token
    if(to.meta.requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})

export default router