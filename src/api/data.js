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
// 占比分析 最新
export function analysiss1(data){
    return PhpRequest({
        url:'/set/allinfo',
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

//  客户 客户--加油卡总数据

export function card(data){
    return JavaRequest({
        url:'/data/get_Total_fuel_card',
        method:'post',
        data
    })
}
// 客户-加油卡统计--折线图占比图

export function GasCardStatistics(data){
    return PhpRequest({
        url:'/set/GasCardStatistics',
        method:'post',
        data
    })
}

//  用于查看数据 员工绩效--加油统计

export function revenues(data){
    return JavaRequest({
        url:'/data/get_sales_revenue',
        method:'post',
        data
    })
}

// 员工绩效-加油统计--折线图占比图

export function oilingStatistics(data){
    return PhpRequest({
        url:'/set/oilingStatistics',
        method:'post',
        data
    })
}

// 用于查看数据 员工绩效--充值统计

export function recharge(data){
    return JavaRequest({
        url:'/data/get_recharge_statistics',
        method:'post',
        data
    })
}

// 员工绩效-充值统计--折线图占比图

export function RechargeStatistics(data){
    return PhpRequest({
        url:'/set/RechargeStatistics',
        method:'post',
        data
    })
}

// 用于查看数据 员工绩效--关注统计

export function follow(data){
    return JavaRequest({
        url:'/data/get_follow_statistics',
        method:'post',
        data
    })
}

// 员工绩效-关注统计--折线图占比图

export function follows(data){
    return PhpRequest({
        url:'/set/followStatistics',
        method:'post',
        data
    })
}