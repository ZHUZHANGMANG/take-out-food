<template>
  <Header :seller="seller"></Header>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/rating">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
  <!-- <div>页面路由</div> -->
  <router-view :seller="seller"></router-view>
</template>
<script setup>
import { onMounted ,ref} from 'vue';
import axios from 'axios'
import Header from '../components/header/Header.vue'
const seller = ref({});
onMounted(() => {
  axios.get("http://localhost:3000/seller").then((res) => {
    seller.value = res.data;
  });
});
</script>
<style scoped lang="stylus">
@import './style.styl'
</style>
