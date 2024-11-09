import {defineConfig} from 'vitepress'
import {sidebar} from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'en-US',
    title: "MyBatis-Plus-Join",
    description: "MyBatis-Plus 最佳搭档，只做增强不做改变，为简化开发、提高效率而生。",
    head: [
        ['link', {rel: 'icon', href: '/log.svg'}],
        ['link', {rel: 'stylesheet', type: 'text/css', href: `/css/css.css`}],
    ],
    themeConfig: {
        logo: '/log.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/',},
            {text: '问答', link: '/pages/problem',},
        ],
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        noResultsText: '无法找到相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换'
                        }
                    }
                }
            }
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/yulichang/mybatis-plus-join', ariaLabel: 'github'},
            {
                icon: {
                    svg: '<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#c71d23" r="16"/><path d="m24.0987698 14.2225144h-9.0863697c-.4362899.000207-.7900048.3538292-.790326.7901191l-.0005173 1.9752185c-.0003277.4363707.353328.7902117.7896987.790326.0000712 0 .0001424 0 .0002135-.0002135l5.5317648-.0000461c.4363708-.0000102.7901221.3537352.7901257.790106 0 .0000022 0 .0000044-.0000066.0000066v.1975077.1975318c0 1.3091122-1.0612451 2.3703573-2.3703573 2.3703573h-7.5067195c-.4363081-.0000218-.790009-.353713-.7900429-.7900211l-.0002069-7.5059917c-.0001014-1.3091122 1.0611145-2.3703865 2.3702267-2.3704226.0000217 0 .0000435 0 .0000653.0000653h11.0602463c.4361793-.0004902.7898484-.35394.7906091-.79011894l.0012251-1.97521881c.0007606-.43637034-.3527683-.79033806-.7891389-.79060871-.0001634-.0000001-.0003268-.00000015-.0004901.00048976h-11.0617654c-3.27278051 0-5.92589329 2.65311278-5.92589329 5.9258933v11.0612755c0 .4363707.35374837.7901191.7901191.7901191h11.65447149c2.9454379 0 5.3331872-2.3877493 5.3331872-5.3331872v-4.5430682c0-.4363707-.3537484-.7901191-.7901191-.7901191z" fill="#fff"/></g></svg>'
                },
                link: 'https://gitee.com/best_handsome/mybatis-plus-join',
                ariaLabel: 'gitee'
            },
        ],

        sidebar: sidebar,

        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',

        externalLinkIcon: true,

        returnToTopLabel: '返回顶部',

        outline: {level: [2, 4], label: '页面导航'},

        editLink: {
            pattern: 'https://github.com/mybatis-plus-join/mybatis-plus-join.github.io/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        lastUpdated: {
            text: '最后更新时间：',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

        footer: {
            message: 'Released under the Apache License.',
            copyright: 'Copyright © 2022-2024'
        },
    }
})
