import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import questionView from '../../page/questionView/questionView';

Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter({
    routes: [{
        path: '/:id',
        component: questionView
    }]
});

// eslint-disable no-new
new Vue({
    router: router,
    render: h => h(questionView)
}).$mount("#app");
