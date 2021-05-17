import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

export function personage (data) {
    return PhpRequest({
        url: '/work/userpwdchange',
        method: 'post',
        data
    })
}

// 个人信息

export function userinfo(data){
    return PhpRequest({
        url:"/work/userinfo",
        method:'post',
        data
    })
}

// export function useraccount(data){
//     return PhpRequest({
//         url:'work/useraccount',
//         method:'post',
//         data
//     })
// }
// 员工查询
export function userinfolist (data) {
    return PhpRequest({
        url: 'work/userinfolist',
        method: 'post',
        data
    })
}
// 权限

export function rolemenu (data) {
    return PhpRequest({
        url: '/work/rolemenu',
        method: 'post',
        data
    })
}
// 角色权限

export function rolelist (data) {
    return PhpRequest({
        url: '/work/rolelist',
        method: 'post',
        data
    })
}
// 角色权限详情
export function getRoleDetail (data) {
    return PhpRequest({
        url: '/work/rolelistDefault',
        method: 'post',
        data
    })
}

// 修改角色权限
export function modifyRole (data) {
    return PhpRequest({
        url: '/work/rolesave',
        method: 'post',
        data
    })
}

export function depotslist (data) {
    return PhpRequest({
        url: '/work/depotslist',
        method: 'post',
        data
    })
}

// 新增权限

export function rolesave(data){
    return PhpRequest({
        url:'/work/rolesave',
        method:'post',
        data
    })
}

// 菜单权限获取列表

export function groupmenulistt(data){
    return PhpRequest({
        url:'/work/groupmenulistt',
        method:'post',
        data
    })
}

// 员工账号角色清空员工操作密码

export function eliminatepwd(data){
    return PhpRequest({
        url:'/work/eliminatepwd',
        method:'post',
        data
    })
}

// 新增员工账号

export function useraccount(data){
    return PhpRequest({
        url:'work/useraccount',
        method:'post',
        data
    })
}

//删除 员工账号

export function userdelete(data){
    return PhpRequest({
        url:'work/userdelete',
        method:'post',
        data
    })
}


