// import echarts from 'echarts';
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
            map: null,
            posList: []
        };
    },
    created: function () {},
    mounted: function () {
        this.map = new BMap.Map("js_" + this.questionId);
        this.getData();
    },
    methods: {
        getData: function () {
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/rpt/getLatLonRpt',
            {
                "questionId": this.questionId,
                "beginDate": this.beginDate,
                "endDate": this.endDate
            }).then(function (response) {
                if (response.body.resultCode === 1) {
                    this.posList = response.body.result;
                    this.setMap();
                }
                else {
                    console.error(response.body.resultMsg);
                }
            }).catch(function (err) {
                console.error(err);
            });
        },
        setMap: function () {
            // 百度地图API功能
            // var point = new BMap.Point(116.404, 39.915);
            // this.map.centerAndZoom(point, 15);
            this.map.enableScrollWheelZoom(true);
            for (var i = 0; i < this.posList.length; i++) {
                if (i === 0) {
                    this.map.centerAndZoom(new BMap.Point(this.posList[i].longitude, this.posList[i].latitude), 8);
                }
                var point = new BMap.Point(this.posList[i].longitude, this.posList[i].latitude);
                this.map.addOverlay(new BMap.Marker(point));
            }
        }
    }
}
