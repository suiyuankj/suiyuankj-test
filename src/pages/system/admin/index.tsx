import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal, Notification } from '@arco-design/web-react';
import { DelAdmin, PageAdmin } from '@/service/admin';
import AddAdmin from './add'
import EditAdmin from './edit'
import Password from './password'

function Admin() {
  const [data, setData] = React.useState<API.Admin[]>([]);
  //初始化
  useEffect(() => {
    finish()
  }, []);

  const finish = () => {
    PageAdmin().then(rec => {
      setData(rec.data)
    })
  }
  //删除角色
  const delRoles = (rolesID: number, rolesName: string) => {
    Modal.confirm({
      title: '删除《' + rolesName + '》角色',
      content:
        '删除提示：删除角色不能有角色赋值到账号中！',
      okText: '确认删除',
      cancelText: '关闭',
      onOk: async () => {
        var delrec = await DelAdmin(rolesID)
        if (delrec.status) {
          Notification.success({
            title: '删除成功',
            content: '',
          })
        } else {
          Notification.warning({
            title: '删除失败！',
            content: '请检查是否有误，或者刷新页面重新填写提交试试!',
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
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '账户',
      dataIndex: 'account',
    },
    {
      title: '邮箱地址',
      dataIndex: 'email',
    },
    {
      title: '权限',
      dataIndex: 'role',
      width: '120px',
      render: (root, record) => (
        <>
          <Tag bordered color='blue'>{root}</Tag>
        </>
      )
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
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
      // render: (_, record) =>{
      //   console.log("record",record.account)
      // }
      render: (_, record) => (
    
        <>
          <div style={{ display: "flex" }}>
            <EditAdmin Finish={finish} id={record.id} ></EditAdmin>
            <Password id={record.id} account={record.account}></Password>
            <Button onClick={() => delRoles(record.id, record.name)} type="text" size="small" status='danger'>
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
            后台管理员管理
          </Typography.Title>
        </Grid.Col>
        <Grid.Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <AddAdmin Finish={finish}></AddAdmin>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} data={data} />
      </div>
    </Card>
  );
}

export default Admin;
