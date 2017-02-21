<template>
    <div class="container container-questionAdd">
        <!--Page Title-->
        <ol class="breadcrumb">
            <li><a href="#">内容管理</a></li>
            <li><a href="#">问卷调查</a></li>
            <li class="active">添加问卷</li>
        </ol>
        <!-- 顶部按钮 -->
        <div class="fixed-top-panel">
             <!-- <button class="btn btn-default waves-effect waves-light"> <i class="fa fa-heart m-r-5"></i> <span>预览</span> </button> -->
             <button class="btn btn-primary waves-effect waves-light" @click="saveQuestion">保存</button>
        </div>
        <div class="card-box container-left pull-left" id="container_left">
            <h4>题目控件</h4>
            <ul class="menu question-type-list">
                <li><a @click.stop="addQuestion('2')">单选题</a></li>
                <li><a @click="addQuestion('4')">多选题</a></li>
                <!-- <li><a @click="addQuestion(6)">下拉题</a></li> -->
                <li><a @click="addQuestion('1')">填空题</a></li>
                <li><a @click="addQuestion('5')">位置拾取题</a></li>
                <li><a @click="addQuestion('6')">联系人</a></li>
            </ul>
        </div>
        <div class="container-right pull-left">
            <div class="qpage">
                <ul class="nav nav-tabs">
                    <li :class="this.paneName === 'qst'?'active':''" @click="switchPane('qst')"><a :class="this.paneName === 'qst'?'active':''"><span class="hidden-xs">问卷设置</span></a></li>
                    <li :class="this.paneName === 'cst'?'active':''" @click="switchPane('cst')"><a :class="this.paneName === 'cst'?'active':''"><span class="hidden-xs">题目设置</span></a></li>
                    <li :class="this.paneName === 'theme'?'active':''" @click="switchPane('theme')"><a :class="this.paneName === 'theme'?'active':''"><span class="hidden-xs">皮肤选择</span></a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane" :class="this.paneName === 'qst'?'active':''" role="qst">
                        <div class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">问卷名称</label>
                                    <div class="col-md-10">
                                        <input type="text" v-model="name" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">回收时间</label>
                                    <div class="col-md-10">
                                        <!-- <div class="input-group input-daterange" id="datepickerRange">
                                            <input type="text" class="form-control" id="stimes" :value="startDate" @pickerTime="iptChangeTime($event, 'startDate')">
                                            <span class="input-group-addon">至</span>
                                            <input type="text" class="form-control" :value="endDate" @pickerTime="iptChangeTime($event, 'endDate')">
                                        </div> -->
                                        <input class="form-control" id="datepickerRange" type="text" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">统计对象</label>
                                    <div class="col-md-10">
                                        <input class="form-control input-daterange-datepicker" v-model="statisticalObj" type="text">
                                    </div>
                               </div>

                               <div class="form-group">
                                   <label class="col-md-2 control-label">发布模块</label>
                                   <div class="col-md-10 form-inline">
                                       <div class="checkbox checkbox-primary" v-for="mod in moduleList">
                                           <input :id="'chkmod' + mod.id" name="moduleType" type="checkbox" :data-name="mod.name" :value="mod.id" :checked="isCheckedModule(mod.id)" @change="choiceReleaseModule(mod.id, mod.name,$event)">
                                           <label :for="'chkmod' + mod.id" v-text="mod.name"></label>
                                       </div>
                                   </div>
                              </div>
                        </div>
                    </div>
                    <div class="tab-pane" :class="this.paneName === 'cst'?'active':''" role="cst">
                        <div class="form-horizontal">
                            <div class="form-group">
                               <div class="">
                                   <input class="form-control" type="text" v-model="title" placeholder="请输入问卷标题(选填)">
                               </div>
                           </div>
                        </div>
                        <div class="form-horizontal">
                            <div class="form-group">
                               <div class="">
                                   <input class="form-control" type="text" v-model="introduction" placeholder="请输入引言(选填)">
                               </div>
                           </div>
                        </div>

                        <ul class="question-list-box" v-for="(que, index) in questionList">
                            <v-single v-if="que.type == 2" @callbackQuestionData="callbackQuestionData" @delQuestionData="delQuestionData" :questions="que" :num="index"></v-single>
                            <v-multiple v-else-if="que.type == 4" @callbackQuestionData="callbackQuestionData" @delQuestionData="delQuestionData" :questions="que" :num="index"></v-multiple>
                            <v-text v-else-if="que.type == 1" @callbackQuestionData="callbackQuestionData" @delQuestionData="delQuestionData" :questions="que" :num="index"></v-text>
                            <v-position v-else-if="que.type == 5" @callbackQuestionData="callbackQuestionData" @delQuestionData="delQuestionData" :questions="que" :num="index"></v-position>
                            <v-contact v-else-if="que.type == 6" @callbackQuestionData="callbackQuestionData" @delQuestionData="delQuestionData" :questions="que" :num="index"></v-contact>
                        </ul>
                    </div>
                    <div class="tab-pane" :class="this.paneName === 'theme'?'active':''" role="theme">
                        <div class="form-group">
                            <div class="radio radio-inline">
                                <input type="radio" id="ipt_default_bg" v-model="isDefaultImage" value="1" name="radioInline">
                                <label for="ipt_default_bg">使用默认背景图片</label>
                            </div>
                            <div class="radio radio-inline">
                                <input type="radio" id="ipt_custom_bg" v-model="isDefaultImage" value="0" name="radioInline">
                                <label for="ipt_custom_bg">自定义图片</label>
                            </div>
                        </div>

                        <div class="form-group backgroundImage-box" v-if="isDefaultImage=='1'">
                            <div class="radio radio-inline">
                                <input type="radio" id="ipt_img_bg_0" :checked="backgroundImage.indexOf('background1.jpg') > 0" v-model="backgroundImage" :value="rootUrl + 'static/images/background1.jpg'" name="selImg">
                                <label for="ipt_img_bg_0"><img :src="rootUrl + 'static/images/background1.jpg'" alt="没有地址"></label>
                            </div>
                            <div class="radio radio-inline">
                                <input type="radio" id="ipt_img_bg_1" :checked="backgroundImage.indexOf('background2.jpg') > 0" v-model="backgroundImage" :value="rootUrl + 'static/images/background2.jpg'" name="selImg">
                                <label for="ipt_img_bg_1"><img :src="rootUrl + 'static/images/background2.jpg'" alt="没有地址"></label>
                            </div>
                            <div class="radio radio-inline">
                                <input type="radio" id="ipt_img_bg_2" :checked="backgroundImage.indexOf('background3.jpg') > 0" v-model="backgroundImage" :value="rootUrl + 'static/images/background3.jpg'" name="selImg">
                                <label for="ipt_img_bg_2"><img :src="rootUrl + 'static/images/background3.jpg'" alt="没有地址"></label>
                            </div>
                        </div>
                        <div class="form-group backgroundImage-box" v-if="isDefaultImage=='0'">
                             <input type="file" class="filestyle" @change="customBgImage($event)" data-input="false" id="filestyle-1" tabindex="-1" style="position: absolute; clip: rect(0px 0px 0px 0px);">
                             <div class="bootstrap-filestyle input-group">
                                 <span class="group-span-filestyle " tabindex="0">
                                     <label for="filestyle-1" class="btn btn-default ">
                                         <span class="icon-span-filestyle glyphicon glyphicon-folder-open"></span>
                                         <span class="buttonText">选择图片</span>
                                         <span class="badge"></span>
                                     </label>
                                 </span>
                             </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/javascript">
// import $ from 'jquery';
import {rootUrl} from 'common/js/config';
import vSingle from 'components/questionType/single';
import vMultiple from 'components/questionType/multiple';
import vText from 'components/questionType/text';
import vPosition from 'components/questionType/position';
import vContact from 'components/questionType/contact';
import VueRouter from 'vue-router';
export default {
    data: function () {
        return {
            id: "",
            backgroundImageSwitch: '0',
            rootUrl: rootUrl,
            url: '',   // 获取
            moduleList: [],
            name: '问卷名称',  // 问卷名称
            startDate: moment().startOf('month').format('YYYY-MM-DD HH:MM:00'), // 开始时间
            endDate: moment().endOf('month').format('YYYY-MM-DD HH:MM:00'), // 结束时间
            statisticalObj: "统计对象", // 统计对象
            title: "问卷标题", // 问卷标题
            isDefaultImage: '1',  // 是否是默认背景图片， 默认为true
            backgroundImage: "", // 背景图
            introduction: "", // 引言
            releaseModuls: [], // 所属模块
            questionList: [],
            // 我是面板切换属性
            paneName: 'qst'
        }
    },
    components: {vSingle, vMultiple, vText, vPosition, vContact},
    created: function () {
        var id = this.$route.params.id;
        var edit = this.$route.params.edit;
        if (edit === 'yes') {
            this.id = id;
        }
        if (id) {
            this.getQuestionById(id);
        }
    },
    mounted: function () {
        this.initStyle();
        this.initDatepicker();
        this.getModuleType();
        this.backgroundImageSwitch = this.isDefaultImage ? '0' : '1';
    },
    methods: {
        initStyle: function () {
            var cLeftWidth = this.$el.querySelector('.container-left').offsetWidth;
            var cRightWidth = this.$el.clientWidth - cLeftWidth - 65;
            this.$el.querySelector('.container-right').style.width = cRightWidth + 'px';
        },
        // 通过复制问卷添加问卷
        getQuestionById: function (id) {
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/getQuestionnaireDetail', {"id": id}, {emulateJSON: true}).then(function (response) {
                if (response.body.resultCode === 1) {
                    console.dir(response.body.result);
                    var data = response.body.result;
                    this.name = data.name;
                    this.startDate = data.startDate;
                    this.endDate = data.endDate;
                    this.statisticalObj = data.statisticalObj;
                    this.title = data.title;
                    this.isDefaultImage = data.isDefaultImage;
                    this.backgroundImage = data.backgroundImage;
                    this.introduction = data.introduction;
                    this.releaseModuls = data.releaseModuls || [];
                    this.questionList = data.questionList || [];
                }
                else {
                    alert(response.body.resultMsg);
                }
            }).catch(function (error) {
                alert(error.statusText);
            });
        },
        // 初始化日期控件
        initDatepicker: function () {
            var _this = this;
            $('#datepickerRange').daterangepicker({
                timePicker: true,
                timePicker24Hour: true,
                timePickerSeconds: true,
                startDate: this.startDate,
                endDate: this.endDate,
                locale: {
                    format: 'YYYY-MM-DD HH:mm:ss'
                }
            }, function (sDate, eDate) {
                _this.startDate = sDate.format('YYYY-MM-DD HH:mm:ss');
                _this.endDate = eDate.format('YYYY-MM-DD HH:mm:ss');
            });
        },
        iptChangeTime: function (e, name) {
            // console.log(e.target.value);
            this[name] = e.target.value;
        },
        // 面板切换
        switchPane: function (name) {
            this.paneName = name;
        },
        // 获取模块类别列表
        getModuleType: function () {
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/getModuleList', {}, {emulateJSON: true}).then(function (res) {
                if (res.data.resultCode === 1) {
                    this.moduleList = res.data.result;
                }
                else {
                    console.error(res.data.resultMsg);
                }
            });
        },
        // 设置选择的发布模块
        choiceReleaseModule: function (id, name, $event) {
            if ($event.target.checked) {
                this.releaseModuls.push({
                    "id": id,
                    "name": name
                });
            }
            else {
                this.releaseModuls = this.releaseModuls.map(function (value, index, item) {
                    if (value.id !== id) return value;
                });
                this.releaseModuls.length--;
            }
        },
        // 判断是否是选中
        isCheckedModule: function (id) {
            for (var i = 0; i < this.releaseModuls.length; i++) {
                if (this.releaseModuls[i].id === id) return true;
            }
            return false;
        },
        // 添加题目
        addQuestion: function (type) {
            for (var i = 0; i < this.questionList.length; i++) {
                if (this.questionList.type === '6') {
                    console.log("已经添加联系方式模块");
                    return;
                }
                if (this.questionList.type === '5') {
                    console.log("已经添加位置拾取模块");
                    return;
                }
            }
            var o = {
                "index": "",
                "type": "",
                "question": "", // 题目标题
                "subQuestion": "",
                "answers": []
            };
            switch (type) {
                // 填空提
                case '1':
                    o.type = '1';
                break;
                // 单选题
                case '2':
                    o.type = '2';
                break;
                //
                case '3':
                    o.type = '3';
                break;
                // 多选题
                case '4':
                    o.type = '4';
                break;
                // 位置拾取
                case '5':
                    o.type = '5';
                break;
                // 联系人姓名和电话
                case '6':
                    o.type = '6';
                break;
                default: break;
            };

            this.questionList.push(o);
            this.switchPane('cst');
        },
        // 子模版通知更新数据
        callbackQuestionData: function (oList, num) {
            console.log(num);
            this.questionList[num] = oList;
        },
        // 子模版通知删除数据
        delQuestionData: function (oList, num) {
            if (num === this.questionList.length) {
                this.questionList.pop();
                return;
            }

            for (var i = num; i < this.questionList.length - 1; i++) {
                this.questionList[i] = this.questionList[i + 1];
            }
            this.questionList.pop();
        },
        delQuestion: function (queAttr) {},
        // 自定义图片
        customBgImage: function (e) {
            var target = e.target;
            // 过滤图片格式
            var allowExtention = ".jpg,.gif,.png"; // ,允许上传文件的后缀名
            var extention = target.value.substring(target.value.lastIndexOf(".") + 1).toLowerCase();
            if (allowExtention.indexOf(extention) === -1) {
                alert("仅支持" + allowExtention + "为后缀名的文件!");
                return;
            }
            var reader = new FileReader();
            var _v = this;
            reader.onload = function (e) {
                var fileValue = e.target.result;
                 document.querySelector('.container-right').style.backgroundImage = "url('" + fileValue + "')";
                 _v.$http.post(rootUrl + 'questionnaire/api/questionnaire/uploadImage', {'base64': fileValue}, {emulateJSON: true}).then(function (response) {
                    // _v.$http.post('http://localhost:8080/questionnaire/api/questionnaire/uploadImage', {'form': {'base64': fileValue}}).then(function (response) {
                    console.dir(response.body);
                });
                // console.log(fileValue);
                // setValue(imgPreviewId, divPreviewId, fileValue,width, height,obj,browserVersion);
            };
           reader.readAsDataURL(target.files[0]);
        },
        // 保存问卷
        saveQuestion: function () {
            var data = {
                id: this.id,
                name: this.name,
                startDate: this.startDate,
                endDate: this.endDate,
                statisticalObj: this.statisticalObj,
                releaseModuls: this.releaseModuls,
                title: this.title,
                introduction: this.introduction,
                isDefaultImage: this.isDefaultImage,
                backgroundImage: this.backgroundImage,
                questionList: this.questionList
            };
            console.dir(data);
            // console.log(data.questionList[0].type);
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/addQuestionnaire', {'questionnaireJson': JSON.stringify(data)}, {emulateJSON: true}).then(function (response) {
                if (response.body.resultCode === 1) {
                    alert('添加成功!');
                    let router = new VueRouter();
                    router.push({ path: 'questionList' });
                    // this.$route.push({ path: 'questionList' }); // 导航到问卷列表
                }
            });
        }
    },
    watch: {
        isDefaultImage: function (val, oldVal) {
            this.backgroundImage = "";
        },
        backgroundImage: function (val, oldVal) {
            document.querySelector('.container-right').style.backgroundImage = "url('" + val + "')";
        }
    }
}
</script>
<style lang="scss" src="./questionAdd.scss"></style>
<style lang="scss">
    ul {
       padding: 0;
       list-style-type: none;
    }
    .question-type-list{
       padding: 0;
       margin: 0;
       list-style-type: none;

       li {
           margin-bottom: 3px;
           border: 1px solid #e0e0e0;
           cursor: pointer;
           background-color: #fff;

           a {
               display: block;
               padding-left: 32px;
               height: 100%;
               font-size: 14px;
               line-height: 38px;
               color: #333;
           }
       }
    }

    .question-setting-unrequest,.question-pager-bg-box {
        .form-horizontal .form-group {
            margin-left: 0;
            margin-right: 0;
        }
    }

    // 背景图片
    .backgroundImage-box {
        padding-top: 15px;
        img {
            width: 150px;
        }

        .img-custom-bg {
            margin-left: 15px;
        }
    }
</style>
