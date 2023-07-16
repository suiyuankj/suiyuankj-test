import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal, Notification, Image } from '@arco-design/web-react';
import AddType from './add';
import EditType from './edit';
import { GetProductList, LkSync, TypeDel } from '@/service/product';
import AddProduct from './add';

function TypeList() {
  const [data, setData] = React.useState<API.ProductType[]>([]);
  //初始化
  useEffect(() => {
    finish()
  }, []);

  const finish = () => {
    GetProductList().then(rec => {
      setData(rec.data)
    })
  }
  //删除角色
  const delRoles = (rolesID: number, name: string) => {
    Modal.confirm({
      title: '删除《' + name + '》分类',
      content:
        '删除提示：删除分类名称不能再产品中使用！',
      okText: '确认删除',
      cancelText: '关闭',
      onOk: async () => {
        var delrec = await TypeDel(rolesID)
        if (delrec.status) {
          Notification.success({
            title: '删除成功',
            content: '',
          })
        } else {
          Notification.warning({
            title: '删除失败！',
            content: '请检查是否存着使用，检查产品内容是否有选择当前分类!',
          })
        }
        //刷新页面
        finish()
      }
    });
  }

  const columns: TableColumnProps[] = [
    {
      title: '封面图',
      dataIndex: 'cover',
      width: "100px",
      render: (data, res) => {
        return (<Image height={"50px"} src={data}></Image>)
      }
    },
    {
      title: '商品服务名称',
      dataIndex: 'product_name',
      width: "180px",
    },
    {
      title: '商品编码',
      dataIndex: 'product_code',
      width: "120px",
    },
    {
      title: '所属类别',
      dataIndex: 'type_name',
      width: "120px",
    },
    {
      title: '价格',
      dataIndex: 'market_price',
      width: "160px",
      render: (data, res) => {
        return (<div>
          <div>
          销售价：
          <Tag color='red' style={{ marginRight: "8px" }}>{res.sale_price}RMB</Tag >
          </div>
          <div style={{marginTop:"8px"}}>
          市场价：
          <Tag color='blue'>{res.market_price}RMB</Tag >
          </div>
        </div>
        )

      },
    },

    {
      title: '真实销量',
      dataIndex: 'order_number',
      width: "100px",
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      width: '220px',
      render: (data, res) => {
        return (<div>
          <div>
          创建时间：
          <Tag color='red' style={{ marginRight: "8px" }}>{res.create_time}</Tag >
          </div>
          <div style={{marginTop:"8px"}}>
          更新时间：
          <Tag color='blue'>{res.update_time}</Tag >
          </div>
        </div>
        )

      },
    },
    // {
    //   title: '更新时间',
    //   dataIndex: 'update_time',
    //   width: '160px',
    // },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80px',
      fixed: 'right',
      render: (state) => {
        if (state == 1) {
          return (
            <Tag color='blue'>激活</Tag >
          )
        } else {
          return (
            <Tag color='red'>失效</Tag >
          )
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '330px',
      fixed: 'right',
      render: (_, record) => (
        <>
          <div style={{ display: "flex" }}>
            <Button type="text" size="small" status='warning' onClick={() => { }} >
              查看效果
            </Button>
            <Button type="text" size="small" status='success' onClick={() => {
              LkSync(record.id).then(e=>{
                console.log(e)
              })
            }} >
              同步更新
            </Button>
            <EditType Finish={finish} id={record.id} ></EditType>
            <Button type="text" size="small" status='danger' onClick={() => delRoles(record.id, record.type_name)} >
              删除
            </Button>
          </div>
        </>
      ),
    },
  ];


  return (
    <Card style={{ height: '80vh' }}>
      <Grid.Row justify="space-between" align="center">
        <Grid.Col span={16}>
          <Typography.Title heading={6}>
            商品管理
          </Typography.Title>
        </Grid.Col>
        <Grid.Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <AddProduct Finish={finish}></AddProduct>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} data={data} scroll={{
          x: 1550,
        }} />
      </div>
    </Card>
  );
}

export default TypeList;
