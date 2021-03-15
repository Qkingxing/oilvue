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

// 查看收入趋势

export function revenue(data){
    return JavaRequest({
        url:'/data/get_trend_income',
        method:'post',
        data
    })
}

// 下载中心 下载列表

export function download(data){
    return JavaRequest({
        url:'/data/get_download_list',
        method:'post',
        data
    })
}