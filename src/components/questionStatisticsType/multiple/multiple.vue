<template lang="html">
    <div class="answer-box answer-box-multiple">
        <div class="answer-title">{{index + ". " + question}}</div>
        <div class="answer-charts" :id="'js_' + questionId"></div>
    </div>
</template>

<script>
import vm from './index';
export default vm;
</script>
