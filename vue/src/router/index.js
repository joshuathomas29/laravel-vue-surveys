import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Surveys from "../views/Surveys.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path: "/surveys",
                name: "Surveys",
                component: Surveys,
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // if the route requires auth and there is no token for the user,
    // redirect to Login, if user is loggin in and tries to route to login/register,
    // redirect to Dashboard, otherwise continue
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (
        store.state.user.token &&
        (to.name === "Login" || to.name === "Register")
    ) {
        next({ name: "Dashboard" });
    } else {
        next();
    }
});

export default router;
