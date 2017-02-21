<!-- 表格分页组件 -->
<template>
        <nav class="boot-nav">
            <ul class="pagination boot-page">
                <li>
                    <a href="javascript:void(0)" aria-label="首页" @click="onFirstClick()">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" aria-label="上一页" @click="onPrevClick()">
                        <span aria-hidden="true">‹</span>
                    </a>
                </li>
                <li v-for="(page, index) in pages" :class="activeNum == page ? 'active' : ''">
                    <a href="javascript:void(0)" v-text="page" @click="onPageClick(page)"></a>
                </li>
                <li>
                    <a href="javascript:void(0)" aria-label="下一页" @click="onNextClick()">
                        <span aria-hidden="true">›</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" aria-label="末页" @click="onLastClick()">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
            <div class="page-total">
                共 <span v-text="pageTotal"></span> 页
            </div>
        </nav>
        <!-- <select class="form-control boot-select" v-model="len">
            <option v-for="(arr, index) in lens" :value="arr" v-text="arr" :selected="arr == 5 ? true : false"></option>
        </select> -->
</template>

<script>
import {rootUrl} from 'common/js/config';
export default {
    props: {
        // 页码
        // pages: {
        //     type: Array,
        //     default: function () {
        //         return [1]
        //     }
        // },
        // 是否请求服务器端数据
        async: {
            type: Boolean,
            default: false
        },
        // 每页显示个数
        len: {
            type: Number,
            default: 10
        },
        active: {
            type: Number,
            default: 1
        },
        // 显示个数数组
        lens: {
            type: Array,
            default: function () {
                return [10, 50, 100]
            }
        },
        // 表格数据（数组）
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        // AJAX地址
        url: {
            type: String,
            default: ''
        },
        // 显示页数
        pageLen: {
            type: Number,
            default: 5
        },
        // 总页数
        // pageTotal: {
        //     type: Number,
        //     default: 1
        // },
        // 参数内容
        param: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            activeNum: 1,
            pageTotal: 1,
            pages: [1]
        }
    },
    methods: {
        // 点击页码刷新数据
        onPageClick (index) {
            if (this.activeNum === index) return;
            this.activeNum = index;
            this.getPages();
        },
        // 上一页
        onPrevClick () {
            // 当前页是否为当前最小页码
            if (this.activeNum === 1) return;
            --this.activeNum;
            this.getPages();
        },
        // 下一页
        onNextClick () {
            // 当前页是否为当前最大页码
            if (this.activeNum === this.pageTotal) return;

            ++this.activeNum
            this.getPages();
        },
        // 第一页
        onFirstClick () {
            if (this.activeNum === 1) return;
            this.activeNum = 1;
            this.getPages();
        },
        // 最后一页
        onLastClick () {
          console.log(this.pageTotal);
            if (this.activeNum === this.pageTotal) return;

            this.activeNum = this.pageTotal;
            this.getPages();
        },
        // 获取页码
        getPages () {
            this.pages = [];
            if (!this.async) {
                this.pageTotal = Math.ceil(this.data.length / this.len)
            }

            var len = this.pageLen;
            var s = this.activeNum;
            var e = this.activeNum;

            for (; len > 1;) {
                if (s > 0) {
                  this.pages.unshift(s--);
                  len--;
                }
                if (e < this.pageTotal) {
                  this.pages.push(++e);
                  len--;
                }

                if (!(s > 0 || e < this.pageTotal)) {
                    break;
                }
            }
            if (len === 1) {
                if (s > 0) {
                    this.pages.unshift(s--);
                }
                else if (e < this.pageTotal) {
                    this.pages.push(++e);
                }
            }
        },
        // 页码变化获取数据
        getData () {
            // var url = 'http://localhost:8080/questionnaire/api/questionnaire/getQuestionnaireList';
            // this.$http.post(url, {'a': "2"}, {params: {'pageNo': 1, 'pageSize': 5}}).then(function (response) {
            //     console.dir(response.body);
            // });
            // return;
            if (!this.async) {
                let len = this.len,
                    pageNum = this.pages[this.activeNum] - 1,
                    newData = [];
                for (let i = pageNum * len; i < (pageNum * len + len); i++) {
                    this.data[i] !== undefined ? newData.push(this.data[i]) : ''
                }

                this.$emit('data', newData);
            } else {
                this.param.pageNo = this.activeNum;
                this.param.pageSize = this.len;
                // console.dir(this.param);
                // var pa = {"active": this.activeNum, "lengths": this.len};
                // $.ajax({
                //     url: rootUrl + this.url,
                //     type: "POST",
                //     data: this.param,
                //     success: function (data) {
                //         console.dir(data);
                //     }
                // })
                this.$http.post(rootUrl + this.url, this.param, {emulateJSON: true}).then(function (response) {
                    if (response.body.resultCode === 1) {
                        this.pageTotal = Math.ceil(response.body.result.count / this.len);
                        this.getPages();
                        this.$emit('callbackData', response.body.result.list);
                    }
                    else {
                        console.log(response.body.resultMsg);
                    }
                })
            }
        },
        // 刷新表格
        refresh () {
            console.log('更新数据');
            this.getData()
        },
        // 重置并刷新表格
        refresh2 () {
            this.pages = [1]

            this.activeNum === 0 ? this.getData() : this.activeNum = 0
        }
    },
    created: function () {
        if (!this.async) {
            this.getPages();
        }
        this.getData();
    },
    watch: {
        // 监听显示数量
        'len' (newVal, oldVal) {
            if (!this.async) {
                this.getPages()
                if (this.activeNum + 1 > this.pages.length) {
                    this.activeNum = this.pages.length - 1
                }
                this.getData()
            } else {
                this.refresh2()
            }
        },
        // 监测当前页变化
        'activeNum' (newVal, oldVal) {
            this.getData();
        },
        'param': {
            deep: true,
            handler: function (val, oldVal) {
                this.activeNum = 1;
                this.getData();
            }
        }

    }
}
</script>

<style >
.boot-select {
    float: right;
    width: 80px;
}
.boot-nav {
    float: right;
}
.boot-page {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
}
.page-total {
    display: inline-block;
    vertical-align: middle;
}
</style>
