<template lang="html">
    <div class="answer-box answer-box-position">
        <div class="answer-title">{{index + ". " + question}}</div>
        <div class="answer-map" :id="'js_' + questionId" style="width:100%; height: 500px;"></div>
    </div>
</template>

<script>
import vm from './index';
export default vm;
</script>
