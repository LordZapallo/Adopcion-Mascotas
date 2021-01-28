<template>
    <div>
        <div class="row page-titles" style="padding-top: 85px;">
            <div class="col-md-5 col-8 align-self-center">
                <h3 class="text-themecolor m-b-0 m-t-0">Bienvenidos</h3>
                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="javascript:void(0)">Home</a>
                </li>
                <li class="breadcrumb-item active">Inicio</li>
                </ol>
            </div>
        </div>
        <vue-carousel :data="data" direction="down" :controls="false" :interval="3000"></vue-carousel>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        '<div class="example-slide"><img style="width:100%" src="http://www.upsocl.com/wp-content/uploads/2015/11/web-adopcion-mascotas1.jpg"></div>',
        '<div class="example-slide"><img style="width:100%" src="https://www.mascotahogar.com/Imagenes/wallpaper-de-un-perro-pequeno.jpg"></div>',
        '<div class="example-slide"><img style="width:100%" src="http://es.naturewallpaperfree.com/mobile/animales-perros/wallpaper-naturaleza-1600x900-3803-6b8edea5.jpg"></div>',
      ],
    };
  },
};
</script>

<style>
    .example-slide {
        align-items: center;
        background-color: #666;
        color: #999;
        display: flex;
        font-size: 1.5rem;
        justify-content: center;
        min-height: 10rem;
        height: 70vh;
    }
</style>
