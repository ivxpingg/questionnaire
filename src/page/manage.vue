<template>
    <div id="wrapper">
        <!-- Top Bar start -->
        <div class="topbar">
            <div class="topbar-left">
                <div class="text-center">
                   <a href="#" class="logo"><i class="icon-magnet icon-c-logo"></i><span>Ub<i class="md md-album"></i>ld</span></a>
                   <!-- Image Logo here -->
                   <!--<a href="index.html" class="logo">-->
                       <!--<i class="icon-c-logo"> <img src="assets/images/logo_sm.png" height="42"/> </i>-->
                       <!--<span><img src="assets/images/logo_light.png" height="20"/></span>-->
                   <!--</a>-->
               </div>
            </div>
            <div class="navbar navbar-default" role="navigation">
                <div class="container">
                    <div class="">
                        <div class="pull-left">
                            <button class="button-menu-mobile open-left waves-effect waves-light" type="button" name="button"><i class="md md-menu"></i></button>
                            <span class="clearfix"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- Top Bar end -->

        <!-- left sidebar start -->
        <div class="left side-menu">
            <div class="sidebar-inner slimscrollleft">
                <div id="sidebar-menu">
                    <ul>
                        <li class="text-muted menu-title">目录</li>
                        <li class="has_sub">
                            <a class="waves-effect" href="javascript:void(0);">
                                <i class="ti-home"></i>
                                <span>内容管理</span>
                                <span class="menu-arrow"></span>
                            </a>
                            <ul>
                                <li class="has_sub">
                                    <a class="waves-effect subdrop" href="javascript:void(0);">
                                        <span>问卷调查</span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li>
                                            <router-link to="/questionList"><span>问卷列表</span></router-link>
                                        </li>
                                        <li>
                                            <router-link to="/questionAdd"><span>添加问卷</span></router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div><!-- left sidebar end -->

        <!-- main content start -->
        <div class="content-page">
            <div class="content">
                <router-view></router-view>
            </div>
            <footer class="footer"> 2016 © 厦门千方智通科技有限公司</footer>
        </div>
    </div>
</template>

<script>
import MyApp from 'common/js/app';
export default {
  name: 'wrapper',
  created: function () {
      document.title = '问卷调查管理';
  },
  mounted: function () {
      const JApp = new MyApp();
      JApp.init();
  }
}
</script>

<style lang="scss">
.topbar {
    display: none;
}
.side-menu {
    display: none;
}
.content-page {
    margin-left: 0;
    > .content {
        margin-top: 0;
    }
}
</style>
