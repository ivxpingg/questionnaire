<template lang="html">
    <div class="answer-box answer-box-text">
        <div class="answer-title">{{index + ". " + question}}</div>
        <div class="answer-table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>问卷名称</th>
                        <th>系统值</th>
                        <th>用户值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in tableList">
                        <td v-text="question"></td>
                        <td v-text="data.systemAnswer"></td>
                        <td v-text="data.userAnswer"></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">
                            <div class="pull-right">
                                <boot-page ref="page" :async="async_t" :param="param" :data="tableList" :lens="lenArr" :page-len="pageLen" :len="len" :active:="active" :url="url" @callbackData="callbackData"></boot-page>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
import vm from './index';
export default vm;
</script>
