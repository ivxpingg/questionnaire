import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import manage from '../../page/manage';
import questionList from '../../components/question/questionList';
import questionAdd from '../../components/question/questionAdd';
import questionStatistics from '../../components/questionStatistics/statistics.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter({
    routes: [{
        path: '/questionList',
        component: questionList
    }, {
        path: '/questionStatistics/:id',
        component: questionStatistics
    }, {
        path: '/questionAdd',
        component: questionAdd
    }, {
        path: '/questionAdd/:id/:edit',
        component: questionAdd
    }]
});

// eslint-disable no-new
new Vue({
    router: router,
    render: h => h(manage)
}).$mount("#app");
