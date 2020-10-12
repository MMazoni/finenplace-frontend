import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/caixas',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: "/caixas",
        name: "ListaCaixas",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ListaCaixas.vue")
      },
      {
        path: "/caixa",
        name: "Caixa",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Caixa.vue")
      },
      {
        path: "/caixa/:caixaId/aberto",
        name: "Caixa Aberto",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CaixaAberto.vue")
      },
      {
        path: "/caixa/:caixaId/fechamento",
        name: "Fechamento",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Fechamento.vue")
      },
      {
        path: "/equipe",
        name: "Equipe",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Equipe.vue")
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      allowAnonymous: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
