import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

export function personage(data){
    return PhpRequest({
        url:'/work/userpwdchange',
        method: 'post',
        data
    })

}

// 员工查询
export function userinfolist(data){
    return PhpRequest({
        url:'work/userinfolist',
        method: 'post',
        data
    })
}