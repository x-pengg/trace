import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import routers from './routers'
import * as filters from './filters';

// vue filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// vue router
Vue.use(VueRouter)
const router = new VueRouter()
routers(router)

// vue resource
Vue.use(VueResource)

// 根节点
const app = Vue.extend(require('./app.vue'))
router.start(app, 'app')
