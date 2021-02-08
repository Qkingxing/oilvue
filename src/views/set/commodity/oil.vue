
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">

      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1" tab="油品挂牌价">
            <a-button type="primary">
            新增挂牌价
          </a-button>
          <div class="showDataForTable">
            <s-table
              ref="table"
              size="default"
              rowKey="key"
              :columns="columns"
              :data="loadData"
            >
              <span slot="action" slot-scope="text, record">
                <template>
                  <a @click="delTag(record)">撤回</a>
                </template>
              </span>
            </s-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="油枪配置">
          <div class="list-wrap">
            <span class="label-left">状态:</span>
            <a-radio-group name="radioGroup" :default-value="1">
              <a-radio :value="1">
               启用
              </a-radio>
              <a-radio :value="2">
                禁用
              </a-radio>
             
            </a-radio-group>
          </div>

          <a-row class="list-wrap" type="flex" justify="space-between">
            <a-col :span="18">
              <span class="label-left">排列类型:</span>
              <a-radio-group name="radioGroup" :default-value="1">
                <a-radio :value="1">
                  按油枪号
                </a-radio>
                <a-radio :value="2">
                 按油品
                </a-radio>
               
              </a-radio-group>
            </a-col>
            <a-col :span="6" style="text-align:right;padding-right:10px;">
              <span style="margin-right:10px">油枪</span>
              <a-switch default-checked />
            </a-col>
          </a-row>
          <a-row class="list-wrap" type="flex" justify="space-between">
            <a-col :span="18">
              <span class="label-left">油枪列表共「17」支油枪</span>
            </a-col>
            <a-col :span="6" style="text-align:right;padding-right:10px;">
              <a-button type="primary" style="margin-right:12px">
                新增
              </a-button>
              <a-button type="primary">
                批量操作
              </a-button>
            </a-col>
          </a-row>
          <div class="line"></div>

          <div  class="gunList-wrap">
            <div  class="gun-item">
              <span  class="radio-icon" style="display: none;">
                <i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">1号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item">
                  <span  class="radio-icon" style="display: none;">
                    <i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">2号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">3号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">4号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">5号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">6号枪</span><span  class="item-type">国VI95#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">6号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">7号枪</span><span  class="item-type">国VI95#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">8号枪</span><span  class="item-type">国VI98#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">9号枪</span><span  class="item-type">国VI98#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">10号枪</span><span  class="item-type">国VI0#车用柴油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
          </svg></i></span><span  class="item-name">11号枪</span><span  class="item-type">国VI0#车用柴油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">13号枪</span><span  class="item-type">国VI98#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">14号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">15号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">200号枪</span><span  class="item-type">国V充值</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div><div  class="gun-item"><span  class="radio-icon" style="display: none;"><i  aria-label="图标: check" class="anticon anticon-check" style="font-size: 2px; color: rgb(255, 255, 255); display: none;"><svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span><span  class="item-name">210号枪</span><span  class="item-type">国VI92#车用汽油</span><span  class="mark-icon mark-icon-open"></span><span  class="mark-icon-tip">零管</span></div></div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="加油机协议">
         <div>
            <span class="proto-item">91动力</span>
            <span class="proto-item" style="margin:0 10px">FCC</span>
            <span class="proto-item">其他厂商</span>
         </div>
         <a-row style="margin-bottom:12px" type="flex" justify="end">
        
          <a-col :span="4" style="text-align:right">
              <a-button type="primary">
                新增协议
              </a-button>
          </a-col>
        </a-row>
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="终端设置">
            <div   class="terminal-content">
              <div  class="tip">填写时请仔细核对油枪顺序，方便维护管理</div>
              <div  class="terminal-box"><div  class="terminal-block">
                <div  class="terminal-info"><div  class="terminal-info-item">
                <div  class="label">终端编码</div>
                <div  class="code">01</div>
                </div><div  class="terminal-info-item">
                  <div  class="label">协议类型</div>
                  <div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 160px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="76dc3c1f-a164-4ba6-8b53-a4cb30c5c41b" class="ant-select-selection ant-select-selection--single">
                    <div class="ant-select-selection__rendered">
                    <div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                      <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon">
                      <svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                      </svg></i></span></div></div></div><div  class="terminal-info-item"><div  class="label">链接方式</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 160px;">
                      <div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="5bec0136-626a-4a0b-aac1-16e3381f1cd7" class="ant-select-selection ant-select-selection--single">
                        <div class="ant-select-selection__rendered">
                        <div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                        <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                      </svg></i></span></div></div>
                      </div><div  class="terminal-info-item">
                        <div  class="label">链接信息</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 160px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="27d1e3cf-8401-45be-8314-37536d8409e1" class="ant-select-selection ant-select-selection--single"><div class="ant-select-selection__rendered">
                        <div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;"><i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div></div></div></div><div  class="terminal-oils public_global_scroll"><div  class="terminal-oil-box"><div  class="terminal-oil-item">
                          <div  class="oil-gun-num oil-option"><div  class="label">枪号</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 100px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="c6852c93-3658-4edc-9122-74ed150b2035" class="ant-select-selection ant-select-selection--single">
                          <div class="ant-select-selection__rendered"><div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div>
                        </div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                          <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div></div></div><div  class="oil-side-num oil-option">
                            <div  class="label">内面号</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 100px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="20662312-8377-489a-8036-72658284c070" class="ant-select-selection ant-select-selection--single"><div class="ant-select-selection__rendered"><div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div>
                          </div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                            <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                            </path></svg></i></span></div></div>
                          </div><div  class="oil-sort-num oil-option"><div  class="label">顺序号</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 100px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="f7b32eee-f3ed-47a1-9025-762186008ad5" class="ant-select-selection ant-select-selection--single"><div class="ant-select-selection__rendered"><div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;"><i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div></div></div></div><!----></div><div  class="tips" style="display: none;"></div><div  class="terminal-oil-add"><i  aria-label="图标: plus" class="anticon anticon-plus"><svg viewBox="64 64 896 896" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></i>&nbsp;继续添加</div>
                          </div></div><div  class="del-btn sleep" style="display: none;">删除</div></div><div  class="add-terminal">
                            <i  aria-label="图标: plus" class="anticon anticon-plus"><svg viewBox="64 64 896 896" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></i>&nbsp;新增终端</div>
                            <div  class="save-terminal">
                               <a-button type="primary">
                                保存
                              </a-button>
                             </div></div>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>

  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'business',
  components: {
    STable
  },
  data () {
    return {
      // 表头
      columns:[
        {
          dataIndex: '油品',
          title: '油品',
          key: '油品'
        },
         {
          dataIndex: '挂牌价',
          title: '挂牌价',
          key: '挂牌价'
        },
        {
          dataIndex: '生效时间',
          title: '生效时间',
          key: '生效时间'
        },
        {
          dataIndex: '状态',
          title: '状态',
          key: '状态'
        },
        {
          dataIndex: '操作员',
          title: '操作员',
          key: '操作员'
        },
         {
          dataIndex: '操作',
          title: '操作',
          key: '操作'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .save-terminal{
    padding-left:313px;
  }
.terminal-box .terminal-block .terminal-oils .terminal-oil-box .terminal-oil-item .label {
    margin-right: 16px;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-box .terminal-oil-item .oil-option {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-box .terminal-oil-item {
    height: 56px;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-add {
    height: 56px;
    line-height: 56px;
    padding-left: 25px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
}
.terminal-box .terminal-block .terminal-oils {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 24px 22px;
    overflow-y: scroll;
}
.terminal-box .terminal-block .terminal-info .terminal-info-item .label{
    margin-right: 16px;
}
.terminal-box .terminal-block .terminal-info .terminal-info-item{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.terminal-box .terminal-block .terminal-oils {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 24px 22px;
    overflow-y: scroll;
}
.terminal-box .terminal-block .terminal-info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 313px;
    padding: 20px 40px;
    background-color: #fafafa;
    border-right: 1px solid hsla(0,0%,87.8%,.5);
}
.terminal-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 278px;
    margin-bottom: 16px;
}
.terminal-box .terminal-block {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-right: 16px;
    border: 1px solid hsla(0,0%,87.8%,.5);
}
.terminal-content .tip, .vendor-hubs {
  margin-bottom: 16px;
}
.terminal-content {
    padding: 0 16px;
}
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.invoice-card-box{
  position: relative;
  height: 128px;
  width: 242px;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  .box-title{
    position: absolute;
    top: 30px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #3c3c46;
  }
  .box-content{
    position: absolute;
    top: 63px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .value{
      font-size: 34px;
      line-height: 34px;
      color: #040a46;
    }
    .unit {
      font-size: 12px;
      color: #040a46;
      margin-left: 5px;
      transform: translateY(-1px);
    }
  }
}
.customer-statistics{
  margin-top: 30px;
  width: 102%;
  .invoice-card-box{
    height: 108px;
    width: 271px;
    box-shadow: none;
    border: 1px solid #eaeaf4;
    .box-title{
      text-align: left;
      top: 24px;
      left: 24px;
    }
    .box-content{
      top: 49px;
      left: 24px;
      text-align: left;
      justify-content: start;
      .value{
        color: #37f;
      }
    }
  }
}
.filterContentContainer{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .screen{
    font-size: 12px;
    line-height: 22px;
    min-height: 40px;
    display: flex;
    align-items: center;
    .screen-li {
      display: inline-block;
      width: 48px;
      height: 24px;
      line-height: 24px;
      margin-right: 20px;
      text-align: center;
      color: #040a46;
      font-size: 12px;
      cursor: pointer;
      &.active{
        background-color: #ecf3ff;
        border-radius: 3px;
        color: #3c85ff;
      }
    }
  }
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: 60px;
  margin-top: 20px;
}

.current-exprot{
  border-color: #81a8f7;
  color: #81a8f7;
  margin-left: 15px;
}
.label-left{
  width:100px;
  text-align: right;
  margin-right:20px;
}
.list-wrap{
  margin:30px 0;
}
.line{
  height:1px;
  background:#ccc;
}
main .gunList-wrap {
  margin-top: 10px;
  display: grid;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: repeat(auto-fill,128px);
}
main .gun-item {
    min-width: 128px;
    height: 70px;
    border: 1px solid #eaeaf4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    padding: 10px 0;
    text-align: center;
}
main .gun-item .radio-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 5px;
    left: 5px;
    border: 1px solid #ddd;
    border-radius: 2px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
main .gun-item .radio-icon .anticon svg {
    width: 8px;
    height: 8px;
}
main .gun-item .item-name{
    font-size: 20px;
}
main .gun-item span {
    display: block;
    margin: 0;
}
main .gun-item .item-type {
    font-size: 12px;
    color: #3c3c46;
}
main .gun-item span {
  display: block;
  margin: 0;
}
main .gun-item .mark-icon-open {
  border-top: 40px solid #ff8240;
}
main .gun-item .mark-icon {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 40px solid transparent;
}
main .gun-item span {
    display: block;
    margin: 0;
}
main .gun-item .mark-icon-tip {
    position: absolute;
    top: 4px;
    right: 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #fff;
    line-height: 17px;
}
</style>

