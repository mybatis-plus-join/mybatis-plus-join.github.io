export const sidebar = [
    {
        text: '快速入门',
        collapsed: false,
        items: [
            {text: '介绍', link: '/pages/quickstart/introduce'},
            {text: '快速开始', link: '/pages/quickstart/quickstart'},
            {text: '安装', link: '/pages/quickstart/install'},
            {text: '支持与赞助', link: '/pages/quickstart/support'},
        ],
    },
    {
        text: 'MPJBaseMapper',
        collapsed: true,
        items: [
            {link: '/pages/core/api/selectJoinCount', text: 'selectJoinCount'},
            {link: '/pages/core/api/selectJoinOne', text: 'selectJoinOne'},
            {link: '/pages/core/api/selectJoinList', text: 'selectJoinList'},
            {link: '/pages/core/api/selectJoinPage', text: 'selectJoinPage'},
            {link: '/pages/core/api/selectJoinMap', text: 'selectJoinMap'},
            {link: '/pages/core/api/selectJoinMaps', text: 'selectJoinMaps'},
            {link: '/pages/core/api/selectJoinMapsPage', text: 'selectJoinMapsPage'},
            {link: '/pages/core/api/deleteJoin', text: 'deleteJoin'},
            {link: '/pages/core/api/updateJoin', text: 'updateJoin'},
            {link: '/pages/core/api/updateJoinAndNull', text: 'updateJoinAndNull'},
        ],
    },
    {
        text: 'MPJLambdaWrapper',
        collapsed: false,
        items: [
            {
                text: 'select',
                collapsed: false,
                items: [
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
                collapsed: false,
                items: [
                    {link: '/pages/core/lambda/join/leftJoin', text: 'leftJoin'},
                    {link: '/pages/core/lambda/join/rightJoin', text: 'rightJoin'},
                    {link: '/pages/core/lambda/join/innerJoin', text: 'innerJoin'},
                    {link: '/pages/core/lambda/join/join', text: 'join'},
                ]
            },
            {link: '/pages/core/other/logic-delete', text: '逻辑删除'},
            {link: '/pages/core/other/chain', text: '链式调用'},
            {link: '/pages/core/other/apply-func', text: '条件函数(applyFunc)'},
            {link: '/pages/core/other/dynamic-table-name', text: '动态表名'},
            {link: '/pages/core/other/union', text: 'union/union all'},
            {link: '/pages/core/other/if-exists', text: 'ifExists'},
            {link: '/pages/core/other/sub-query', text: '子查询'},
            {link: '/pages/core/other/from', text: 'from'},
            {link: '/pages/core/other/condition-wrapper', text: '条件构造器'},
            {link: '/pages/core/other/join-same-table-many', text: '关联同一张表多次'},
            {link: '/pages/core/other/self-join', text: '自连接'},
        ],
    },
    {
        text: 'MPJQueryWrapper',
        collapsed: true,
        items: [
            {link: '/pages/core/str/select', text: 'select'},
            {
                text: 'join',
                collapsed: true,
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
        text: '参考',
        collapsed: false,
        items: [
            {link: '/pages/core/mapping/intro', text: '注解映射'},
            {link: '/pages/core/config/config', text: '配置'},
            {link: '/pages/problem', text: '常见问题'},
        ]
    },
]