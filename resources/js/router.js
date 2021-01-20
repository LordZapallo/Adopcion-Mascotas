import Vue from 'vue';
import Router from 'vue-router';
import axios from "axios";
Vue.use(Router);
const router =new Router({
    mode: 'history',
    base: "/",
    routes: [
        {
            path: '',
            component: () => import('./src/plantilla/Menu.vue'),
            children: [
                {
                    path: '/',
                    name: 'inicio',
                    component: () => import('./src/componentes/Usuarios.vue')
                },
                {
                    path: '/accesos',
                    name: 'accesos',
                    component: () => import('./src/componentes/Accesos.vue')
                },
                {
                    path: '/auditorias',
                    name: 'auditorias',
                    component: () => import('./src/componentes/Auditoria.vue')
                },
                {
                    path: '/pacientes',
                    name: 'pacientes',
                    component: () => import('./src/componentes/Pacientes.vue')
                },
                {
                    path: '/turnos',
                    name: 'turnos',
                    component: () => import('./src/componentes/Turno.vue')
                },
                {
                    path: '/atencion',
                    name: 'atencion',
                    component: () => import('./src/componentes/Atencion.vue')
                },
                {
                    path: '/triaje',
                    name: 'triaje',
                    component: () => import('./src/componentes/Triaje.vue')
                },
                {
                    path: '/resultados',
                    name: 'resultados',
                    component: () => import('./src/componentes/Resultados.vue')
                },
                {
                    path: '/recetas',
                    name: 'recetas',
                    component: () => import('./src/componentes/Receta.vue')
                },
                {
                    path: '/actualizar',
                    name: 'actualizar',
                    component: () => import('./src/componentes/Actualizar.vue')
                },
                {
                    path: '/vista',
                    name: 'vista',
                    component: () => import('./src/componentes/Vista.vue')
                },
            ]
        }, 
        {
            path: "*",
            component: () => import('./src/componentes/404.vue')
        }
    ],
});
export default router;
