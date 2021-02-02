import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

export function personage(data){
    return PhpRequest({
        url:'/work/userpwdchange',
        method: 'post',
        data
    })

}