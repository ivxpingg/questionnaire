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
export default {
    props: {
        text: {
            type: String,
            default: ""
        },
        btnText: {
            type: String,
            default: "确定"
        }
    },
    data: function () {
        return {};
    },
    methods: {
        callbackAlert: function () {
            this.$emit("callbackAlert");
        }
    }
};
</script>

<style lang="scss">
.sxc-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
}

.sxc-mask-transparent{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.sxc-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 300px;
  background-color: #FFFFFF;
  text-align: center;
  overflow: hidden;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  z-index: 5000;
}

.sxc-dialog__hd {
  padding: 1.3em 1.6em 0.5em;
}

.sxc-dialog__title {
  font-weight: 400;
  font-size: 18px;
  color: #000;
}

.sxc-dialog__bd {
  padding: 0 1.6em 0.8em;
  min-height: 40px;
  font-size: 15px;
  line-height: 1.3;
  word-wrap: break-word;
  word-break: break-all;
  color: #999999;
}
.sxc-dialog__bd:first-child {
  padding: 2.7em 20px 1.7em;
  color: #000;
}

.sxc-dialog__ft {
  position: relative;
  line-height: 48px;
  font-size: 18px;
  display: flex;
}
.sxc-dialog__ft:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D5D5D6;
  color: #D5D5D6;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

.sxc-dialog__btn {
  position: relative;
  display: block;
  flex: 1;
  color: #3CC51F;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.sxc-dialog__btn:active {
  background-color: #EEEEEE;
}
.sxc-dialog__btn:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #D5D5D6;
  color: #D5D5D6;
  transform-origin: 0 0;
  transform: scaleX(0.5);
}
.sxc-dialog__btn:first-child:after {
  display: none;
}

.sxc-dialog__btn-default {
  color: #000;
}

.sxc-dialog__btn-primary {
  color: #159EE2;
}

.sxc-skin-android .sxc-dialog {
  text-align: left;
  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
}
.sxc-skin-android .sxc-dialog__title {
  font-size: 21px;
}
.sxc-skin-android .sxc-dialog__hd {
  text-align: left;
}
.sxc-skin-android .sxc-dialog__bd {
  color: #999999;
  padding: 0.25em 1.6em 2em;
  font-size: 17px;
  text-align: left;
}
.sxc-skin-android .sxc-dialog__bd:first-child {
  padding: 1.6em 1.6em 2em;
  color: #000;
}

@media screen and (min-width: 1024px) {
  .sxc-dialog {
    width: 35%;
  }
}

</style>
