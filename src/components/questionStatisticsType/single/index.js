import echarts from 'echarts';
import {rootUrl} from 'common/js/config';
export default {
    props: {
        index: {
            type: Number,
            default: 1
        },
        questionId: {
            type: String,
            default: function () {
                return "";
            }
        },
        // 题目标题
        question: {
            type: String,
            default: function () {
                return "";
            }
        },
        beginDate: {
            type: String,
            default: ""
        },
        endDate: {
            type: String,
            default: ""
        }
    },
    data: function () {
        return {
            xAxis: {data: []},
            series: {
                name: '',
                type: 'bar',
                data: []
            }
        };
    },
    created: function () {},
    mounted: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/rpt/getAnswerStatistics', {
                "questionId": this.questionId,
                "beginDate": this.beginDate,
                "endDate": this.endDate
            }).then(function (response) {
                if (response.body.resultCode === 1) {
                    this.xAxis.data = response.body.result.xAxis;
                    this.series.data = response.body.result.data;
                    this.renderChart();
                }
                else {
                    console.error(response.body.resultMsg);
                }
            }).catch(function (error) {
                console.dir(error);
                console.error('WIFI');
            });
        },
        renderChart: function () {
            this.myChart = echarts.init(document.querySelector('#js_' + this.questionId));
            this.myChart.setOption({
                title: {text: ''},
                tooltip: {},
                toolbox: {
                    show: true
                },
                xAxis: this.xAxis,
                yAxis: {},
                series: [this.series]
            });
        }
    }
}
