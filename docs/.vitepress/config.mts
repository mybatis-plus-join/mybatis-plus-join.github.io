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
            {text: 'Github', link: 'https://github.com/yulichang/mybatis-plus-join',},
            {text: 'Gitee', link: 'https://gitee.com/yulichang/mybatis-plus-join',},
            {text: '更新日志', link: 'https://github.com/yulichang/mybatis-plus-join/releases',},
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
            {icon: 'github', link: 'https://github.com/yulichang/mybatis-plus-join', ariaLabel: 'github'}
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
            text: '最后更新时间',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

        footer: {
            message: 'Released under the Apache License.',
            copyright: 'Copyright © 2021-2026'
        },
    }
})
