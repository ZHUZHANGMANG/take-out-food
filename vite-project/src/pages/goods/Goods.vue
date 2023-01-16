<template>
<div class="goods">
    <!-- 菜单 -->
    <div class="menu-warpper" ref="menuWrapperRef">
        <ul>
            <li class="menu-item" v-for="(good,index) of data.goods" :class="{ current: index === data.now }" @click="clickMenuItem(index,$event)">
                <span class="text border-1px">
                    <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>
                    {{good.name}}
                </span>
            </li>
        </ul>
    </div>
    <!-- 商品列表 -->
    <div class="food-warpper" ref="foodsWrapperRef">
        <ul>
            <li v-for="good in data.goods" class="food-list">
                <h1 class="title">{{good.name}}</h1>
                <ul>
                    <li @click="clickFood(food,$event)" class="food-item border-1px" v-for="food in good.foods">
                        <div class="icon">
                            <img :src="food.icon" width="57" height="57" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <div class="desc">{{food.description}}</div>
                            <div class="extra">
                                <span class="count">月销{{food.sellCount}}份</span>
                                <span class="rating">好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <CartControl : ="food" @update-food-count="updateFoodCount"></CartControl>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- 购物车 -->
    <ShopCart
      :food-list="foodList"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      @clear-cart="clearCart"
      @update-food-count="updateFoodCount"
    ></ShopCart>
    <Food 
        :food="data.selectFood"
        @updata-food-count='updateFoodCount'
        ref="foodRef"
    ></Food>
</div>
</template>
<script setup>
import axios from 'axios';
import { nextTick, onMounted, reactive,ref, watch,computed,provide,onBeforeMount } from 'vue';
import BetterScroll from 'better-scroll';
import CartControl from '../../components/CartControl/CartControl.vue';
import ShopCart from '../../components/shop-cart/ShopCart.vue';
import Food from '../../components/Food/Food.vue';
const classMap=['decrease','discount','guarantee','invoice','special'];
const menuWrapperRef=ref(null);
const foodsWrapperRef=ref(null);
const data=reactive({goods:[],now:0,scrollY:0,tops:[],selectFood:{},});
let foodsScroll=ref(null);
let foodRef=ref(null);
const props = defineProps(["seller"]);

onBeforeMount(()=>{
    axios.get("http://localhost:3000/goods").then((res)=>{
        data.goods=res.data;
        nextTick(()=>{
            // 才能获取更新后的dom元素
            _initScrol();
            // 初始化top值
            _initTops();
        })
    });
});
// const clickFoods=(food,event)=>clickFood();
const clickFood=(food,event)=>{
        data.selectFood=food;
        foodRef.value.show(true);
        if (!food.count) {
            data.selectFood.shopcartShow = true;
        } else {
            data.selectFood.shopcartShow = false;
        }
    };

const _initScrol=()=>{
    new BetterScroll(menuWrapperRef.value,{
        click:true,
    })
    foodsScroll=new BetterScroll(foodsWrapperRef.value,{
        click:true,
        probeType:3,//派发scroll事件
    })
    foodsScroll.on('scroll',(position)=>{
        data.scrollY=Math.abs(position.y)
    })
}
const clickMenuItem=(index,event)=>{
    data.now=index;
    let toLi=foodsWrapperRef.value.getElementsByClassName('food-list')[index];
    foodsScroll.scrollToElement(toLi,300)
}
const _initTops = () => {
  var tops = data.tops;
  var top = 0;
  tops.push(top);

  var lis = foodsWrapperRef.value.getElementsByClassName("food-list");
    console.log('lis',lis);
  //伪数组lis转化成了数组,方便使用forEach
  [].slice.call(lis).forEach((li) => {
    //每一个标题（li）的高度累加得出top
    top += li.clientHeight; //取出下一个li的高度
    tops.push(top);
  });

};
watch(
    ()=>data.scrollY,
    (scrollY)=>{
        data.now=data.tops.findIndex(
        (top,index)=>scrollY>=top&&scrollY<data.tops[index+1]
        )
    }
)
// 商品数量增减
const updateFoodCount=(food,isAdd,onOff,event)=>{
    if(isAdd){
       if(!food.count){
        food.count=1;
        }else{
            food.count++;
        } 
    }else{
        if(food.count){
            food.count--;
        }
    }
    if(onOff && !food.count){
        data.selectFood.shopcartShow = true;
    }
}

provide('updateFoodCount',updateFoodCount)
// 加入购物车的商品
const foodList=computed(()=>{
    const foods=[];
    data.goods.forEach(good=>{
        good.foods.forEach(food=>{
            if(food.count){
               foods.push(food); 
            };
        });
    });
    return foods;
});
const clearCart=()=>{
    foodList.value.forEach(food=>{food.count=0})
};


</script>
<style scoped lang="stylus">

@import './style.styl'; 
.brand
    // background-image url('./imgs/brand@2x.png')
    bg-image('brand')
</style>