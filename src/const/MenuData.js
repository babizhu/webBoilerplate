export let initMenuData = [{
    text: '主菜单',
    icon: 'ellipsis',
    menu: [
        {
            icon: 'home',
            text: '集群系统',
            index: 1,
            component: 'home'
        }, {
            icon: 'desktop',
            text: '运行状态',
            index: 2,

            subMenu: [
                {
                    icon: 'phone',
                    text: '性能指标',
                    component: 'c'
                },
                {
                    icon: 'book',
                    text: '运行日志',
                    component: 'flex'

                }
            ]
        },
        {
            icon: 'folder',
            text: '应用系统',
            index: 3,

            subMenu: [
                {
                    icon: 'user',
                    text: '历史作业',
                    component: 'JobHistory'

                }
            ]
        }
    ]
}, {
    text: '基础数据',
    icon: 'ellipsis',


    menu: [
        {
            icon: 'calendar',
            text: '分布存储',
            index: 4,

            subMenu: [
                {
                    icon: 'phone',
                    text: 'Hadoop',
                    component: 'abc'
                },
                {
                    icon: 'book',
                    text: 'HBase',
                    component: 'def'

                }
            ]
        }
    ]
}, {
    text: '杂项设置',
    icon: 'ellipsis',
    menu: [
        {
            icon: 'shrink',
            text: '测试模块',
            index: 5,

            subMenu: [
                {
                    icon: 'phone',
                    text: 'assign 测试',
                    component: 'test'
                }
            ]
        }
    ]
}];