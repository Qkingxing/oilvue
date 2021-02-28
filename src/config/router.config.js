// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { oil } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dmp/overview/dashboard',
    children: [
      // dmp
      {
        path: '/dmp',
        name: 'dmp',
        redirect: '/dmp/overview/dashboard',
        component: RouteView,
        meta: { title: 'menu.dmp', keepAlive: true, icon: 'fund' },
        children: [
          {
            path: '/dmp/overview',
            name: 'Overview',
            redirect: '/dmp/overview/dashboard',
            component: () => import('@/views/dmp/overview'),
            meta: { title: 'menu.dmp.overview', keepAlive: true },
            children: [
              {
                path: '/dmp/overview/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dmp/overview/dashboard'),
                meta: { title: 'menu.dmp.overview.dashboard' }
              }
            ]
          },
          {
            path: '/dmp/em',
            name: 'Em',
            redirect: '/dmp/em/coupon',
            component: () => import('@/views/dmp/em'),
            meta: { title: 'menu.dmp.em', keepAlive: true },
            children: [
              {
                path: '/dmp/em/coupon',
                name: 'Coupon',
                component: () => import('@/views/dmp/em/coupon'),
                meta: { title: 'menu.dmp.em.coupon' }
              },
              {
                path: '/dmp/em/statistics',
                name: 'Statistics',
                component: () => import('@/views/dmp/em/statistics'),
                meta: { title: 'menu.dmp.em.statistics' }
              },
              {
                path: '/dmp/em/analysis',
                name: 'Analysis',
                component: () => import('@/views/dmp/em/analysis'),
                meta: { title: 'menu.dmp.em.analysis' }
              }
            ]
          },
          {
            path: '/dmp/customer',
            name: 'Customer',
            redirect: '/dmp/customer/overview',
            component: () => import('@/views/dmp/customer'),
            meta: { title: 'menu.dmp.customer', keepAlive: true },
            children: [
              {
                path: '/dmp/customer/overview',
                name: 'Coverview',
                component: () => import('@/views/dmp/customer/overview'),
                meta: { title: 'menu.dmp.customer.overview' }
              },
              {
                path: '/dmp/customer/member',
                name: 'member',
                component: () => import('@/views/dmp/customer/member'),
                meta: { title: 'menu.dmp.customer.member' }
              },
              {
                path: '/dmp/customer/car',
                name: 'car',
                component: () => import('@/views/dmp/customer/car'),
                meta: { title: 'menu.dmp.customer.car' }
              },
              {
                path: '/dmp/customer/credit',
                name: 'credit',
                component: () => import('@/views/dmp/customer/credit'),
                meta: { title: 'menu.dmp.customer.credit' }
              },
              {
                path: '/dmp/customer/statistics',
                name: 'Cstatistics',
                component: () => import('@/views/dmp/customer/statistics'),
                meta: { title: 'menu.dmp.customer.statistics' }
              }
            ]
          },
          {
            path: '/dmp/report',
            name: 'report',
            redirect: '/dmp/report/monthly',
            component: () => import('@/views/dmp/report'),
            meta: { title: 'menu.dmp.report', keepAlive: true },
            children: [
              {
                path: '/dmp/report/monthly',
                name: 'monthly',
                component: () => import('@/views/dmp/report/monthly'),
                meta: { title: 'menu.dmp.report.monthly' }
              },
              {
                path: '/dmp/report/list',
                name: 'list',
                component: () => import('@/views/dmp/report/list'),
                meta: { title: 'menu.dmp.report.list' }
              },
              {
                path: '/dmp/report/download',
                name: 'download',
                component: () => import('@/views/dmp/report/download'),
                meta: { title: 'menu.dmp.report.download' }
              }
            ]
          },
          {
            path: '/dmp/performance',
            name: 'performance',
            redirect: '/dmp/performance/refueling',
            component: () => import('@/views/dmp/performance'),
            meta: { title: 'menu.dmp.performance', keepAlive: true },
            children: [
              {
                path: '/dmp/performance/refueling',
                name: 'refueling',
                component: () => import('@/views/dmp/performance/refueling'),
                meta: { title: 'menu.dmp.performance.refueling' }
              },
              {
                path: '/dmp/performance/recharge',
                name: 'recharge',
                component: () => import('@/views/dmp/performance/recharge'),
                meta: { title: 'menu.dmp.performance.recharge' }
              },
              {
                path: '/dmp/performance/follow',
                name: 'follow',
                component: () => import('@/views/dmp/performance/follow'),
                meta: { title: 'menu.dmp.performance.follow' }
              }
            ]
          }
        ]
      },
      // crm
      {
        path: '/crm',
        name: 'crm',
        redirect: '/crm/customer/list',
        component: RouteView,
        meta: { title: 'menu.crm', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/crm/customer',
            name: 'Ccustomer',
            redirect: '/crm/customer/list',
            component: () => import('@/views/crm/customer'),
            meta: { title: 'menu.crm.customer', keepAlive: true },
            children: [
              {
                path: '/crm/customer/list',
                name: 'Clist',
                component: () => import('@/views/crm/customer/list/index'),
                meta: { title: 'menu.crm.customer.list' },
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/crm/customer/list/detail',
                    name: 'CrmDetail',
                    hidden: true,
                    component: () => import('@/views/crm/customer/list/detail'),
                    meta: { title: 'menu.crm.customer.list.detail' }
                  }
                ]
              },
              {
                path: '/crm/customer/tag',
                name: 'tag',
                component: () => import('@/views/crm/customer/tag/index'),
                meta: { title: 'menu.crm.customer.tag' },
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/crm/customer/tag/detail',
                    name: 'CrmTagDetail',
                    hidden: true,
                    component: () => import('@/views/crm/customer/tag/detail'),
                    meta: { title: 'menu.crm.customer.tag.detail' }
                  }
                ]
              },
              {
                path: '/crm/customer/crowd',
                name: 'crowd',
                component: () => import('@/views/crm/customer/crowd/index'),
                meta: { title: 'menu.crm.customer.crowd' },
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/crm/customer/crowd/detail',
                    name: 'CrmCrowdDetail',
                    hidden: true,
                    component: () => import('@/views/crm/customer/crowd/detail'),
                    meta: { title: 'menu.crm.customer.crowd.detail' }
                  },
                  {
                    path: '/crm/customer/crowd/add',
                    name: 'CrmCrowdAdd',
                    hidden: true,
                    component: () => import('@/views/crm/customer/crowd/add'),
                    meta: { title: 'menu.crm.customer.crowd.add' }
                  }
                ]
              },
              {
                path: '/crm/customer/import',
                name: 'import',
                component: () => import('@/views/crm/customer/import'),
                meta: { title: 'menu.crm.customer.import' }
              }
            ]
          },
          {
            path: '/crm/member',
            name: 'Cmember',
            redirect: '/crm/member/foundation',
            component: () => import('@/views/crm/member'),
            meta: { title: 'menu.crm.member' },
            children: [
              {
                path: '/crm/member/foundation',
                name: 'foundation',
                component: () => import('@/views/crm/member/foundation'),
                meta: { title: 'menu.crm.member.foundation' }
              },
              {
                path: '/crm/member/fixed',
                name: 'fixed',
                component: () => import('@/views/crm/member/fixed'),
                meta: { title: 'menu.crm.member.fixed' }
              },
              {
                path: '/crm/member/grow',
                name: 'grow',
                component: () => import('@/views/crm/member/grow'),
                meta: { title: 'menu.crm.member.grow' }
              }
            ]
          },
          {
            path: '/crm/credit',
            name: 'CrmCredit',
            redirect: '/dmp/credit/setting',
            component: () => import('@/views/crm/credit'),
            meta: { title: 'menu.crm.credit', keepAlive: true },
            children: [
              {
                path: '/crm/credit/setting',
                name: 'setting',
                component: () => import('@/views/crm/credit/setting'),
                meta: { title: 'menu.crm.credit.setting' }
              },
              {
                path: '/crm/credit/rule',
                name: 'rule',
                component: () => import('@/views/crm/credit/rule'),
                meta: { title: 'menu.crm.credit.rule' }
              },
              {
                path: '/crm/credit/record',
                name: 'record',
                component: () => import('@/views/crm/credit/record'),
                meta: { title: 'menu.crm.credit.record' }
              }
            ]
          },
          {
            path: '/crm/prepaid',
            name: 'prepaid',
            redirect: '/dmp/prepaid/list',
            component: () => import('@/views/crm/prepaid'),
            meta: { title: 'menu.crm.prepaid', keepAlive: true },
            children: [
              {
                path: '/crm/prepaid/list',
                name: 'Plist',
                component: () => import('@/views/crm/prepaid/list'),
                meta: { title: 'menu.crm.prepaid.list' }
              },
              {
                path: '/crm/prepaid/client',
                name: 'client',
                component: () => import('@/views/crm/prepaid/client'),
                meta: { title: 'menu.crm.prepaid.client' }
              },
              {
                path: '/crm/prepaid/fleet',
                name: 'fleet',
                component: () => import('@/views/crm/prepaid/fleet'),
                meta: { title: 'menu.crm.prepaid.fleet' }
              }
            ]
          }
        ]
      },
      // em
      {
        path: '/em',
        name: 'em',
        redirect: '/em/marketing/activity_add',
        component: RouteView,
        meta: { title: 'menu.em', keepAlive: true, icon: 'red-envelope' },
        children: [
          {
            path: '/em/marketing',
            name: 'marketing',
            redirect: '/em/marketing/activity_add',
            component: () => import('@/views/em/marketing'),
            meta: { title: 'menu.em.marketing', keepAlive: true },
            children: [
              {
                path: '/em/marketing/activity_add',
                name: 'activity_add',
                component: () => import('@/views/em/marketing/activity_add'),
                meta: { title: 'menu.em.marketing.activity_add' }
              },
              {
                path: '/em/marketing/add',
                name: 'add',
                component: () => import('@/views/em/marketing/add'),
                meta: { title: 'menu.em.marketing.add' }
              }
            ]
          },
          {
            path: '/em/list',
            name: 'Elist',
            redirect: '/em/list/list',
            component: () => import('@/views/em/list'),
            meta: { title: 'menu.em.list', keepAlive: true },
            children: [
              {
                path: '/em/list/list',
                name: 'EMlist',
                component: () => import('@/views/em/list/list'),
                meta: { title: 'menu.em.list.list' }
              },
              {
                path: '/em/list/couponlist',
                name: 'couponlist',
                component: () => import('@/views/em/list/couponlist'),
                meta: { title: 'menu.em.list.couponlist' }
              },
              {
                path: '/em/list/redpacketlist',
                name: 'redpacketlist',
                component: () => import('@/views/em/list/redpacketlist'),
                meta: { title: 'menu.em.list.redpacketlist' }
              }
            ]
          }
        ]
      },
      // oms
      {
        path: '/oms',
        name: 'oms',
        redirect: '/oms/overview',
        component: RouteView,
        meta: { title: 'menu.oms', keepAlive: true, icon: 'profile' },
        children: [
          {
            path: '/oms/overview',
            name: 'Ooverview',
            component: () => import('@/views/oms/overview'),
            meta: { title: 'menu.oms.overview', keepAlive: true }
          }
        ]
      },
      // assets
      {
        path: '/assets',
        name: 'assets',
        redirect: '/assets/money/overview',
        component: RouteView,
        meta: { title: 'menu.assets', keepAlive: true, icon: 'pay-circle' },
        children: [
          {
            path: '/assets/money',
            name: 'money',
            redirect: '/assets/money/overview',
            component: () => import('@/views/assets/money'),
            meta: { title: 'menu.assets.money', keepAlive: true },
            children: [
              {
                path: '/assets/money/overview',
                name: 'Aoverview',
                component: () => import('@/views/assets/money/overview'),
                meta: { title: 'menu.assets.money.overview' }
              },
              {
                path: '/assets/money/recharge_list',
                name: 'recharge_list',
                component: () => import('@/views/assets/money/recharge_list'),
                meta: { title: 'menu.assets.money.recharge_list' }
              }
            ]
          },
          {
            path: '/assets/compar',
            name: 'compar',
            redirect: '/assets/compar/detailed',
            component: () => import('@/views/assets/compar'),
            meta: { title: 'menu.assets.compar', keepAlive: true },
            children: [
              {
                path: '/assets/compar/detailed',
                name: 'detailed',
                component: () => import('@/views/assets/compar/detailed'),
                meta: { title: 'menu.assets.compar.detailed' }
              },
              {
                path: '/assets/compar/liquidate',
                name: 'liquidate',
                component: () => import('@/views/assets/compar/liquidate'),
                meta: { title: 'menu.assets.compar.liquidate' }
              }
            ]
          },
          {
            path: '/assets/balance',
            name: 'balance',
            component: () => import('@/views/assets/balance'),
            meta: { title: 'menu.assets.balance', keepAlive: true }
          },
          {
            path: '/assets/invoice',
            name: 'invoice',
            redirect: '/assets/invoice/list',
            component: () => import('@/views/assets/invoice'),
            meta: { title: 'menu.assets.invoice', keepAlive: true },
            children: [
              {
                path: '/assets/invoice/list',
                name: 'Alist',
                component: () => import('@/views/assets/invoice/list'),
                meta: { title: 'menu.assets.invoice.list' }
              }
            ]
          }
        ]
      },
      // oil
      {
        path: '/oil',
        name: 'oil',
        redirect: '/oil/retail/os_install',
        component: RouteView,
        meta: { title: 'menu.oil', keepAlive: true, icon: oil },
        children: [
          {
            path: '/oil/retail',
            name: 'retail',
            redirect: '/oil/retail/os_install',
            component: () => import('@/views/oil/retail'),
            meta: { title: 'menu.oil.retail', keepAlive: true },
            children: [
              {
                path: '/oil/retail/os_install',
                name: 'os_install',
                component: () => import('@/views/oil/retail/os_install'),
                meta: { title: 'menu.oil.retail.os_install' }
              }
            ]
          },
          {
            path: '/oil/sale',
            name: 'sale',
            redirect: '/oil/sale/query',
            component: () => import('@/views/oil/sale'),
            meta: { title: 'menu.oil.sale', keepAlive: true },
            children: [
              {
                path: '/oil/sale/query',
                name: 'query',
                component: () => import('@/views/oil/sale/query'),
                meta: { title: 'menu.oil.sale.query' }
              },
              {
                path: '/oil/sale/statistics',
                name: 'Ostatistics',
                component: () => import('@/views/oil/sale/statistics'),
                meta: { title: 'menu.oil.sale.statistics' }
              },
              {
                path: '/oil/sale/oscard',
                name: 'oscard',
                component: () => import('@/views/oil/sale/oscard'),
                meta: { title: 'menu.oil.sale.oscard' }
              }
            ]
          },
          {
            path: '/oil/reports',
            name: 'reports',
            redirect: '/oil/reports/sales',
            component: () => import('@/views/oil/reports'),
            meta: { title: 'menu.oil.reports', keepAlive: true },
            children: [
              {
                path: '/oil/reports/sales',
                name: 'sales',
                component: () => import('@/views/oil/reports/sales'),
                meta: { title: 'menu.oil.reports.sales' }
              },
              {
                path: '/oil/reports/oil_return',
                name: 'oil_return',
                component: () => import('@/views/oil/reports/oil_return'),
                meta: { title: 'menu.oil.reports.oil_return' }
              }
            ]
          }
        ]
      },
      // goods
      {
        path: '/goods',
        name: 'goods',
        redirect: '/goods/warehouse/my',
        component: RouteView,
        meta: { title: 'menu.goods', keepAlive: true, icon: 'shop' },
        children: [
          {
            path: '/goods/warehouse',
            name: 'Warehouse',
            redirect: '/goods/warehouse/my',
            component: () => import('@/views/goods/warehouse'),
            meta: { title: 'menu.goods.warehouse', keepAlive: true },
            children: [
              {
                path: '/goods/warehouse/my',
                name: 'my',
                component: () => import('@/views/goods/warehouse/my'),
                meta: { title: 'menu.goods.warehouse.my' }
              },
              {
                path: '/goods/warehouse/Classification',
                name: 'Classification',
                component: () => import('@/views/goods/warehouse/Classification'),
                meta: { title: 'menu.goods.warehouse.Classification' }
              },
              {
                path: '/goods/warehouse/write_off',
                name: 'write_off',
                component: () => import('@/views/goods/warehouse/write_off'),
                meta: { title: 'menu.goods.warehouse.write_off' }
              }
            ]
          }
        ]
      },
      // oa
      {
        path: '/oa',
        name: 'oa',
        redirect: '/oa/personal/center',
        component: RouteView,
        meta: { title: 'menu.oa', keepAlive: true, icon: 'folder-open' },
        children: [
          {
            path: '/oa/personal',
            name: 'personal',
            redirect: '/oa/personal/center',
            component: () => import('@/views/oa/personal'),
            meta: { title: 'menu.oa.personal', keepAlive: true },
            children: [
              {
                path: '/oa/personal/center',
                name: 'center',
                component: () => import('@/views/oa/personal/center'),
                meta: { title: 'menu.oa.personal.center' }
              }
            ]
          },
          {
            path: '/oa/staff',
            name: 'staff',
            redirect: '/oa/staff/account',
            component: () => import('@/views/oa/staff'),
            meta: { title: 'menu.oa.staff', keepAlive: true },
            children: [
              {
                path: '/oa/staff/account',
                name: 'account',
                component: () => import('@/views/oa/staff/account'),
                meta: { title: 'menu.oa.staff.account' }
              },
              {
                path: '/oa/staff/performance',
                name: 'Operformance',
                component: () => import('@/views/oa/staff/performance'),
                meta: { title: 'menu.oa.staff.performance' }
              },
              {
                path: '/oa/staff/power',
                name: 'power',
                component: () => import('@/views/oa/staff/power'),
                meta: { title: 'menu.oa.staff.power' }
              }
            ]
          }
        ]
      },
      // set
      {
        path: '/set',
        name: 'set',
        redirect: '/set/basis',
        component: RouteView,
        meta: { title: 'menu.set', keepAlive: true, icon: 'setting' },
        children: [
          {
            path: '/set/basis',
            name: 'Obasis',
            component: () => import('@/views/set/basis'),
            meta: { title: 'menu.set.basis', keepAlive: true }
          },
          {
            path: '/set/trade',
            name: 'trade',
            redirect: '/set/trade/refund',
            component: () => import('@/views/set/trade'),
            meta: { title: 'menu.set.trade', keepAlive: true },
            children: [
              {
                path: '/set/trade/refund',
                name: 'refund',
                component: () => import('@/views/set/trade/refund'),
                meta: { title: 'menu.set.trade.refund' }
              },
              {
                path: '/set/trade/business',
                name: 'business',
                component: () => import('@/views/set/trade/business'),
                meta: { title: 'menu.set.trade.business' }
              }
            ]
          },
          {
            path: '/set/channel',
            name: 'channel',
            redirect: '/set/channel/wxaccount',
            component: () => import('@/views/set/channel'),
            meta: { title: 'menu.set.channel', keepAlive: true },
            children: [
              {
                path: '/set/channel/wxaccount',
                name: 'wxaccount',
                component: () => import('@/views/set/channel/wxaccount'),
                meta: { title: 'menu.set.channel.wxaccount' }
              },
              {
                path: '/set/channel/wxmini',
                name: 'wxmini',
                component: () => import('@/views/set/channel/wxmini'),
                meta: { title: 'menu.set.channel.wxmini' }
              }
            ]
          },
          {
            path: '/set/customer',
            name: 'Scustomer',
            redirect: '/set/customer/foundation',
            component: () => import('@/views/set/customer'),
            meta: { title: 'menu.set.customer', keepAlive: true },
            children: [
              {
                path: '/set/customer/foundation',
                name: 'Sfoundation',
                component: () => import('@/views/set/customer/foundation'),
                meta: { title: 'menu.set.customer.foundation' }
              }
            ]
          },
          {
            path: '/set/commodity',
            name: 'commodity',
            redirect: '/set/commodity/oil',
            component: () => import('@/views/set/commodity'),
            meta: { title: 'menu.set.commodity', keepAlive: true },
            children: [
              {
                path: '/set/commodity/oil',
                name: 'Soil',
                component: () => import('@/views/set/commodity/oil'),
                meta: { title: 'menu.set.commodity.oil' }
              }
            ]
          },
          {
            path: '/set/tool',
            name: 'tool',
            redirect: '/set/tool/invoice',
            component: () => import('@/views/set/tool'),
            meta: { title: 'menu.set.tool', keepAlive: true },
            children: [
              {
                path: '/set/tool/invoice',
                name: 'Sinvoice',
                component: () => import('@/views/set/tool/invoice'),
                meta: { title: 'menu.set.tool.invoice' }
              },
              {
                path: '/set/tool/discount',
                name: 'discount',
                component: () => import('@/views/set/tool/discount'),
                meta: { title: 'menu.set.tool.discount' }
              },
              {
                path: '/set/tool/receipts',
                name: 'receipts',
                component: () => import('@/views/set/tool/receipts'),
                meta: { title: 'menu.set.tool.receipts' }
              }
            ]
          },
          {
            path: '/set/hardware',
            name: 'hardware',
            redirect: '/set/hardware/selfservice',
            component: () => import('@/views/set/hardware'),
            meta: { title: 'menu.set.hardware', keepAlive: true },
            children: [
              {
                path: '/set/hardware/selfservice',
                name: 'selfservice',
                component: () => import('@/views/set/hardware/selfservice'),
                meta: { title: 'menu.set.hardware.selfservice' }
              },
              {
                path: '/set/hardware/pos',
                name: 'pos',
                component: () => import('@/views/set/hardware/pos'),
                meta: { title: 'menu.set.hardware.pos' }
              },
              {
                path: '/set/hardware/concentrator',
                name: 'concentrator',
                component: () => import('@/views/set/hardware/concentrator'),
                meta: { title: 'menu.set.hardware.concentrator' }
              }
            ]
          },
          {
            path: '/set/notice',
            name: 'notice',
            redirect: '/set/notice/consumption_notice',
            component: () => import('@/views/set/notice'),
            meta: { title: 'menu.set.notice', keepAlive: true },
            children: [
              {
                path: '/set/notice/consumption_notice',
                name: 'consumption_notice',
                component: () => import('@/views/set/notice/consumption_notice'),
                meta: { title: 'menu.set.notice.consumption_notice' }
              },
              {
                path: '/set/notice/events_notice',
                name: 'events_notice',
                component: () => import('@/views/set/notice/events_notice'),
                meta: { title: 'menu.set.notice.events_notice' }
              },
              {
                path: '/set/notice/SMS_manage',
                name: 'SMS_manage',
                component: () => import('@/views/set/notice/SMS_manage'),
                meta: { title: 'menu.set.notice.SMS_manage' }
              }
            ]
          }
        ]
      },
      // support
      {
        path: '/support',
        name: 'support',
        redirect: '/support/product/software',
        component: RouteView,
        meta: { title: 'menu.support', keepAlive: true, icon: 'like' },
        children: [
          {
            path: '/support/product',
            name: 'product',
            redirect: '/support/product/software',
            component: () => import('@/views/support/product'),
            meta: { title: 'menu.support.product', keepAlive: true },
            children: [
              {
                path: '/support/product/software',
                name: 'software',
                component: () => import('@/views/support/product/software'),
                meta: { title: 'menu.support.product.software' }
              },
              {
                path: '/support/product/hardware',
                name: 'Shardware',
                component: () => import('@/views/support/product/hardware'),
                meta: { title: 'menu.support.product.hardware' }
              },
              {
                path: '/support/product/record',
                name: 'Srecord',
                component: () => import('@/views/support/product/record'),
                meta: { title: 'menu.support.product.record' }
              },
              {
                path: '/support/product/invoice',
                name: 'SUinvoice',
                component: () => import('@/views/support/product/invoice'),
                meta: { title: 'menu.support.product.invoice' }
              }
            ]
          },
          {
            path: '/support/help',
            name: 'help',
            component: () => import('@/views/support/help'),
            meta: { title: 'menu.support.help', keepAlive: true }
          }
        ]
      },
      // system
      {
        path: '/system',
        name: 'system',
        redirect: '/system/role',
        component: RouteView,
        meta: { title: 'menu.system', keepAlive: true, icon: 'like' },
        children: [
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role'),
            meta: { title: 'menu.system.role', keepAlive: true }
          }
        ]
      },
      // notPermission
      {
        path: '/notPermission',
        name: 'notPermission',
        component: () => import('@/views/notPermission'),
        hidden: true,
        meta: { title: 'menu.notPermission', hidden: true }
      }
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
      //     },
      //     // 外部链接
      //     {
      //       path: 'https://www.baidu.com/',
      //       name: 'Monitor',
      //       meta: { title: 'menu.dashboard.monitor', target: '_blank' }
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
      //     }
      //   ]
      // },
      // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: RouteView,
      //   meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/basicForm'),
      //       meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
      //     }
      //   ]
      // },
      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: 'menu.list', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/BasicList'),
      //       meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: 'menu.list.card-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: 'menu.list.search-list', keepAlive: true, permission: ['table'] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: 'menu.list.search-list.articles', permission: ['table'] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: 'menu.list.search-list.projects', permission: ['table'] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: 'menu.list.search-list.applications', permission: ['table'] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: 'menu.profile.basic', permission: ['profile'] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: 'menu.profile.advanced', permission: ['profile'] }
      //     }
      //   ]
      // },

      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: 'menu.exception.not-find', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: 'menu.exception.server-error', permission: ['exception'] }
      //     }
      //   ]
      // },

      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
      //       redirect: '/account/settings/basic',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/basic',
      //           name: 'BasicSettings',
      //           component: () => import('@/views/account/settings/BasicSetting'),
      //           meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: {
      //             title: 'account.settings.menuMap.security',
      //             hidden: true,
      //             keepAlive: true,
      //             permission: ['user']
      //           }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: {
      //             title: 'account.settings.menuMap.notification',
      //             hidden: true,
      //             keepAlive: true,
      //             permission: ['user']
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/notPermission',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: false,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import('@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
