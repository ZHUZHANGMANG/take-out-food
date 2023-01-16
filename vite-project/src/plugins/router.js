import { createRouter, createWebHashHistory } from "vue-router";

import Goods from '../pages/goods/Goods.vue';
import Rating from '../pages/rating/Rating.vue';
import Seller from '../pages/seller/Seller.vue';

let routes=[
    {path:'/',redirect:'/goods'},
    {path:'/goods',component:Goods},
    {path:'/rating',component:Rating},
    {path:'/seller',component:Seller}
];

let router=createRouter({
    routes,
    linkActiveClass:'active',
    history:createWebHashHistory(),
});

export default router;