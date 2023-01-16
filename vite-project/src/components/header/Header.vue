<template>
    <div class="header">
        <!-- 头部不含公告 -->
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <div class="brand"></div>
                    <div class="name">{{seller.name}}</div>
                </div>
                <div class="descripition">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div class="support" v-if='seller.supports'>
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                
            </div>
            <!-- 右侧活动数量 -->
           <div class="supports_count" v-if="seller.supports" @click="detailShow=true">
                    <span class="count"> {{seller.supports.length}}</span>
                    <span class="icon-keyboard_arrow_right"></span>
                </div>
            
        </div>
        <!-- 公告 -->
        <div class="bulletin-wrapper" @click="detailShow=true"> 
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
        <!-- 活动公告详情 -->
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper">
                    <div class="name">{{seller.name}}</div>
                    <div class="rating">⭐⭐⭐⭐⭐</div>
                    <div class="support">
                        <div class="tittle">
                            <div class="line"></div>
                            <span class="text">优惠信息</span>
                            <div class="line"></div>
                        </div>
                        <div class="content" >
                            <ul>
                                <li v-if='seller.supports' v-for="(item,index) of seller.supports" :key=index>
                                    <div class="icon" :class="classMap[item.type]"></div>
                                    <div class="text">{{item.description}}</div>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    <div class="bulletin">
                        <div class="tittle">
                            <div class="line"></div>
                            <span class="text">商家公告</span>
                            <div class="line"></div>
                        </div>
                        <div class="text">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close" @click="detailShow=false">
                    <span class="icon-close"></span>
                </div>
            </div>
        </transition>
        
    </div>


</template>
<script setup>
import { ref } from 'vue';

const props=defineProps(['seller'])
const classMap=['decrease','discount','guarantee','invoice','special']
const detailShow=ref(false)

// console.log('props',props)
// console.log('header',props.seller)
// console.log('seller.supports',props.seller.name)
</script>
<style scoped lang="stylus">
@import './style.styl'
</style>
