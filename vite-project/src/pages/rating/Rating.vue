<template>
    <div class="ratings">
        <div class="score">
            <div class="left">
                <div class="averageScore">{{averageScore}}</div>
                <div class="text">综合评分 </div>
                <div class="describe">高于周边商家69.2%</div>
            </div>
            <div class="star">
                <div class="attitude">服务态度
                    <van-rate v-model="num" readonly color=rgb(255,153,0) /></div>
                <div class="attitude">服务态度 
                    <van-rate v-model="num" readonly color=rgb(255,153,0) />
                </div>
                <div class="time">送达时间 {{averageTime}}分钟</div>
            </div>
        </div>
        <div class="rating">
            <div class="filter">
                <div class="all" @click="allRating">全部{{allNum}}</div>
                <div class="suggest" @click="suggestRating">推荐{{suggestNum}}</div>
                <div class="roast" @click="roastRating">吐槽{{roastNum}}</div>
            </div>
            <div class="ratingContent">
                <ul>
                    <li v-for="(item,index) in data.selectRatings">
                        <div class="title">
                            <div class="avatar">
                                <img :src="item.avatar">
                            </div>
                            <div class="right">
                                <div class="top">
                                    <div class="username">{{item.username}}</div>
                                    <div class="time">{{data.time[index]}}</div>
                                </div>
                                <div class="bottom">
                                    <div class="star">
                                        <van-rate v-model="item.score" readonly color=rgb(255,153,0) />
                                    </div>
                                    <div class="deliveryTime"> {{item.deliveryTime}}分钟 送达</div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <div class="text">{{item.text}}</div>
                            <div class="tag">
                                <div class="icon" :class="classIcon[item.rateType]"></div>
                                <ul>
                                    <li v-for="contentitem in item.recommend">{{contentitem}}</li>
                                </ul>
                            </div>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
   
</template>
<script setup>
import axios from 'axios';
import { nextTick, onMounted, reactive,ref, watch,computed } from 'vue';
import BetterScroll from 'better-scroll';
const data=ref({ratings:[],selectRatings:[],time:[]});
let averageTime=ref(0);
const classIcon=['good','bad'];
let num=ref(4);
let allNum=ref(0);
let suggestNum=ref(0);
let roastNum=ref(0);
let sumScore=ref(0);
let sumTime=ref(0);
let averageScore=ref(0);

const filterRating = (num) => {
            if (num === 2) {
                data.value.selectRatings = data.value.ratings
            } else {
                let newDta =  data.value.ratings.filter((item) => {
                    return item.rateType === num;
                }) 
                data.value.selectRatings = newDta
            };
        };
let allRating = () =>  {
    filterRating(2);
    allNum.value= data.value.selectRatings.length
}
let suggestRating = () => {
    // let arrSuggest = filterRating(0);
    filterRating(0);
    suggestNum.value=data.value.selectRatings.length;
};
let roastRating = () => {
    // let roastArr = filterRating(1);
    filterRating(1);
    roastNum.value=data.value.selectRatings.length;
};

const getTime=(t)=>{
   let time = new Date(t);
   let year = time.getFullYear();
   let month = time.getMonth()+1;
   month = month<10?('0'+month):month;
   let day = time.getDate();
   day = day<10?('0'+day):day;
    var today = year + '-' + month + '-' + day;
    return today;
}
onMounted(()=>{
    axios.get("http://localhost:3000/ratings").then((res)=>{
        data.value.ratings = res.data;
        res.data.forEach(item => {
            sumScore.value = sumScore.value + item.score;
            let t=getTime(item.rateTime);
            data.value.time.push(t);
            if(item.deliveryTime){
                sumTime.value = sumTime.value + item.deliveryTime;
            }
        });
        averageScore.value = (sumScore.value/res.data.length).toFixed(1);
        averageTime.value = (sumTime.value/res.data.length).toFixed(0);
        suggestRating();
        roastRating();
        allRating();
   });
});

</script>
<style scoped lang="stylus">
@import './style.styl'; 

</style>
