<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food?.count"
                @click.stop="$emit('updateFoodCount', food, false, true, $event)"></div>
        </transition>

        <div class="cart-count" v-show="food?.count">{{ food?.count }}</div>
        <div class="cart-add icon-add_circle" @click.stop="$emit('updateFoodCount', food, true, false, $event)"></div>
    </div>
</template>
<script setup>
import { inject } from "vue";
const props = defineProps({ food: Object })
// defineEmits(['updateFoodCount'])
const updateFoodCount = inject('updateFoodCount');
</script>
<style lang="stylus" scoped>
@import './style.styl'
</style>