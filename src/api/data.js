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