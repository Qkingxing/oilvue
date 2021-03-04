import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'

// 获取当前登陆账号人员的身份信息
export function getInfo(){
    return PhpRequest({
        url:'/work/userinfo',
        method: 'post',
        // data: { userId: store.getters.userId}
    })
}