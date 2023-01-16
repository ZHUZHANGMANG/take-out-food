<template>
    <transition name="move">
        <div class="food" v-show="isShow" ref="foodRef">
            <div>
                <div class="back" @click="show(false)">
                    <i class="icon-arrow_lift"></i>
                </div>
                <div class="img">
                    <img :src="food.image" alt="">
                </div>
                <div class="detail">
                    <div class="name">{{ food.name }}</div>
                    <div class="sell">
                        <span class="sellCount">月售{{ food.sellCount }}份</span>
                        <span class="rating">好评率{{ food.rating }}%</span>
                    </div>

                    <div class="price">
                        <span class="new">￥{{ food.price }} </span>
                        <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                    </div>
                    <div class="addshopcart" @click="changAddShopcart()">
                        <div class="add" v-show="food.shopcartShow">加入购物车</div>
                        <CartControl v-show="!food.shopcartShow" :food="food" @update-food-count="updateFoodCount">
                        </CartControl>
                    </div>
                </div>
                <div class="introduce">
                    <div class="title">商品介绍</div>
                    <div class="text">{{ food.info }}</div>
                </div>
                <div class="rating">
                    <div class="title">商品评价</div>
                    <div class="filter">
                        <div class="all" @click="allRating()">全部{{ foodNum }}</div>
                        <div class="suggest" @click="suggestRating()">推荐{{ suggestNum }}</div>
                        <div class="roast" @click="roastRating()">吐槽{{ roastNum }}</div>
                    </div>
                    <div class="ratingContent">
                        <ul>
                            <li v-for="item in (selectrating.length!=0?selectrating:props.food.ratings)">
                                <div class="title">
                                    <div class="time">{{ item.rateTime }}</div>
                                    <div class="avatar">
                                        <div class="username">{{ item.username }}</div>
                                        <img :src="item.avatar" alt="">
                                    </div>
                                </div>
                                <div class="content">
                                    <span class="icon" :class="classIcon[item.rateType]"></span>
                                    <span class="text">{{ item.text }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>
<script setup>
import { ref, computed, nextTick, onMounted, onUpdated, inject } from 'vue';
import CartControl from '../CartControl/CartControl.vue';
import BScroll from 'better-scroll';

const props = defineProps({
    food: Object,
    // updateFoodCount:Function
});
let selectrating=ref([]);
console.log('selectrating',selectrating.value)
const updateFoodCount = inject('updateFoodCount');
// const updateFoodCount = defineEmits(['updateFoodCount'])
const isShow = ref(false);
const classIcon = ['good', 'bad']
const show = (bl) => {
    isShow.value = !isShow.value;
};
defineExpose({ show });
// let shopcartShow = ref(false);
const changAddShopcart = (e) => {
    props.food.shopcartShow = false;
    updateFoodCount(props.food, true, false, e);
}
const foodRef = ref(null)
nextTick(() => {
    new BScroll(foodRef.value, { click: true });
});

const filterRating = (num) => {
    if (num === 2) {
        selectrating.value=props.food.ratings;
    } else {
        let arr = props.food.ratings.filter((item) => {
            return item.rateType === num;
        });
        selectrating.value=arr;
    }
};

let suggestNum = ref();
let roastNum = ref();
let foodNum = ref();

const allRating = () => {
    filterRating(2);
    foodNum.value = selectrating.value.length;
};
const suggestRating = () => {
    filterRating(0);
    suggestNum.value=selectrating.value.length;
};
const roastRating = () => {
   filterRating(1);
    roastNum.value=selectrating.value.length;
};


</script>
<style scoped lang="stylus">
@import './style.styl';
</style>