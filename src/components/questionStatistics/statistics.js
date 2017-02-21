import echarts from 'echarts';
import {rootUrl} from 'common/js/config';
import vSingle from 'components/questionStatisticsType/single/single.vue';
import vMultiple from 'components/questionStatisticsType/multiple/multiple.vue';
import vText from 'components/questionStatisticsType/text/text.vue';
import vContact from 'components/questionStatisticsType/contact/contact.vue';
import vPosition from 'components/questionStatisticsType/position/position.vue';
export default {
    data: function () {
        return {
            id: '', // 问卷ID
            beginDate: moment().startOf('month').format('YYYY-MM-DD'), // 开始时间
            endDate: moment().endOf('month').format('YYYY-MM-DD'), // 结束时间
            myHitChart: null,
            typeActive: 'hit',
            hitSum: 0,
            hitData: {
                xAxis: {
                    data: []
                },
                series: {
                    name: '访问量',
                    type: 'line',
                    data: []
                }
            },
            questionInfo: null,
            pageSum: 0,
            pageCount: {
                xAxis: {
                    data: []
                },
                series: {
                    name: '回收量',
                    type: 'line',
                    data: []
                }
            }
        };
    },
    components: {vSingle, vMultiple, vText, vContact, vPosition},
    created: function () {
        this.id = this.$route.params.id || '';
    },
    mounted: function () {
        this.initDatepicker();
        this.getHitData();
        this.getQuestionInfo();
    },
    methods: {
        // 初始化日期控件
        initDatepicker: function () {
            var _this = this;
            $('#datepickerRange').daterangepicker({
                timePicker: false,
                locale: {format: 'YYYY-MM-DD'},
                timePicker24Hour: false,
                startDate: this.beginDate,
                endDate: this.endDate
            }, function (sDate, eDate) {
                _this.beginDate = sDate.format('YYYY-MM-DD');
                _this.endDate = eDate.format('YYYY-MM-DD');
            });
        },
        setCountEchart: function () {
            this.myHitChart = echarts.init(document.querySelector('#js_echarts_hit'));
            this.myHitChart.setOption({
                title: {text: '访问量'},
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: this.hitData.xAxis,
                yAxis: [{
                    type: "value"
                }],
                series: [this.hitData.series]
            });
        },
        switchCharts: function (type) {
            this.typeActive = type;
            if (type === 'hit') {
                this.myHitChart.setOption({
                    title: {text: '访问量'},
                    xAxis: this.hitData.xAxis,
                    series: [this.hitData.series]
                });
            }
            else {
                this.myHitChart.setOption({
                    title: {text: '回收量'},
                    xAxis: this.pageCount.xAxis,
                    series: [this.pageCount.series]
                });
            }
        },
        // 获取点击数
        getHitData: function () {
            var _this = this;
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/rpt/getHitsList', {
                "questionnaireId": this.id,
                "beginDate": this.beginDate,
                "endDate": this.endDate
            }, {
                emulateJSON: true
            }).then(function (response) {
                if (response.body.resultCode === 1) {
                    this.hitData.xAxis.data = response.body.result.xAxis;
                    this.hitData.series.data = response.body.result.data;
                    this.hitSum = 0;
                    response.body.result.data.forEach(function (value) {
                        _this.hitSum += +value;
                    });
                    this.setCountEchart();
                    this.getPagerData();
                }
                else {
                    alert(response.body.resultMsg);
                }
            }).catch(function (error) {
                alert(error.statusText);
            });
        },
        // 获取回收量
        getPagerData: function () {
            var _this = this;
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/rpt/getPaperCountRpt', {
                "questionnaireId": this.id,
                "beginDate": this.beginDate,
                "endDate": this.endDate
            }, {
                emulateJSON: true
            }).then(function (response) {
                if (response.body.resultCode === 1) {
                    this.pageCount.xAxis.data = response.body.result.xAxis;
                    this.pageCount.series.data = response.body.result.data;
                    this.pageSum = 0;
                    response.body.result.data.forEach(function (value) {
                        _this.pageSum += +value;
                    });
                }
                else {
                    alert(response.body.resultMsg);
                }
            }).catch(function (error) {
                alert(error.statusText);
            });
        },
        // 获取问卷要统计的信息
        getQuestionInfo: function () {
            // this.questionInfo = [{id: '12', type: "5", question: "地图"}];
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/rpt/getQuestionList', {
                "questionnaireId": this.id
            }, {
                emulateJSON: true
            }).then(function (response) {
                if (response.body.resultCode === 1) {
                    this.questionInfo = response.body.result;
                }
                else {
                    alert(response.body.resultMsg);
                }
            }).catch(function (error) {
                alert(error.statusText);
            });
        },
        // 获取每道题的统计信息
        getList: function () {
            for (var i = 0; i < this.questionInfo.length; i++) {}
        }
    }
}
