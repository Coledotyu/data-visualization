import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import FilterWord from './views/nav1/Table.vue'
import WordCloud from './views/nav1/WordCloud.vue'
import WordList from './views/nav1/WordList.vue'
import KeyWordList from './views/nav1/KeyWordList.vue'

import ResourceList from './views/nav2/ResourceList.vue'
import Resource from './views/nav2/Resource.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '词云相关',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/wordcloud/XueQiu', component: WordCloud, name: '雪球词云图' },
            { path: '/wordcloud/Guba', component: WordCloud, name: '股吧词云图' },
            { path: '/wordlist', component: WordList, name: '词频列表页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资源管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/upload/resource', component: Resource, name: '上传资源' }, 
            { path: '/fetch/resources', component: ResourceList, name: '资源列表' },
        ]
    },
    {   
        path: '/',
        component: Home,
        name: '客户画像',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '模型概览' },
            { path: '/echarts', component: echarts, name: '行为轨迹' }
				]   
    } 
];

export default routes;
