import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal,Notification} from '@arco-design/web-react';
import { AdminRolesPage,DelAdminRoles } from '@/service/admin';
import AddRoles from './add'
import EditRoles from './edit'

function Roles() {

  const [data, setData] = React.useState<API.Roles[]>([]);


  //初始化
  useEffect(() => {
    finish()
  }, []);

  const finish = () => {
    AdminRolesPage().then(rec => {
      setData(rec.data)
    })
  }
  //删除角色
  const delRoles = (rolesID:number,rolesName:string) => {
    Modal.confirm({
      title: '删除《' + rolesName + '》角色',
      content:
        '删除提示：删除角色不能有角色赋值到账号中！',
      okText: '确认删除',
      cancelText: '关闭',
      onOk: async () => {
        var delrec = await DelAdminRoles(rolesID)
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
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      width: '120px',
      render: (name, record) => {
        return (
          <>
            {record.name}
          </>
        )
      }
    },
    {
      title: '角色权限',
      dataIndex: 'menus_id',
      render: (menus_id, record) => {
        return (
          <>
            {menus_id.map((v: any, key: any) => {
              if (v.children == null) {
                return (
                  <div key={key} style={{ marginTop: "10px" }}>
                    <Tag bordered color='blue'>{v.name}</Tag>
                  </div>
                )
              } else {
                return (
                  <div key={key}>
                    <Tag bordered color='blue'>{v.name}</Tag>
                    {v.children.map((vc: any,kc:any) => (
                      <Tag key={kc} color='orange'>{vc.name}</Tag>
                    ))}
                  </div>
                )
              }
            })}
          </>
        )
      }
    },
    {
      title: '创建时间',
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
      width: '100px',
      render: (_, record) => (
        <>
          <div style={{ display: "flex" }}>
            <EditRoles Finish={finish} id={record.id} ></EditRoles>
            <Button  onClick={()=>delRoles(record.id,record.name)} type="text" size="small" status='danger'>
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
            <AddRoles Finish={finish}></AddRoles>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} data={data} pagination={false} />
      </div>
    </Card>
  );
}

export default Roles;
