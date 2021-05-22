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
          import(/* webpackChunkName: "about" */ "../views/ListaCaixas.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/caixa",
        name: "Caixa",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Caixa.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/caixa/:caixaId/aberto",
        name: "Caixa Aberto",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CaixaAberto.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/caixa/:caixaId/fechamento",
        name: "Fechamento",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Fechamento.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/fornecedor",
        name: "Fornecedor",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Fornecedor.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/fornecedor/criar",
        name: "Novo Fornecedor",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/FornecedorNovo.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/equipe",
        name: "Equipe",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Equipe.vue"),
        meta: {
          requiresAuth: false
        }
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      requiresAuth: false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('key') === null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
