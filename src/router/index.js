import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
