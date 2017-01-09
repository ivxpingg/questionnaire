// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import manage from './page/manage';
import questionView from './page/questionView/questionView';
import questionList from './components/question/questionList';
import questionAdd from './components/question/questionAdd';
import questionStatistics from './components/questionStatistics/statistics.vue';
// import questionEdit from './components/question/questionEdit.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

// routes: [
//     { path: '/questionList', component: questionList },
//     { path: '/questionAdd', component: questionAdd }
// ]
let router = new VueRouter({
    routes: [
        { path: '/',
          component: manage,
          children: [
              {
                  path: 'questionList',
                  component: questionList
              },
              {
                  path: 'questionStatistics/:id',
                  component: questionStatistics
              },
              {
                  path: 'questionAdd',
                  component: questionAdd
              },
              {
                  path: 'questionAdd/:id',
                  component: questionAdd
              },
              {
                  path: 'questionAdd/:id/:edit',
                  component: questionAdd
              }
          ]
        },
        { path: '/questionView/:id', component: questionView }
    ]
});

/* eslint-disable no-new */
new Vue({
    data: function () {
        return {
           title: "问卷调查管理"
        };
    },
    created: function () {},
    router: router,
    render: h => h(App)
}).$mount('#app');
