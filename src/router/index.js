import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/caixas',
    name: 'Dashboard',
    requiresAuth: true,
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: "/caixas",
        name: "ListaCaixas",
        component: () => import("../views/ListaCaixas.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/caixa",
        name: "Caixa",
        component: () => import("../views/Caixa.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/caixa/:caixaId/aberto",
        name: "CaixaAberto",
        component: () => import("../views/CaixaAberto.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/caixa/:caixaId/fechamento",
        name: "Fechamento",
        component: () => import("../views/CaixaFechamento.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/tipo-despesa",
        name: "TipoDespesa",
        component: () => import("../views/TipoDespesa.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/tipo-despesa/criar",
        name: "TipoDespesaNovo",
        component: () => import("../views/TipoDespesaNovo.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/fornecedor",
        name: "Fornecedor",
        component: () => import("../views/Fornecedor.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/fornecedor/criar",
        name: "FornecedorNovo",
        component: () => import("../views/FornecedorNovo.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/nota-fiscal",
        name: "NotaFiscal",
        component: () => import("../views/NotaFiscal.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/nota-fiscal/criar",
        name: "NotaFiscalNovo",
        component: () => import("../views/NotaFiscalNovo.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/produto",
        name: "Produto",
        component: () => import("../views/Produto.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/produto/criar",
        name: "ProdutoNovo",
        component: () => import("../views/ProdutoNovo.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/marca",
        name: "Marca",
        component: () => import("../views/Marca.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/marca/criar",
        name: "MarcaNova",
        component: () => import("../views/MarcaNova.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/tipo-produto",
        name: "TipoProduto",
        component: () => import("../views/TipoProduto.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/tipo-produto/criar",
        name: "TipoProdutoNovo",
        component: () => import("../views/TipoProdutoNovo.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/funcionario",
        name: "Funcionario",
        component: () => import("../views/Funcionario.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/funcionario/criar",
        name: "FuncionarioNovo",
        component: () => import("../views/FuncionarioNovo.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/dre",
        name: "Dre",
        component: () => import("../views/Dre.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/equipe",
        name: "Equipe",
        component: () => import("../views/Equipe.vue"),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
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
    if (localStorage.getItem('key') === 'null') {
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
