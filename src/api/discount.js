import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'


export function discount(data){
    return PhpRequest({
        url:'/set/couponsStatisticsUp',
        method: 'post',
        data
    })
}

export function discount1(data){
    return PhpRequest({
        url:'/set/couponsStatistics',
        method:'post',
        data
    })
} 

export function overview(data){
    return JavaRequest({
        url
    })
}