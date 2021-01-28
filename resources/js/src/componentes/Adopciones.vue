<template>
    <div>
        <div class="modal" :class="{'abrirmodal': modal.estado }">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {{ modal.titulo }} </h5>
                        <button type="button" class="close" @click="cerrar()"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        hola
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modal:{
                    titulo:"ejemplo",
                    estado:false
                }
            }
        },
        methods: {
            cargar(){
                let id = this.$route.params.id;
                if(id) this.modal.estado = true;
            },
            cerrar(){
                this.modal.estado = false;
            }
        },
        mounted() {
            this.cargar();
        },   
    }
</script>