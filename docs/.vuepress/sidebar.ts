export const Sidebar = {
    '/pages/': [
        {
            text: '快速入门',
            collapsible: false,
            children: [
                {text: '介绍', link: '/pages/quickstart/js'},
                {text: '快速开始', link: '/pages/quickstart/ksks'},
                {text: '安装', link: '/pages/quickstart/az'},
                {text: '支持与赞助', link: '/pages/quickstart/support'},
            ],
        },
        {
            text: 'MPJBaseMapper',
            collapsible: true,
            children: [
                {link: '/pages/core/api/deleteJoin', text: 'deleteJoin'},
                {link: '/pages/core/api/updateJoin', text: 'updateJoin'},
                {link: '/pages/core/api/updateJoinAndNull', text: 'updateJoinAndNull'},
                {link: '/pages/core/api/selectJoinCount', text: 'selectJoinCount'},
                {link: '/pages/core/api/selectJoinOne', text: 'selectJoinOne'},
                {link: '/pages/core/api/selectJoinList', text: 'selectJoinList'},
                {link: '/pages/core/api/selectJoinPage', text: 'selectJoinPage'},
                {link: '/pages/core/api/selectJoinMap', text: 'selectJoinMap'},
                {link: '/pages/core/api/selectJoinMaps', text: 'selectJoinMaps'},
                {link: '/pages/core/api/selectJoinMapsPage', text: 'selectJoinMapsPage'},
            ],
        },
        {
            text: 'MPJLambdaWrapper',
            collapsible: false,
            children: [
                {
                    text: 'select',
                    collapsible: false,
                    children: [
                        {link: '/pages/core/lambda/select/distinct', text: 'distinct'},
                        {link: '/pages/core/lambda/select/select', text: 'select'},
                        {link: '/pages/core/lambda/select/selectAll', text: 'selectAll'},
                        {link: '/pages/core/lambda/select/selectAsClass', text: 'selectAsClass'},
                        {link: '/pages/core/lambda/select/selectAs', text: 'selectAs'},
                        {link: '/pages/core/lambda/select/selectFunc', text: 'selectFunc'},
                        {link: '/pages/core/lambda/select/selectCollection', text: 'selectCollection'},
                        {link: '/pages/core/lambda/select/selectAssociation', text: 'selectAssociation'},
                        {link: '/pages/core/lambda/select/selectSub', text: 'selectSub'},
                    ]
                },
                {
                    text: 'join',
                    collapsible: false,
                    children: [
                        {link: '/pages/core/lambda/join/leftJoin', text: 'leftJoin'},
                        {link: '/pages/core/lambda/join/rightJoin', text: 'rightJoin'},
                        {link: '/pages/core/lambda/join/innerJoin', text: 'innerJoin'},
                        {link: '/pages/core/lambda/join/join', text: 'join'},
                    ]
                },
                {link: '/pages/core/logic/logic', text: '逻辑删除'},
                {link: '/pages/core/qt/zlj', text: '自连接'},
                {link: '/pages/core/qt/many', text: '关联同一张表多次'},
                {link: '/pages/core/logic/chain', text: '链式调用'},
                {link: '/pages/core/logic/union', text: 'union/union all'},
                {link: '/pages/core/logic/tbn', text: '动态表名'},
                {link: '/pages/core/tj/tj', text: '条件构造器'},
                {link: '/pages/core/tj/ifExists', text: 'ifExists'},
            ],
        },
        {
            text: 'MPJQueryWrapper',
            collapsible: true,
            children: [
                {link: '/pages/core/str/select', text: 'select'},
                {
                    text: 'join',
                    collapsible: true,
                    children: [
                        {link: '/pages/core/str/join/leftJoin', text: 'leftJoin'},
                        {link: '/pages/core/str/join/rightJoin', text: 'rightJoin'},
                        {link: '/pages/core/str/join/innerJoin', text: 'innerJoin'},
                        {link: '/pages/core/str/join/join', text: 'join'},
                    ]
                },
            ],
        },
        {
            text: '注解映射',
            collapsible: true,
            children: [
                {link: '/pages/core/anno/az', text: '注解映射'},
            ]
        },
        {
            text: '配置',
            collapsible: true,
            children: [
                {link: '/pages/core/cf/cf', text: '配置'},
            ]
        },
        {
            text: '常见问题',
            collapsible: true,
            children: [
                {link: '/pages/problem', text: '常见问题'},
            ]
        },
    ],
}
