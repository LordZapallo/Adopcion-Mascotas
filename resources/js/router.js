import Vue from 'vue';
import Router from 'vue-router';
import axios from "axios";
Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: "/",
    routes: [{
            path: '',
            component: () =>
                import ('./src/plantilla/Menu.vue'),
            children: [{
                    path: '/',
                    name: 'inicio',
                    component: () =>
                        import ('./src/componentes/Inicio.vue')
                },
                {
                    path: '/mascotas',
                    name: 'mascotas',
                    component: () =>
                        import ('./src/componentes/Mascotas.vue')
                },
                {
                    path: '/adopciones',
                    name: 'adopciones',
                    component: () =>
                        import ('./src/componentes/Adopciones.vue')
                },
                {
                    path: '/adopciones/:id',
                    name: 'adopciones_id',
                    component: () =>
                        import ('./src/componentes/Adopciones.vue')
                },
                {
                    path: '/gestionadopciones',
                    name: 'gestionadopciones',
                    component: () =>
                        import ('./src/componentes/GestionAdopciones.vue')
                },
            ]
        },
        {
            path: "*",
            component: () =>
                import ('./src/componentes/404.vue')
        }
    ],
});
export default router;