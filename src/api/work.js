import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

export function personage (data) {
    return PhpRequest({
        url: '/work/userpwdchange',
        method: 'post',
        data
    })
}

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

export function depotslist (data) {
    return PhpRequest({
        url: '/work/depotslist',
        method: 'post',
        data
    })
}
