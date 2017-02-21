<!-- 问卷调查 -->
<template lang="html">
    <div class="qv-content" id="qv_content">
        <div class="qv-bg"  v-show="show" :style="{'backgroundImage': 'url('+backgroundImage+')'}">
            <div class="qv-title" v-if="title !== ''" v-text="title">
                莆田定制巴士线路招募
            </div>
        </div>
        <!-- <input type="text" name="name" style="position: relative; z-index: 999;" @click="saveDataPosition('', '', $event)"> -->
        <div class="qv-body" v-show="show">
            <div class="qv-body-bg"></div>
            <div class="qu-popularity">
                <span>浏览人数:{{this.hits}},</span>
                <span>参与人数:{{this.paperCount}}</span>
            </div>
            <div class="qv-list" v-for="(que, index) in questionList">
                <div class="qv-q-box qv-q-single" v-if="que.type == '2'">
                    <div class="q-title" :id="que.id">
                        {{index + 1}}.{{que.question}}<span class="q-required" v-if="que.isRequired == '1'">*</span>
                    </div>
                    <div class="option-box" v-for="(answer, i) in que.answers">
                        <div class="option" v-if="answer.type == '1'">
                            <div class="radio radio-info">
                                <input type="radio" :name="'radioSingle' + index" :value="answer.id" :id="'js_radio_single_' + index + i"
                                @change="saveDataSingle(que, answer, $event)">
                                <label :for="'js_radio_single_' + index + i" v-text="answer.value"></label>
                            </div>
                        </div>

                        <div class="option" v-else-if="answer.type == '3'">
                            <div class="radio radio-info qv-flex" v-if="answer.type == '3'">
                                <input type="radio" :name="'radioSingle' + index" :value="answer.index" :id="'js_radio_single_' + index + i"
                                @change="saveDataSingle(que, answer, $event)">
                                <label :for="'js_radio_single_' + index + i" v-text="answer.value">其他</label>
                                <input class="ipt-b-line ipt-other qv-flex-item" type="text" name="" value="">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="qv-q-box qv-q-multiple" v-else-if="que.type == '4'">
                    <div class="q-title" :id="que.id">
                        {{index + 1}}.{{que.question}}<span class="q-required" v-if="que.isRequired == '1'">*</span>
                    </div>
                    <div class="option-box" v-for="(answer, i) in que.answers">
                        <div class="option" v-if="answer.type == '1'">
                            <div class="checkbox checkbox-info">
                                <input type="checkbox" :name="'chbMultiple' + index" :value="answer.index" :id="'js_chb_multiple_' + index + i"
                                @change="saveDataMultiple(que, answer, $event)">
                                <label :for="'js_chb_multiple_' + index + i" v-text="answer.value"></label>
                            </div>
                        </div>

                        <div class="option" v-else-if="answer.type == '3'">
                            <div class="checkbox checkbox-info qv-flex">
                                <input type="checkbox" :name="'chbMultiple' + index" :value="answer.index" :id="'js_chb_multiple_' + index + i"
                                @change="saveDataMultiple(que, answer, $event)">
                                <label :for="'js_chb_multiple_' + index + i" v-text="answer.value"></label>
                                <input class="ipt-b-line ipt-other qv-flex-item" type="text" name="" value="">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="qv-q-box qv-q-text" v-else-if="que.type == '1'">
                    <div class="q-title" :id="que.id">
                        {{index + 1}}.{{que.question}}<span class="q-required" v-if="que.isRequired == '1'">*</span>
                    </div>
                    <div class="option-box" v-for="(answer, i) in que.answers">
                        <div class="option qv-flex" v-if="answer.type == '2'">
                            <span class="title" v-text="answer.value"></span>
                            <input class="ipt-b-line qv-flex-item" :required="que.isRequired == '1'" type="text" name=""
                            @change="saveDataText(que, answer, $event)">
                        </div>
                    </div>
                </div>

                <div class="qv-q-box qv-q-position" v-else-if="que.type == '5'">
                    <div class="q-title" :id="que.id">
                        {{index + 1}}.{{que.question}}<span class="q-required" v-if="que.isRequired == '1'">*</span>
                    </div>
                    <div class="option-box" v-for="(answer, i) in que.answers">
                        <div class="option  qv-flex">
                            <span><i class="glyphicon glyphicon-map-marker"></i>{{answer.value}}</span>
                            <input class="ipt-b-line  qv-flex-item" type="text" :required="que.isRequired == '1'" readonly
                            @click="saveDataPosition(que, answer, $event, i)">
                        </div>
                        <!-- <div class="option  qv-flex">
                            <span><i class="glyphicon glyphicon-map-marker"></i>下车站</span>
                            <input class="ipt-b-line  qv-flex-item" type="text" name="" value="">
                        </div> -->
                    </div>
                </div>

                <div class="qv-q-box qv-q-contact" v-else-if="que.type == '6'">
                    <div class="q-title" :id="que.id">
                        {{index + 1}}.{{que.question}}<span class="q-required" v-if="que.isRequired == '1'">*</span>
                    </div>
                    <div class="option-box" v-for="(answer, i) in que.answers">
                        <div class="option qv-flex" v-if="answer.type == '3'">
                            <span class="title" v-text="answer.value"></span>
                            <input class="ipt-b-line qv-flex-item" type="text" :required="que.isRequired == '1'"
                            @change="saveDataContact(que, answer, $event, i)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="qv-btn-panel">
                <button type="button" class="btn btn-info waves-effect waves-light" @click="saves">提交</button>
            </div>
        </div>
        <v-locationmap v-show="!show" :domTarget="domTarget" :mapValue="mapValue" @updateLocation="updateLocation" @callbackHideMap="callbackHideMap"></v-locationmap>
        <div class="loading-box" v-show="loadingShow"><v-loading :title="loadingTitle"></v-loading></div>
        <v-alert v-show="alertShow" :text="alertText" :btnText="alertBtnText" @callbackAlert="callbackAlert"></v-alert>
        <v-mask v-show="maskShow"></v-mask>
    </div>
</template>

<script>
import {rootUrl} from 'common/js/config';
import vLocationmap from 'components/locationMap/map.vue';
import vLoading from 'components/loading/loading.vue';
import vAlert from 'components/dialog/alert/alert.vue';
import vMask from 'components/mask/mask.vue';
export default {
    name: 'qv_content',
    data: function () {
        return {
            alertShow: false,
            alertText: "该问卷已经过期了",
            alertBtnText: "知道了",
            maskShow: false,
            loadingShow: false,
            loadingTitle: "",
            show: true, // 是否显示问卷
            id: '',
            title: '',
            introduction: '',
            backgroundImage: '',
            paperCount: 0,
            hits: 0,
            questionList: [],
            save: {
                questionnaireId: '',
                contactName: '',
                contactPhone: '',
                answers: []
            },
            mapValue: {    // 获取地图坐标 设置值
                lng: 116.404,    // 地理经度
                lat: 39.915,    // 地理纬度
                value: "北京"
            },
            domTarget: null,   // 哪个表单要获取地图坐标 元素文档对象
            domque: null,
            domanswer: null
        };
    },
    components: {vLocationmap, vLoading, vAlert, vMask},
    created: function () {
        document.title = '问卷调查';
        this.getQuestionData();
        this.addHit();
    },
    methods: {
        callbackAlert: function () {
            this.alertShow = false;
            this.maskShow = true;
        },
        // 获取问卷数据
        getQuestionData: function () {
            var id = this.$route.params.id;
            if (!id) {
                console.error('问卷ID不能为空');
                return;
            }
            this.id = id;
            this.save.questionnaireId = id;
            this.loadingShow = true;
            this.loadingTitle = "正在加载";
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/getQuestionnaireDetail', {'id': id}, {emulateJSON: true}).then(function (response) {
                this.loadingShow = false;
                if (response.body.resultCode === 1) {
                    // 判断问卷是否可回收
                    if (response.body.result.status === "2") {
                        this.alertShow = true;
                    }
                    this.title = response.body.result.title;
                    this.introduction = response.body.result.introduction;
                    this.backgroundImage = response.body.result.backgroundImage;
                    this.paperCount = response.body.result.paperCount;
                    this.hits = response.body.result.hits;
                    this.questionList = response.body.result.questionList;
                    this.setSaveData();
                }
                else {
                    console.error(response.body.resultMsg);
                }
            }).catch(function () {
                this.loadingShow = false;
            });
        },
        // 添加单选选项
        saveDataSingle: function (que, answer, e) {
            var o = {
                // "userAnswer": e.target.value,
                "systemAnswer": answer.value,
                "answerCode": answer.id,
                "questionType": que.type,
                "questionId": que.id,
                "questionnaireId": this.id
            };
            for (var i = 0; i < this.save.answers.length; i++) {
                if (this.save.answers[i].questionId === o.questionId) {
                    this.save.answers[i] = o;
                    return;
                }
            }
            this.save.answers.push(o);
        },
        saveDataMultiple: function (que, answer, e) {
            var o = {
                "systemAnswer": answer.value,
                "answerCode": answer.id,
                "questionType": que.type,
                "questionId": que.id,
                "questionnaireId": this.id
            };
            if (e.target.checked) {
                this.save.answers.push(o);
            }
            else {
                for (var i = 0, l = this.save.answers.length; i < l; i++) {
                    if (this.save.answers[i].answerCode === o.answerCode) {
                        this.save.answers[l - 1] = this.save.answers[i];
                        this.save.answers.pop();
                        return;
                    }
                }
            }
        },
        saveDataText: function (que, answer, e) {
            this.changeClassName(e);
            var o = {
                "userAnswer": e.target.value.trim(),
                "systemAnswer": answer.value,
                "answerCode": answer.id,
                "questionType": que.type,
                "questionId": que.id,
                "questionnaireId": this.id
            };
            for (var i = 0; i < this.save.answers.length; i++) {
                if (this.save.answers[i].answerCode === o.answerCode) {
                    this.save.answers[i] = o;
                    return;
                }
            }
            this.save.answers.push(o);
        },
        saveDataContact: function (que, answer, e, idx) {
            this.changeClassName(e);
            if (idx === 0) {
                this.save.contactName = e.target.value.trim();
            }
            if (idx === 1) {
                this.save.contactPhone = e.target.value.trim();
            }
            var o = {
                "userAnswer": e.target.value.trim(),
                "systemAnswer": answer.value,
                "answerCode": answer.id,
                "questionType": que.type,
                "questionId": que.id,
                "questionnaireId": this.id
            };
            for (var i = 0; i < this.save.answers.length; i++) {
                if (this.save.answers[i].answerCode === o.answerCode) {
                    this.save.answers[i] = o;
                    return;
                }
            }
            this.save.answers.push(o);
        },
        saveDataPosition: function (que, answer, e) {
            this.domTarget = e;
            this.show = false;
            this.domque = que;
            this.domanswer = answer;
            // this.mapValue
        },
        // 验证表单
        changeClassName: function (e) {
            if (e.target.getAttribute('required')) {
                if (e.target.value.trim() === "") {
                    if (e.target.className.indexOf('parsley-error') === -1) {
                        e.target.className = e.target.className + " parsley-error";
                    }
                }
                else {
                    e.target.className = e.target.className.replace(/\sparsley-error|parsley-error/g, "");
                }
            }
        },
        validateForm: function () {
            var bPass = true;
            for (var i = 0; i < this.questionList.length; i++) {
                if (this.questionList[i].isRequired === "1") {
                    // 单选或多选
                    if (this.questionList[i].type === "2" || this.questionList[i].type === "4") {
                        bPass = false;
                        for (var j = 0; j < this.save.answers.length; j++) {
                            if (this.save.answers[j].questionId === this.questionList[i].id) {
                                bPass = true;
                                break;
                            }
                        }
                    }
                }
                if (!bPass) {
                    return bPass;
                }
            }
            var doms = document.querySelectorAll('input[required]');
            for (var m = 0; m < doms.length; m++) {
                if (doms[m].value.trim() === "") {
                    bPass = false;
                    if (doms[m].className.indexOf('parsley-error') === -1) {
                        doms[m].className = doms[m].className + " parsley-error";
                    }
                    break;
                }
            }
            return bPass;
        },
        // 获取地图坐标
        callbackMapData: function (dom, value) {},
        updateLocation: function (val) {
            this.mapValue.value = val.value;
            this.mapValue.lng = val.lng;
            this.mapValue.lat = val.lat;
        },
        // 获取坐标后的回调函数
        callbackHideMap: function () {
            this.show = true;
            this.changeClassName(this.domTarget);
            this.domTarget.target.value = this.mapValue.value;
            var o = {
                "latitude": this.mapValue.lat,  // 经度
                "longitude": this.mapValue.lng, // 纬度
                "userAnswer": this.mapValue.value,
                "systemAnswer": this.domanswer.value,
                "answerCode": this.domanswer.id,
                "questionType": this.domque.type,
                "questionId": this.domque.id,
                "questionnaireId": this.id
            };
            for (var i = 0; i < this.save.answers.length; i++) {
                if (this.save.answers[i].answerCode === o.answerCode) {
                    this.save.answers[i] = o;
                    return;
                }
            }
            this.save.answers.push(o);
        },
        // 保存
        saves: function () {
            console.dir(this.save);
            this.loadingShow = true;
            this.loadingTitle = "提交中";
            if (this.validateForm()) {
                this.$http.post(rootUrl + 'questionnaire/api/questionnaire/pushPaperAnswer', {"paperAnswerJson": JSON.stringify(this.save)}, {emulateJSON: true}).then(function (response) {
                    this.loadingShow = false;
                    if (response.body.resultCode === 1) {
                        alert('提交成功!');
                    }
                    else {
                        alert('提交失败!');
                    }
                }).catch(function (errors) {
                    this.loadingShow = false;
                    console.log("WIFI不给力");
                });
            }
            else {
                this.loadingShow = false;
            }
        },
        addHit: function () {
            this.$http.post(rootUrl + "questionnaire/api/questionnaire/addHits", {"id": this.id}, {emulateJSON: true}).then(function (response) {});
        }
    }
}
</script>
<style lang="scss" src="./questionView.scss"></style>
<style lang="css">
</style>
