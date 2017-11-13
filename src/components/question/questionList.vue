<template>
  <div class="container">
      <!--Page Title-->
      <div class="row">
          <div class="col-sm-12">
              <ol class="breadcrumb">
                  <li><a href="javascript:void();">内容管理</a></li>
                  <li><a href="javascript:void();">问卷调查</a></li>
                  <li class="active">问卷列表</li>
              </ol>
          </div>
      </div>

      <div class="row">
          <div class="col-sm-12">
              <div class="card-box">
                  <div class="table-option-panel clearfix">
                      <div class="searchs pull-left" style="width:300px;">
                          <div class="row">
                              <div class="col-sm-9 todo-inputbar">
                                  <input type="text" ref="iptSearch" id="js_ipt_search" v-on:keyup.enter="search"  class="form-control" placeholder="">
                              </div>
                              <div class="col-sm-3 todo-send">
                                  <button class="btn-primary btn-md btn-block btn waves-effect waves-light" type="button" @click="search">检索</button>
                              </div>
                          </div>
                      </div>
                      <router-link class="btn-primary btn-md btn waves-effect waves-light pull-right" to="/questionAdd">添加</router-link>
                  </div>
                  <div class="table-box">
                      <div class="clipboard-a" style="font-size:0;"> </div>
                      <table class="table table-hover table-bordered">
                          <thead>
                              <tr>
                                  <th>问卷名称</th>
                                  <th>回收时间</th>
                                  <th>发布模块</th>
                                  <th>回收量</th>
                                  <th>状态</th>
                                  <th>操作</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="data in tableList">
                                  <td v-text="data.name"></td>
                                  <td v-text="data.startDate + '~' + data.endDate"></td>
                                  <td v-text="data.modules"></td>
                                  <td v-text="data.paperCount"></td>
                                  <td v-if="data.status === '1'">正常</td>
                                  <td v-else-if="data.status === '2'">暂停</td>
                                  <td v-else-if="data.status === '3'">延长回收</td>
                                  <td v-else></td>
                                  <!-- <td v-text="data.status"></td> -->
                                  <td>
                                       <!-- <a @click="editQuestion(data)">编辑问卷</a> -->
                                       <router-link :to="'/questionAdd/' + data.id + '/yes'"><span>编辑问卷</span></router-link>
                                       <a class="clipboard-a" :data-clipboard-text="rootUrlView + data.id">复制链接</a>
                                       <a v-if="data.status == '1'" @click="updateStatus(data.id, '2')">暂停回收</a>
                                       <a v-else @click="updateStatus(data.id, '1')">开始回收</a>
                                       <a v-if="data.isPublish == '1'" @click="updatePublish(data.id, '0')">取消发布</a>
                                       <a v-else @click="updatePublish(data.id, '1')">立即发布</a>
                                       <router-link :to="'/questionStatistics/' + data.id"><span>问卷统计</span></router-link>
                                       <!-- <a @click="copyQuestion(data)" >复制问卷</a> -->
                                       <router-link :to="'/questionAdd/' + data.id"><span>复制问卷</span></router-link>
                                       <a @click="delQuestion(data.id, data.name)" >删除问卷</a>
                                  </td>
                              </tr>
                          </tbody>
                          <tfoot>
                              <tr>
                                  <td colspan="6">
                                      <!-- <div class="pull-left">
                                          <button class="btn btn-default" @click="refresh">刷新</button>
                                      </div> -->
                                      <div class="pull-right">
                                          <boot-page v-on:data="tableData" ref="page" :async="async_t" :param="param" :data="tableList" :lens="lenArr" :page-len="pageLen" :len="len" :active:="active" :url="url" @callbackData="callbackData"></boot-page>
                                      </div>
                                  </td>
                              </tr>
                          </tfoot>
                      </table>
                  </div>
              </div>
          </div>
      </div>

  </div>
</template>

<script type="text/javascript">
import bootPage from 'components/bootPage/bootPage';
import Clipboard from 'clipboard';
import {rootUrl} from 'common/js/config';
export default {
    data: function () {
        return {
            async_t: true,
            lenArr: [5, 50, 100], // 每页显示长度设置
            pageLen: 5,     // 可显示的分页数
            len: 5,    // 每页显示几行
            active: 1,
            param: {
                name: ''
            },
            url: 'questionnaire/api/questionnaire/getQuestionnaireList',
            tableList: [] // 分页组件传回的分页后数据
        };
    },
    mounted: function () {
    },
    created: function () {
        this.rootUrlView = rootUrl + 'wx.html#/';
        $(document.body).off('click');
        var cb = new Clipboard('.clipboard-a');
        cb.on('success', function (data) {
             alert('已复制到粘贴板');
        });
    },
    components: {bootPage},
    computed: {

    },
    updated: function () {
        // document.querySelectorAll('.clipboard-a').forEach(function (dom) {
        //     dom.removeEventListener('click');
        // });
    },
    methods: {
        search: function () {
            // console.dir(this.$refs.iptSearch.value);
            this.param.name = this.$refs.iptSearch.value;
        },
        refresh: function () {
            this.$refs.page.refresh() // 这里提供了一个表格刷新功能
        },
        tableData: function (data) {
            this.tableList = data;
        },
        // 分页组件传回的表格数据
        callbackData: function (data) {
            console.dir(data);
            this.tableList = data;
        },
        // 更新发布状态
        updatePublish: function (id, value) {
            this.updateQuestionnaire({"id": id, "isPublish": value});
            this.refresh();
        },
        updateStatus: function (id, value) {
            this.updateQuestionnaire({"id": id, "status": value});
            this.refresh();
        },
        updateQuestionnaire: function (param) {
            this.$http.post(rootUrl + 'questionnaire/api/questionnaire/updateQuestionnaire', param, {emulateJSON: true}).then(function (response) {
                if (response.data.resultCode === 1) {
                    this.refresh();
                }
            });
        },
        // 编辑问卷
        editQuestion: function (data) {},
        // 复制链接地址
        copyLinkAddress: function (e, id) {},
        // 删除问卷
        delQuestion: function (id, name) {
            if (confirm('确定要删除<' + name + '>问卷?')) {
                this.$http.post(rootUrl + 'questionnaire/api/questionnaire/deleteQuestionnaire', {'id': id}, {emulateJSON: true}).then(function (response) {
                    if (response.body.resultCode === 1) {
                        this.refresh();
                        alert('删除成功!');
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
.table-box {
    a {
        cursor: pointer;
    }
}
</style>
