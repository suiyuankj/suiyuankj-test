import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal, Notification,Image } from '@arco-design/web-react';
import AddSlides from './add';
import EditType from './edit';
import { GetTypeList, TypeDel } from '@/service/product';
import { GetSlidesList } from '@/service/slides';

function SlidesList() {
  const [data, setData] = React.useState<API.Slides[]>([]);
  //初始化
  useEffect(() => {
    finish()
  }, []);

  const finish = () => {
    GetSlidesList({}).then(rec => {
      setData(rec.data.list)
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
    {
      title: '图片',
      dataIndex: 'images',
      width: '190px',
      render: (rec) => {
        return(<Image height={"90px"} width={"190px"} src={rec} ></Image>)
      },
    },
    {
      title: '名称',
      dataIndex: 'slides_name',
      width: '120px',
    },
    {
      title: '发布类型',
      dataIndex: 'type',
      width: '120px',
      render: (state) => {
        if (state == 1) {
          return (
            <Tag color='blue'>商家</Tag >
          )
        } else {
          return (
            <Tag color='red'>平台</Tag >
          )
        }
      },
    },
    {
      title: '访问路径地址',
      dataIndex: 'path',
      width: '120px',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: '80px',
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
    <Card >
      <Grid.Row justify="space-between" align="center">
        <Grid.Col span={16}>
          <Typography.Title heading={6}>
            首页幻灯片管理
          </Typography.Title>
        </Grid.Col>
        <Grid.Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <AddSlides Finish={finish}></AddSlides>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} data={data}/>
      </div>
    </Card>
  );
}

export default SlidesList;
