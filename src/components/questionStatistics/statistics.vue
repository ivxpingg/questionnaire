<template lang="html">
    <div class="container">
        <!--Page Title-->
        <div class="row">
            <div class="col-sm-12">
                <ol class="breadcrumb">
                    <li><a href="javascript:void();">内容管理</a></li>
                    <li><a href="javascript:void();">问卷调查</a></li>
                    <li class="active">问卷统计</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card-box">
                    <div class="stt-search-panel">
                        <div class="statistics-msg">统计对象: 创佳科技公司</div>
                        <button class="btn-primary btn-md btn-block btn waves-effect waves-light" type="button">导出数据样本</button>
                        <div class="form-group">
                            <label class="control-label">统计周期:</label>
                            <input class="form-control" id="datepickerRange" type="text">
                        </div>
                    </div>

                    <div class="stt-main-title">回收统计:</div>

                    <div class="stt-count-panel">
                        <div class="count-box" :class="typeActive == 'hit'? 'active' : ''" @click="switchCharts('hit')">
                            <div class="name">问卷浏览量</div>
                            <div class="value">{{hitSum}}</div>
                            <p class="adding-word">问卷实时访问量</p>
                        </div>
                        <div class="count-box" :class="typeActive == 'count'? 'active' : ''" @click="switchCharts('count')">
                            <div class="name">问卷回收量</div>
                            <div class="value">{{pageSum}}</div>
                            <p class="adding-word">问卷实时回收量</p>
                        </div>
                    </div>
                    <div class="stt-count-chart" id="js_echarts_hit">

                    </div>

                    <div class="stt-main-title">答卷统计:</div>
                    <div class="stt-answers-statistics-panel" v-for="(que, index) in questionInfo">

                        <!-- <div class="answer-box answer-box-text" v-if="que.type === '1'">
                            <div class="answer-title">{{que.question}}</div>
                            <div class="answer-charts"></div>
                        </div> -->

                        <v-text v-if="que.type === '1'" :questionId="que.id" :question="que.question" :index="(index + 1)" :beginDate="beginDate" :endDate="endDate"></v-text>
                        <v-single v-if="que.type === '2'" :questionId="que.id" :question="que.question" :index="(index + 1)" :beginDate="beginDate" :endDate="endDate"></v-single>
                        <v-multiple v-if="que.type === '4'" :questionId="que.id" :question="que.question" :index="(index + 1)" :beginDate="beginDate" :endDate="endDate"></v-multiple>
                        <v-position v-if="que.type === '5'" :questionId="que.id" :question="que.question" :index="(index + 1)" :beginDate="beginDate" :endDate="endDate"></v-position>
                        <v-contact v-if="que.type === '6'" :questionId="que.id" :question="que.question" :index="(index + 1)" :beginDate="beginDate" :endDate="endDate"></v-contact>

                    </div>

                    <div class="stt-main-title">地图分析:</div>
                    <div class="stt-map">

                    </div>

                    <div class=""></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vm from './statistics.js';
export default vm;
</script>

<style lang="scss" src="./statistics.scss">
</style>
