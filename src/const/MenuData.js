export let initMenuData = [{
    text: '主菜单',
    icon: 'ellipsis',
    menu: [
        {
            icon: 'home',
            text: '个人门户'
        }, {
            icon: 'desktop',
            text: '行政管理',
            subMenu: [
                {
                    icon: 'phone',
                    text: '会议管理',
                    component: 'app'
                },
                {
                    icon: 'book',
                    text: '设备管理',
                    component: 'flex'

                }
            ]
        },
        {
            icon: 'folder',
            text: '基础管理',
            subMenu: [
                {
                    icon: 'user',
                    text: '用户管理',
                    component: 'nav'

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
            text: '表单管理',
            subMenu: [
                {
                    icon: 'phone',
                    text: '基础数据'
                },
                {
                    icon: 'book',
                    text: '我的表单'
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