import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'


export function discount(data){
    return JavaRequest({
        url:'/data/get_coupon_static',
        method: 'post',
        data
    })
}