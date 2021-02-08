import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

// 整体看板
export function dashboard(data){
    return JavaRequest({
        url:'/data/getBoard',
        method: 'post',
        data
    })
}
// 占比分析

export function analysiss(data){
    return JavaRequest({
        url:'/data/get_sale_ratio',
        method:'post',
        data
    })
}