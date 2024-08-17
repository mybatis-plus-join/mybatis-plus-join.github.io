import {searchPlugin} from '@vuepress/plugin-search'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {Sidebar} from "./sidebar.js";

export default defineUserConfig({
    base: 'mybatis-plus-join-doc',
    port: 80,
    lang: 'en-US',
    title: 'MyBatis-Plus-Join',
    description: '🚀为简化开发而生',
    head: [
        ['link', {rel: 'icon', href: '/mybatis-plus-join-doc/lg-xs.png'}],
        ['link', {rel: 'stylesheet', type: 'text/css', href: '/mybatis-plus-join-doc/css/cs.css'}],
    ],
    plugins: [
        searchPlugin({
            getExtraFields: (page) => page.frontmatter.tags ?? [],
            locales: {
                '/': {
                    placeholder: '搜索',
                },
            },
            maxSuggestions: 10,
        }),
    ],
    theme: defaultTheme({
        logo: '/lg-xs.png',
        navbar: [
            '/',
            {text: 'Github', link: 'https://github.com/yulichang/mybatis-plus-join',},
            {text: 'Gitee', link: 'https://gitee.com/best_handsome/mybatis-plus-join',},
            {text: '问答', link: '/pages/problem',},
        ],
        locales: {
            '/': {
                sidebar: Sidebar,
                sidebarDepth: 0,
            }
        },
        docsRepo: 'https://github.com/yulichang/mybatis-plus-join-doc',
        docsBranch: 'main',
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
        prev: '上一页',
        next: '下一页',
    }),
    bundler: viteBundler(),
})
