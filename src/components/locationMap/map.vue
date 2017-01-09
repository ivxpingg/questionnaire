<template lang="html">
    <div class="location-map">
        <div class="map-header">
            <div class="search">
                <div class="input-box">
                    <input id="js_ipt_map" type="text" placeholder="请输入地址" v-model="value" @focus="focusSearch">
                    <span class="icon icon-delete" @click="clearValue"></span>
                </div>
                <a class="btn-search-ok" @click="clkOk">确定</a>
            </div>
            <div class="search-list" v-show="bShowSearchList">
                <ul>
                    <li v-for="val in searchList" @click="selSearchItem(val)"><span>{{val.value}}</span></li>
                    <li @click="hideSearchList"><span>收起</span></li>
                </ul>
            </div>
        </div>
        <div class="map" :id="id" v-once></div>
        <div class="map-mark">
           <img src="./marker_red_hd.png" alt="">
           <p><font>{{mapValue.value}}</font></p>
        </div>
    </div>
</template>

<script>
import vm from './index.js';
export default vm;
</script>

<style lang="scss" src="./map.scss">
</style>
