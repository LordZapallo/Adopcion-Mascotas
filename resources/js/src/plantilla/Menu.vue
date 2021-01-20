<template>
  <div id="main-wrapper">
    <Menutop></Menutop>
    <Menuleft></Menuleft>
    <div class="page-wrapper">
      <div class="container-fluid">
        <div class="row page-titles">
          <div class="col-md-5 col-8 align-self-center">
            <h3 class="text-themecolor m-b-0 m-t-0">Table</h3>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="javascript:void(0)">Home</a>
              </li>
              <li class="breadcrumb-item active">Table</li>
            </ol>
          </div>
          <div class="col-md-7 col-4 align-self-center">
            <div class="d-flex m-t-10 justify-content-end">
              <div class="d-flex m-r-20 m-l-10 hidden-md-down">
                <div class="chart-text m-r-10">
                  <h6 class="m-b-0">
                    <small>THIS MONTH</small>
                  </h6>
                  <h4 class="m-t-0 text-info">$58,356</h4>
                </div>
                <div class="spark-chart">
                  <div id="monthchart"></div>
                </div>
              </div>
              <div class="d-flex m-r-20 m-l-10 hidden-md-down">
                <div class="chart-text m-r-10">
                  <h6 class="m-b-0">
                    <small>LAST MONTH</small>
                  </h6>
                  <h4 class="m-t-0 text-primary">$48,356</h4>
                </div>
                <div class="spark-chart">
                  <div id="lastmonthchart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-view></router-view>
        <div class="right-sidebar">
          <div class="slimscrollright">
            <div class="rpanel-title">
              Service Panel
              <span>
                <i @click="cerrarchat()" class="ti-close right-side-toggle"></i>
              </span>
            </div>
            <div class="r-panel-body">
              <ul id="themecolors" class="m-t-20">
                <li>
                  <b>With Light sidebar</b>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="default" class="default-theme">1</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="green" class="green-theme">2</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="red" class="red-theme">3</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="blue" class="blue-theme working">4</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="purple" class="purple-theme">5</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="megna" class="megna-theme">6</a>
                </li>
                <li class="d-block m-t-30">
                  <b>With Dark sidebar</b>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    data-theme="default-dark"
                    class="default-dark-theme"
                  >7</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="green-dark" class="green-dark-theme">8</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="red-dark" class="red-dark-theme">9</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="blue-dark" class="blue-dark-theme">10</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="purple-dark" class="purple-dark-theme">11</a>
                </li>
                <li>
                  <a href="javascript:void(0)" data-theme="megna-dark" class="megna-dark-theme">12</a>
                </li>
              </ul>
              <ul class="m-t-20 chatonline">
                <li>
                  <b>Chat option</b>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Varun Dhavan
                      <small class="text-success">online</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/2.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Genelia Deshmukh
                      <small class="text-warning">Away</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/3.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Ritesh Deshmukh
                      <small class="text-danger">Busy</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/4.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Arijit Sinh
                      <small class="text-muted">Offline</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/5.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Govinda Star
                      <small class="text-success">online</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/6.jpg" alt="user-img" class="img-circle" />
                    <span>
                      John Abraham
                      <small class="text-success">online</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/7.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Hritik Roshan
                      <small class="text-success">online</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="assets/images/users/8.jpg" alt="user-img" class="img-circle" />
                    <span>
                      Pwandeep rajan
                      <small class="text-success">online</small>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">© 2020 Instituto Tecnológico Cordillera</footer>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Menutop from "./Menutop.vue";
import Menuleft from "./Menuleft.vue";
export default {
  components: {
    Menutop,
    Menuleft
  },
  methods: {
    abrirchat() {
      $(".right-sidebar").addClass("shw-rside");
    },
    cerrarchat() {
      $(".right-sidebar").removeClass("shw-rside");
    }
  }
};
</script>
