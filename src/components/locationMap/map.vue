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
export default {
    props: {
        id: {
            type: String,
            default: function () {
                return "allmap" + Math.ceil(Math.random() * 100000);
            }
        },
        mapValue: {
            type: Object,
            default: function () {
                return {
                    lng: 116.404,   // 地理经度
                    lat: 39.915,   // 地理纬度
                    value: "北京"
                };
            }
        },
        domTarget: {
            default: function () {
                return null
            }
        }
    },
    data: function () {
        return {
            map: null,
            bShowSearchList: false,
            value: "",
            zoom: 15,
            searchList: [],
            needLocation: true, // 判断拖动地图 获取地图中间位置信息
            zoomend: true
        };
    },
    created: function () {},
    mounted: function () {
        this.initStyle();
        this.map = new BMap.Map(this.id);
        if (this.mapValue.value === "北京") {
            this.getLocation();
        }
        else {
            this.initMap();
        }
    },
    watch: {
        value: function (newVal, oldVal) {
            var _this = this;
            var options = {
                onSearchComplete: function (results) {
                     // 判断状态是否正确
                     _this.searchList = [];
                    if (local.getStatus() === BMAP_STATUS_SUCCESS) {
                        for (var i = 0; i < results.getCurrentNumPois(); i++) {
                            _this.searchList.push({
                                value: results.getPoi(i).title,
                                lng: results.getPoi(i).point.lng,
                                lat: results.getPoi(i).point.lat
                            });
                        }
                    }
                    if (document.activeElement.id === "js_ipt_map") {
                        _this.bShowSearchList = true;
                    }
                }
           };
           var local = new BMap.LocalSearch(this.map, options);
           local.search(newVal);
       },
       mapValue: {
           deep: true,
           handler: function (val, oldVal) {
               this.initMap();
           }
       }
    },
    methods: {
        initStyle: function () {
            var dom = document.querySelector('#' + this.id);
            var domBox = document.querySelector(".location-map");

            dom.style.height = window.outerHeight - 52 + "px";
            dom.style.width = window.outerWidth + "px";

            domBox.style.height = window.outerHeight + "px";
            domBox.style.width = window.outerWidth + "px";
        },
        // 通过GPS获取坐标信息
        getLocation: function () {
            var _this = this;
            var options = {
                enableHighAccuracy: true, // 是否获取高精度结果
                timeout: 5000,            // 超时,毫秒
                maximumAge: 5000          // 可以接受多少毫秒的缓存位置
            };
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
                    new BMap.Convertor().translate([point], 1, 5, function (gps) {
                        // _this.mapValue.lng = gps.points[0].lng;
                        // _this.mapValue.lat = gps.points[0].lat;
                        if (gps.status === 0) {
                            _this.getLocationInfo(gps.points[0].lng, gps.points[0].lat);
                        }
                        else {
                            _this.initMap();
                        }
                    });
                }, function () {
                    _this.initMap();
                }, options);
            }
            else {
                this.initMap();
            }
        },
        initMap: function () {
          var _this = this;
            // this.map.centerAndZoom(new BMap.Point(116.4035, 39.915), 8);
            var point = new BMap.Point(this.mapValue.lng, this.mapValue.lat);
            // var marker = new BMap.Marker(point);
            this.map.enableScrollWheelZoom();
            this.map.centerAndZoom(point, this.zoom);

            this.map.addEventListener("dragstart", function () {
                _this.needLocation = true;
                _this.zoomend = true;
            });
            this.map.addEventListener("dragend", function () {
                _this.setMarkerInfo();
            });
            this.map.addEventListener("tilesloaded", function () {
                if (_this.zoomend) {
                    _this.setMarkerInfo();
                }
            });
            this.map.addEventListener("zoomend", function () {
                _this.zoom = _this.map.getZoom();
            });
        },
        clearValue: function () {
            this.value = "";
            this.showSearchList = false;
        },
        hideSearchList: function () {
            this.bShowSearchList = false;
        },
        focusSearch: function () {
            if (this.searchList.length > 0) {
                this.bShowSearchList = true;
            }
            else {
                this.bShowSearchList = false;
            }
        },
        selSearchItem: function (val) {
            this.bShowSearchList = false;
            this.value = val.value;
            this.$emit("updateLocation", val);
        },
        setMarkerInfo: function () {
            if (this.needLocation) {
                this.needLocation = false;
                var point = this.map.getCenter();
                this.getLocationInfo(point.lng, point.lat);
            }
        },
        getLocationInfo: function (lng, lat) {
          var _this = this;
          new BMap.Geocoder().getLocation(new BMap.Point(lng, lat),
          function (rs) {
              var val = {
                   value: rs.address,
                   lng: rs.point.lng,
                   lat: rs.point.lat
              }
              _this.value = val.value;
              _this.$emit("updateLocation", val);
          });
        },
        clkOk: function () {
            this.bShowSearchList = false;
            this.$emit("callbackHideMap");
        }
    }
};
</script>

<style lang="scss">

.location-map {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    .map {
        width: 100%;
        height: 100%;
    }
}

.map-header {
    position: relative;
    padding: 10px 12px;
    background: #efeff4;
    border-bottom: 1px solid #cfcfcf;

    .search {
        position: relative;

        .input-box {
            margin-right: 52px;
            input {
                width: 100%;
                border-radius: 5px;
                border: 1px solid #bbb;
                font-size: 14px;
                text-indent: 20px;
                box-sizing: border-box;
                line-height: 1.4;
                background: #fff url('./icons.png') no-repeat;
                background-size: 150px 75px;
                padding: 5px;
                background-position: -120px -42px;
            }

            .icon {
                background: url('./icons.png') no-repeat;
                background-size: 150px 75px;
            }
            .icon-delete {
                background-position: -3px -2px;
                width: 20px;
                height: 20px;
                position: absolute;
                right: 57px;
                top: 6px;
            }
        }

        .btn-search-ok {
            position: absolute;
            width: 40px;
            height: 31px;
            line-height: 31px;
            border: 0;
            background: none;
            font-size: 16px;
            text-align: center;
            color: #3eaf0e;
            right: 0;
            top: 0;
        }
    }

    .search-list {
        position: absolute;
        top: 50px;
        left: 0;
        padding-left: 1rem;
        width: 100%;
        z-index: 99;
        background: #fff;

        ul {
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                border-bottom: 1px solid #ddd;
                padding: 0.5rem 0;

                span {
                    color: #666;
                    font-size: 16px;
                    width: 100%;
                    line-height: 1.5;
                    overflow: hidden;
                }
            }
        }
    }
}

.map-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99;
    margin-left: -9px;
    margin-top: 4px;

    img {
        vertical-align: middle;
        width: 23px;
    }
    p {
        width: 163px;
        height: 50px;
        background: url('./info-bg.png') no-repeat;
        background-size: 163px 50px;
        position: absolute;
        top: -50px;
        left: -72px;
        z-index: 99;

        & > font {
            padding: 8px;
            line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            width: 147px;
            display: block;
        }
    }
}

</style>
