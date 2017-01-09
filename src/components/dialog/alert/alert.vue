<template lang="html">
    <div class="">
        <div class="sxc-mask"></div>
        <div class="sxc-dialog">
            <div class="sxc-dialog__bd">
                {{text}}
            </div>
            <div class="sxc-dialog__ft">
                <a @click="callbackAlert" class="sxc-dialog__btn sxc-dialog__btn-primary">{{btnText}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import vm from './index';
export default vm;
</script>

<style lang="scss" src="./alert.scss">
</style>
