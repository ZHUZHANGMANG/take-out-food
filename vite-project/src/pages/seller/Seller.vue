<template>
<div class="seller">
    <div class="header">
        <div class="top">
            <div class="left">
                <div class="name">{{seller.name}}</div>
                <div class="star">
                    <van-rate v-model="seller.score" readonly color=rgb(255,153,0) />
                    <span class="rating"> ({{seller.ratingCount}})</span>
                    <span class="sellCount"> 月售{{seller.sellCount}}单</span>
                </div>
            </div>
            <div class="right">
                <div class="icon">♥</div>
                <div class="text">已收藏</div>
            </div>
        </div>
        <div class="bottom">
            <div class="minPrice">
                <div class="text">起送价</div>
                <div class="price">
                    <span class="num">{{seller.minPrice}}元</span>
                </div>
            </div>
            <div class="deliveryPrice">
                <div class="text">起送价</div>
                <div class="price">
                    <span class="num">{{seller.deliveryPrice}}元</span>
                </div>
            </div>
            <div class="deliveryTime">
                <div class="text">起送价</div>
                <div class="price">
                    <span class="num">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        
    </div>
    <div class="active">
        <div class="title">公告活动 </div>
        <div class="bulletin">{{seller.bulletin}}</div>
        <ul class="content">
            <li v-for="item in seller.supports">
                <div class="icon" :class="classMap[item.type]"></div>
                <div class="text">{{item.description}}</div>
            </li>
        </ul>
    </div>
    <div class="photo">
        <div class="title">商家实景</div>
        <ul class="content" ref="imgRef">
            <li v-for="item in seller.pics">
                <img :src="item" alt="">
            </li>
        </ul>
    </div>
    <div class="info">
        <div class="title">商家信息</div>
        <ul class="content">
            <li v-for="item in seller.infos" class="text">{{item}}</li>
        </ul>
    </div>
</div>
</template>
<script setup name="mm">
import {ref,nextTick } from 'vue';
// import BScroll from 'better-scroll';
import BetterScroll from 'better-scroll'
const props = defineProps(["seller"]);

const classMap=['decrease','discount','guarantee','invoice','special']
// const imgRef=ref(null);
// nextTick(() => {
//     new BetterScroll(imgRef.value, {scrollX:true, });
// });

</script>
<style scoped lang="stylus">
@import './style.styl';
</style>
