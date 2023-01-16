<template>
    <div class="shopcart">
        <!-- 底部状态条 -->
        <div class="content">
            <div class="content-list" @click="toogleList">
                <div class="logo-wrapper">
                    <div class="logo" :class="{ highlight: totalCount > 0 }">
                        <i class="icon-shopping_cart" :class="{ highlight: totalCount > 0 }"></i>
                    </div>
                    <div class="num" v-if="totalCount">{{ totalCount }}</div>
                </div>
                <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需要配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click="pay">
                <div class="pay" :class="totalPrice<minPrice?'not-enough':'enough'">{{payText}}</div>
            </div>
        </div>

        <transition name="fold">
            <div class="shop-list" v-show="listShow">
                <div class="list-hesder">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="$emit('clearCart')">清空</span>
                </div>
                <div class="list-content" ref="listContentRef">
                    <ul>
                        <li class="food" v-for="food in foodList">
                            <span class="name">{{food.name}}/{{food.count}}个</span>
                            <div class="price">￥{{ food.price }}</div>
                            <div class="cartcontrol-wrapper">
                                <CartControl :food="food" v-bind="$attrs"></CartControl> 
                            </div> 
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="toogleList"></div>
        </transition>
        
    </div>
</template>
<script setup>
import {ref,computed,nextTick} from 'vue'
import CartControl from '../CartControl/CartControl.vue'
import BScroll from 'better-scroll';
const props=defineProps({
    foodList:Array,
    deliveryPrice:Number,
    minPrice:Number
});
defineEmits(['clearCart']);
const isShow=ref(false);
let listContentRef=ref(null);
let scroll=null;
// 商品总数
// reduce proTotal,参数1(参数1.1上次累加的结果，参数1.2当前要循环的数组内容),参数2,初始值
// const totalCount = computed(() =>
//   props.foodList.reduce((proTotal, food) => proTotal + food.count, 0)
// ); 
const totalCount=computed(()=>
    props.foodList.reduce((proTotal,food)=>proTotal+food.count,0)
);
// 购物车显示状态
const listShow=computed(()=>{
    if(totalCount.value===0){
        isShow.value=false;
        return false;
    }
    if(isShow.value){
        nextTick(()=>{
            if(!scroll){
                scroll=new BScroll(listContentRef.value,{click:true});
            }else{
                scroll.refresh();
            }
        });
    }
    return isShow.value
});
const toogleList=()=>{
    isShow.value=!isShow.value;
};
const totalPrice=computed(()=>
    props.foodList.reduce( (proTotal,food)=>proTotal+food.count*food.price,0)
);
// 支付文本
const payText=computed(()=>{
    if(totalPrice.value===0){
        return `￥${props.minPrice}元起送`;
    }else if(totalPrice.value<props.minPrice){
        return `还差￥${props.minPrice-totalPrice.value}元起送`;
    }else{
        return '去结算'
    }
});
// 支付价格
const pay=()=>{
    if(totalPrice.value>=props.minPrice){
        alert(`支付￥${totalPrice.value+props.deliveryPrice}`)
    }
}
</script>
<style lang="stylus" scoped>
@import './style.styl'
</style>