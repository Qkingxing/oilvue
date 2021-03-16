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

// 数据 统计客户 -概览

export function customer(data){
    return JavaRequest({
        url:'/data/get_customer_overview',
        method:'post',
        data
    })
}

// 数据 概览 - 折线图
export function customerStatistics(data){
    return PhpRequest({
        url:'/set/customerStatistics',
        method:'post',
        data
    })
}

// 客户会员

export function member(data){
    return JavaRequest({
        url:'/data/get_Total_member_data',
        method:'post',
        data
    })
}

// 客户会员 折线图和占比图

export function customerMemberStatistic(data){
    return PhpRequest({
        url:'/set/customerMemberStatistic',
        method:'post',
        data
    })
}

// 客户车辆 折线图
export function carinfo(data){
    return PhpRequest({
        url:'/set/carinfo',
        method:'post',
        data
    })
}

// 客户积分 

export function statistics(data){
    return JavaRequest({
        url:'/data/get_points_statistics',
        method:'post',
        data
    })
}

// 客户积分 折线图

export function customerIntegralStatistics(data){
    return PhpRequest({
        url:'/set/customerIntegralStatistics',
        method:'post',
        data
    })
}