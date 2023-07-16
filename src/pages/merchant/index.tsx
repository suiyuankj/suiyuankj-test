import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal, Notification, Input } from '@arco-design/web-react';
import { DepartmentList } from '@/service/user';
import AddDepartment from './add'
import EditDepartment from './edit'
import { IconSearch } from '@arco-design/web-react/icon';
import { GetMerchantList } from '@/service/merchant';

function Department() {
  const [data, setData] = React.useState<API.Merchant[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [current, setCurrent] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const inputRef = React.useRef(null);

  const [pagination, setPagination] = React.useState({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });

  //初始化
  useEffect(() => {
    GetMerchantList({
      current: current,
      pageSize: pageSize,
      search: search,
    }).then(rec => {
      setData(rec.data.list)
      setTotal(rec.data.count)
    })
  }, []);

  const finish = async () => {
    //刷新页面
    setLoading(true);
    var rec = await GetMerchantList({
      current: current,
      pageSize: pageSize,
      search: search,
    })
    setData(rec.data.list)
    setTotal(rec.data.count)
    setCurrent(current)
    setPageSize(pageSize)
    setLoading(false);
  }


  //删除菜单
  const delVersion = (paramId: number, paramName: string) => {
    Modal.confirm({
      title: '删除《' + paramName + '》版本',
      content:
        '删除提示：顶级版本内不能有信息，否则删除失败！',
      okText: '确认删除',
      cancelText: '关闭',
      onOk: async () => {
        // var delrec = await DelVersion(paramId)
        // if (delrec.status) {
        //   Notification.success({
        //     title: '删除成功',
        //     content: '',
        //   })
        // } else {
        //   Notification.warning({
        //     title: '删除失败！',
        //     content: '请检查是否有误，或者刷新页面重新填写提交试试!',
        //   })
        // }
        // finish()
      }
    });
  }

  const onChangeTable = async (pagination) => {
    const { current, pageSize } = pagination;
    setLoading(true);
    var rec = await DepartmentList({
      current: current,
      pageSize: pageSize,
      search: search,
    })
    setData(rec.data.list)
    setTotal(rec.data.count)
    setCurrent(current)
    setPageSize(pageSize)
    setLoading(false);
  }


  const columns: TableColumnProps[] = [

    {
      title: '店铺名称',
      dataIndex: 'shop_name',
      width: '180px',
      fixed: 'left',
      filterIcon: <IconSearch />,
      filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        return (
          <div className='arco-table-custom-filter'>
            <Input.Search
              ref={inputRef}
              searchButton
              placeholder='输入搜索名称'
              value={filterKeys[0] || ''}
              onChange={async (value) => {
                setFilterKeys(value ? [value] : []);
                setSearch(value)
                setLoading(true);
                var rec = await DepartmentList({
                  current: 1,
                  pageSize: pageSize,
                  search: value,
                })
                setData(rec.data.list)
                setTotal(rec.data.count)
                setCurrent(current)
                setPageSize(pageSize)
                setLoading(false);
              }}
              onSearch={() => {
                confirm();
              }}
            />
          </div>
        );
      },
    },
    {
      title: '账号',
      dataIndex: 'account',
      width: '150px',
    },
    {
      title: '联系人',
      dataIndex: 'name',
      width: '120px',

    },
    {
      title: '联系人电话',
      dataIndex: 'phone',
      width: '150px',

    },
    {
      title: '店铺地址',
      dataIndex: 'address',
      width: '300px',
      render: (state, rec) => (
        <div key={rec.id}>
          <div key={"city_" + rec.id}>{rec.province_name} . {rec.city_name} . {rec.district_name} </div>
          <div key={"address_" + rec.id}>{rec.address}</div>
        </div>
      ),
    },

    {
      title: '总营业额',
      dataIndex: 'total_revenue',
      width: '100px',
      render: (state) => (
        <div>
          {state} RMB
        </div>
      ),
    },
    {
      title: '剩余资产',
      dataIndex: 'wallet',
      width: '100px',
      render: (state) => (
        <div>
          {state} RMB
        </div>
      ),
    },
    {
      title: '订单数量',
      dataIndex: 'order_count',
      width: '100px',
      render: (state) => (
        <div>
          {state} 单
        </div>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'create_time',
      width: '160px',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80px',
      render: (state, index) => {
        if (state == 1) {
          return (
            <Tag key={index.id} color='blue'>激活</Tag >
          )
        } else {
          return (
            <Tag key={index.id} color='red'>失效</Tag >
          )
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      fixed: 'right',
      render: (_, record) => (
        <>
          <div key={record.id} style={{ display: "flex" }}>
            <EditDepartment Finish={finish} id={record.id}></EditDepartment>
            <Button onClick={() => delVersion(record.id, record.name)} type="text" size="small" status='danger'>
              删除
            </Button>
          </div>
        </>
      ),
    },
  ];


  return (
    <Card>
      <Grid.Row justify="space-between" align="center">
        <Grid.Col span={16}>
          <Typography.Title heading={6}>
            商家管理
          </Typography.Title>
        </Grid.Col>
        <Grid.Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <AddDepartment Finish={finish}></AddDepartment>
          </Space>
        </Grid.Col>
      </Grid.Row>

      <div style={{ marginTop: "20px" }}>
        <Table
          columns={columns}
          data={data}
          scroll={{
            x: 1500,
          }}
          pagination={{
            sizeCanChange: true,
            showTotal: true,
            total: total,
            pageSize: pageSize,
            current: current,
            pageSizeChangeResetCurrent: true,
          }}
          onChange={onChangeTable}
        />
      </div>
    </Card>
  );
}

export default Department;
