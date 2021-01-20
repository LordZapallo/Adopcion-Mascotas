<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row justify-content-md-center">
                        <div class="col-lg-4 mb-4 justify-content-end">
                            <div class="input-group mb-3">
                                <input type="date" class="form-control" placeholder="Buscar.." aria-describedby="basic-addon2" v-model="fechainicio" @change="listar()"/>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">
                                        Fecha de inicio
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4 justify-content-end">
                            <div class="input-group mb-3">
                                <input type="date" class="form-control" placeholder="Buscar.." aria-describedby="basic-addon2" v-model="fechafin" @change="listar()"/>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">
                                        Fecha de finalización
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <vc-donut background="white" foreground="grey" :size="200" unit="px" :thickness="30" has-legend legend-placement="top" :sections="lista" :total="total" :start-angle="0"> 
                            <h1>{{total}} Resultados</h1>
                        </vc-donut>
                        <!--<GChart
                            :settings="{packages: ['bar']}"    
                            :data="chartData"
                            :options="chartOptions"
                            :createChart="(el, google) => new google.charts.Bar(el)"
                            @ready="onChartReady"
                        />-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var moment = require('moment');
    moment.locale("es");
    import { GChart } from 'vue-google-charts'
    export default {
        components: {
            GChart
        },
        data() {
            return {
                lista:[],
                total:1,
                fechainicio:moment().format('YYYY-MM-DD'),
                fechafin:moment().format('YYYY-MM-DD'),
                chartsLib: null, 
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['Color', 'Por Año', 'Por Mes', 'Por Día'],
                    ['Rojo', 1000, 400, 200],
                    ['Naranja', 1170, 460, 250],
                    ['Amarillo', 660, 1120, 300],
                    ['Verde', 1030, 540, 350],
                    ['Azul', 1030, 540, 350]
                ]
            };
        },
        computed: {
            chartOptions () {
                if (!this.chartsLib) return null
                return this.chartsLib.charts.Bar.convertOptions({
                    chart: {
                    title: 'Consultas Dividido por color',
                    subtitle: 'Todos los resultados de búsqueda'
                    },
                    bars: 'horizontal', // Required for Material Bar Charts.
                    hAxis: { format: 'decimal' },
                    height: 400,
                    colors: ['#1b9e77', '#d95f02', '#7570b3']
                })
            }
        },
        methods: {
            listar(){
                axios.get("/vista/listar?inicio="+this.fechainicio+"&fin="+this.fechafin).then( res => {
                    this.lista = [];
                    this.total = 999999999999;
                    this.lista.push({ label: res.data.rojo + ' De Color Rojo', value: res.data.rojo, color: 'red' });
                    this.lista.push({ label: res.data.naranja + ' De Color Naranja', value: res.data.naranja, color: 'orange' });
                    this.lista.push({ label: res.data.amarillo + ' De Color Amarillo', value: res.data.amarillo, color: 'yellow' });
                    this.lista.push({ label: res.data.verde + ' De Color Verde', value: res.data.verde, color: 'green' });
                    this.lista.push({ label: res.data.azul + ' De Color Azul', value: res.data.azul, color: 'blue' });
                    this.total = res.data.total;
                }).catch( err => {
                    console.log(err);
                });
            },
            onChartReady (chart, google) {
                this.chartsLib = google
            }
        },
        mounted(){
            this.listar();
        }
    };
</script>
<style>
    .cdc{
        width: 35em!important;
        padding-bottom: 35em!important;
    } 
</style>