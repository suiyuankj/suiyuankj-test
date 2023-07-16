import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, Table, TableColumnProps, Tag, Modal, Notification } from '@arco-design/web-react';
import { AdminMenusList, DelAdminMenus } from '@/service/admin';
import AddMenus from './add'
import EditMenus from './edit'
import { getIconFromKey } from '@/icon'


function Menus() {
  const [data, setData] = React.useState<API.Menus[]>([]);

  //初始化
  useEffect(() => {
    finish()
  }, []);

  //完成刷新
  function finish() {
    AdminMenusList().then(rec => {
      setData(rec.data)
    })
  }


  //删除菜单
  const delMenu = (paramId: number, paramName: string) => {
    Modal.confirm({
      title: '删除《' + paramName + '》菜单',
      content:
        '删除提示：顶级目录不能有子目录，否则删除失败！',
      okText: '确认删除',
      cancelText: '关闭',
      onOk: async () => {
        var delrec = await DelAdminMenus(paramId)
        if(delrec.status){
          Notification.success({
            title: '删除成功',
            content: '',
          })
        }else{
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
      dataIndex: 'key',
      width: '140px',
    },
    {
      title: '类型',
      dataIndex: 'is_menu',
      width: '40px',
      render: (is_menu, record) => {
        return (
          <>
            {record.is_menu == 0 ? <Tag  color='arcoblue'>功能</Tag>:<Tag  color='red'>菜单</Tag>}
          </>
        )
      },
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: '200px',
      render: (name, record) => {
        return (
          <>
            {record.pid == 0 ? "" : getIconFromKey(record.icon)}
            {record.is_menu == 0 ? <Tag  color='arcoblue'> {record.name}</Tag>:record.name}
          </>
        )
      },
    },
 
    {
      title: '路径目录',
      dataIndex: 'path',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: '200px',
    },
    {
      title: '显示排序',
      dataIndex: 'sort',
      width: '150px',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '150px',
      render: (state) =>{
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
      width: '100px',
      render: (_, record) => (
        <>
          <div style={{ display: "flex" }}>
            <EditMenus Finish={finish} id={record.id} ></EditMenus>
            <Button  onClick={() => delMenu(record.id, record.name)} type="text" size="small" status='danger'>
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
            后台菜单管理
          </Typography.Title>
        </Grid.Col>
        <Grid.Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <AddMenus Finish={finish}></AddMenus>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} data={data} pagination={false} />
      </div>
    </Card>
  );
}

export default Menus;
