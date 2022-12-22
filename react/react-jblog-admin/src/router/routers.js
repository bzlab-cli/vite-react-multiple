/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/1 15:14
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/1 15:14
 */

/*const ArticleList = () => import('../views/article/list');
const ArticleNew = () => import('../views/article/new');
const ArticleEdit = () => import('../views/article/edit');

const WorksList = () => import('../views/works/list');
const WorksNew = () => import('../views/works/new');
const WorksEdit = () => import('../views/works/edit');

const TagList = () => import('../views/tag/list');
const Upload = () => import('../views/upload/upload');
const SettingMine = () => import('../views/setting/mine');
const SettingUpyun = () => import('../views/setting/upyun');
const SettingAbout = () => import('../views/setting/about');*/

import ArticleList from '../views/article/list';
import ArticleNew from '../views/article/new';
import ArticleEdit from '../views/article/edit';

import WorksList from '../views/works/list';
import WorksNew from '../views/works/new';
import WorksEdit from '../views/works/edit';

import TagList from '../views/tag/list';
import Upload from '../views/upload/upload';
import SettingMine from '../views/setting/mine';
import SettingSchedule from '../views/setting/schedule';
import SettingUpyun from '../views/setting/upyun';
import SettingAbout from '../views/setting/about';

// 不显示在菜单路由里
export const otherRouter = [
    {
        title: '编辑文章',
        path: '/app/article/edit/:id',
        component: ArticleEdit
    },
    {
        title: '编辑作品',
        path: '/app/works/edit/:id',
        component: WorksEdit
    },
];

// 显示在菜单路由里
export const appRouter = [
    {
        path: '/app/article',
        title: '文章',
        icon: 'exception',
        sub: [{
            path: '/app/article/list',
            title: '文章列表',
            icon: '',
            component: ArticleList
        }, {
            path: '/app/article/new',
            title: '写文章',
            icon: '',
            component: ArticleNew
        }],
    },
    {
        path: '/app/tag',
        title: '标签',
        icon: 'exception',
        sub: [{
            path: '/app/tag/list',
            title: '标签列表',
            icon: '',
            component: TagList
        }],
    },
    {
        path: '/app/work',
        title: '作品',
        icon: 'exception',
        sub: [{
            path: '/app/works/list',
            title: '作品列表',
            icon: '',
            component: WorksList
        }, {
            path: '/app/works/new',
            title: '写作品',
            icon: '',
            component: WorksNew
        }],
    },
    {
        path: '/app/upload',
        title: '上传',
        icon: 'upload',
        sub: [{
            path: '/app/upload/list',
            title: '文件列表',
            icon: '',
            component: Upload
        }],
    },
    {
        path: '/app/setting',
        title: '设置',
        icon: 'setting',
        sub: [{
            path: '/app/setting/mine',
            title: '个人信息',
            icon: '',
            component: SettingMine
        }, {
            path: '/app/setting/schedule',
            title: '定时任务',
            icon: '',
            component: SettingSchedule
        }, {
            path: '/app/setting/upyun',
            title: '又拍云',
            icon: '',
            component: SettingUpyun
        }, {
            path: '/app/setting/about',
            title: '关于',
            icon: '',
            component: SettingAbout
        }],
    }
];

export const appRouterMethod = (() => {
    let routes = [];

    return () => {
        appRouter.forEach(item => {
            item.component && routes.push(item);

            if (item.sub && item.sub.length)
                item.sub.map(sub => routes.push(sub))
        });

        return routes
    }
})();

export const routers = [
    ...otherRouter,
    ...appRouterMethod(),
];
