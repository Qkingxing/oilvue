
<template>
  <div>
    <div class="set-common-wrap">
     
      <div class="form-wrap">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="生效中">
           
          
        
           
          </a-tab-pane>
          <a-tab-pane key="22" tab="待开始">
                
          </a-tab-pane>
           <a-tab-pane key="2" tab="已开始">
               
          </a-tab-pane>
          
        </a-tabs>
         <a-table :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a>Invite 一 {{ record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
            </span>
          </a-table>
           <a-pagination size="small" :total="50" show-size-changer show-quick-jumper />
      </div>
     
     
    </div>
  </div>
</template>

<script>
export default {
    name: 'Basis',
     data: () => ({
        data:[],
        start:[
        {
          dataIndex: '业务类型',
          title: '业务类型',
          key: '业务类型'
        },
         {
          dataIndex: '支付方式',
          title: '支付方式',
          key: '支付方式'
        },
        {
          dataIndex: '生效时间',
          title: '生效时间',
          key: '生效时间'
        },
        {
          dataIndex: '普通受理规则',
          title: '普通受理规则',
          key: '普通受理规则'
        },
        {
          dataIndex: '特殊受理规则',
          title: '特殊受理规则',
          key: '特殊受理规则'
        },
         {
          dataIndex: '操作人',
          title: '操作人',
          key: '操作人'
        },
         {
          dataIndex: '操作',
          title: '操作',
          key: '操作'
        }
      ],
      columns:[
        {
          dataIndex: '业务类型',
          title: '业务类型',
          key: 'name'
        },
         {
          dataIndex: '支付方式',
          title: '支付方式',
          key: '支付方式'
        },
        {
          dataIndex: '生效时间',
          title: '生效时间',
          key: '生效时间'
        },
        {
          dataIndex: '普通受理规则',
          title: '普通受理规则',
          key: '普通受理规则'
        },
        {
          dataIndex: '特殊受理规则',
          title: '特殊受理规则',
          key: '特殊受理规则'
        },
         {
          dataIndex: '操作人',
          title: '操作人',
          key: '操作人'
        },
         {
          dataIndex: '操作',
          title: '操作',
          key: '操作'
        }
      ],
       lastIndex:'12/20',
       number:{},
      formItemLayout: {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ]
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  methods: {
     
  }
}
</script>
<style scoped>
  .set-common-wrap{
    background:#fff;
    padding:10px 20px;
    margin:20px auto;
  }


  .form-wrap{
    padding:30px 0;
  }
</style>


