<!-- 填空题 -->
<template lang="html">
    <li>
        <div class="form-horizontal s-form-inline" v-show="bEdit_com">
           <div class="form-group form-inline">
               <label class="control-label">{{num + 1}}、填空题</label>
               <span class="checkbox checkbox-primary">
                   <input :id="'chk_text_bt' + num" :checked="questions.isRequired === '0' ? false : true" @change="bRequiredChange" type="checkbox">
                   <label :for="'chk_text_bt' + num">必填</label>
               </span>
               <span class="checkbox checkbox-primary">
                   <input :id="'chk_text_tj' + num" :checked="questions.isPublic === '0' ? false : true" @change="bPublicChange" type="checkbox">
                   <label :for="'chk_text_tj' + num">公开统计结果</label>
               </span>
            </div>

            <div class="form-group s-from-group">
                <label class="control-label s-label" for="">题  目</label>
                <input type="text" class="form-control" v-model="questions.question" placeholder="">
            </div>
            <div class="form-group s-from-group">
                <label class="control-label s-label" for="">副标题</label>
                <input type="text" class="form-control" v-model="questions.subQuestion" placeholder="">
            </div>

            <div class="form-group s-from-group" v-for="(answer, n) in questions.answers" v-show="answer.type === '2'">
                <div class="input-group">
                    <input type="text" v-model.trim="answer.value" class="form-control" placeholder="选项">
                    <span class="input-group-btn">
                        <button type="button" class="btn waves-effect waves-light btn-primary" @click="delAnswer($event, n)"><i class="ion-close"></i></button>
                    </span>
                </div>
            </div>

            <!-- <div class="form-group s-from-group" v-for="(answer, n) in questions.answers" v-show="answer.type === '3'">
                <div class="input-group ">
                    <input type="text" class="form-control" value="其它" placeholder="选项">
                    <span class="input-group-btn">
                        <button type="button" class="btn waves-effect waves-light btn-primary" @click="delAnswerOther"><i class="ion-close"></i></button>
                    </span>
                </div>
            </div> -->

            <div class="form-group s-from-group">
                <button type="button" class="btn btn-white waves-effect s-btn-add-item" @click="addAnswer">新建选项</button>
            </div>

             <div class="form-group s-item-panel" v-show="bEdit">
                 <button type="button" class="btn btn-primary waves-effect waves-light" @click="ok">确定</button>
                 <button type="button" class="btn btn-danger waves-effect" @click="del">删除</button>
             </div>

        </div>

        <div class="" v-show="!bEdit_com"  @click="switchEdit">
            <div class="" v-text="(num + 1) + '、' + questions.question"></div>
            <div class="" v-text="questions.subQuestion"></div>
            <div class="item-text-answer" v-for="(ans, n) in questions.answers">
                <label class="p-label" :for="'item_text_' + num + '_' + n">{{ans.value}}</label>
                <input class="p-form-control form-control" disabled :id="'item_text_' + num + '_' + n" type="text" name="">
            </div>
        </div>

    </li>
</template>

<script>
export default {
    props: {
        // 顺序 从 0 开始
        num: {
            type: Number,
            default: 0
        },
        questions: {
            type: Object,
            default: function () {
                return {
                    isRequired: "0", // 是否是必须填写 "0": 否, "1"
                    isPublic: "0",  // 是否公开统计
                    index: "",   //
                    type: "1",   // 题目类型
                    question: "", // 题目标题
                    subQuestion: "", // 副标题
                    answers: []  // 选项
                }
            }
        },
        // 是否是编辑状态
        // bEdit: {
        //     type: Boolean,
        //     default: true
        // },
        // 是否展示添加 其他 项
        bBtnAnswerOther: {
            type: Boolean,
            default: true
        }
    },
    data: function () {
        return {
            bEdit: true  // 是否是编辑状态
        }
    },
    created: function () {
        if (!this.questions.isRequired) this.questions.isRequired = "0";
        if (!this.questions.isPublic) this.questions.isPublic = "0";
        if (this.questions.answers.length > 0) {
            this.bEdit = false;
        }
    },
    computed: {
        bEdit_com: {
            get: function () {
                return this.bEdit;
            },
            set: function (v) {
                this.bEdit = v;
            }
        }
    },
    methods: {
        bRequiredChange: function () {
            this.questions.isRequired = this.questions.isRequired === "0" ? "1" : "0";
        },
        bPublicChange: function () {
            this.questions.isPublic = this.questions.isPublic === "0" ? "1" : "0";
        },
        addAnswerOther: function () {
            var attr = {
                "key": "",
                "value": "其他",
                "type": '3'
            };
            this.bBtnAnswerOther = !this.bBtnAnswerOther;
            this.questions.answers.push(attr);
        },
        delAnswerOther: function () {
            this.bBtnAnswerOther = !this.bBtnAnswerOther;
            this.questions.answers.pop(); // 删除数组最后一个元素
        },
        addAnswer: function () {
            var attr = {
                "key": "",
                "value": "",
                "type": '2'
            };
            if (this.questions.answers.length === 0) {
                attr.key = "A";
            }
            else {
                var k = this.questions.answers[this.questions.answers.length - 1].key;
                attr.key = String.fromCharCode(k.charCodeAt() + 1);
            }
            this.questions.answers.push(attr);
        },
        delAnswer: function (e, index) {
            for (var i = index; i < this.questions.answers.length - 1; i++) {
                this.questions.answers[i] = this.questions.answers[i + 1];
            }
            this.questions.answers.pop(); // 删除数组最后一个元素
        },
        ok: function () {
            this.bEdit = !this.bEdit;
        },
        del: function () {
            this.$emit("delQuestionData", this.questions, this.num);
        },
        switchEdit: function () {
            this.bEdit_com = !this.bEdit;
        }
    },
    watch: {
        questions: {
            deep: true,
            handler: function (val, oldVal) {
                // console.dir(val);
                this.$emit("callbackQuestionData", val, this.num);
            }
        }
    }
}
</script>

<style lang="scss">
</style>
