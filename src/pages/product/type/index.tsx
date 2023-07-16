import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal, Notification } from '@arco-design/web-react';
import AddType from './add';
import EditType from './edit';
import { GetTypeList, TypeDel } from '@/service/product';

function TypeList() {
  const [data, setData] = React.useState<API.ProductType[]>([]);
  //初始化
  useEffect(() => {
    finish()
  }, []);

  const finish = () => {
    GetTypeList().then(rec => {
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
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
    },
    // {
    //   title: '图标',
    //   dataIndex: 'cover',
    // },
    {
      title: '分类名称',
      dataIndex: 'type_name',
    },
    // {
    //   title: '广告图',
    //   dataIndex: 'banner',
    // },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: '180px',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      width: '180px',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '100px',
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
      width: '250px',
      render: (_, record) => (
        <>
          <div style={{ display: "flex" }}>
            <EditType Finish={finish} id={record.id} ></EditType>
            <Button onClick={() => delRoles(record.id, record.type_name)} type="text" size="small" status='danger'>
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
            商品分类
          </Typography.Title>
        </Grid.Col>
        <Grid.Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <AddType Finish={finish}></AddType>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} data={data} pagination={false}/>
      </div>
    </Card>
  );
}

export default TypeList;
