import React, { useEffect } from 'react';
import { Typography, Card, Grid, Space, Button, TableColumnProps, Table, Tag, Modal, Notification, Input } from '@arco-design/web-react';
import { UserList, DelUser } from '@/service/user';
import AddUser from './add'
import EditUser from './edit'
import Password from './password'
import { IconSearch } from '@arco-design/web-react/icon';

function User() {
    const [data, setData] = React.useState<API.User[]>([]);
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
        UserList({
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
        var rec = await UserList({
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


    //删除用户
    const delUser = (paramId: number, paramName: string) => {
        Modal.confirm({
            title: '删除《' + paramName + '》用户',
            content:
                '删除提示：删除用户后，对应的数据会变化，谨慎操作！',
            okText: '确认删除',
            cancelText: '关闭',
            onOk: async () => {
                var delrec = await DelUser(paramId)
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
                finish()
            }
        });
    }



    const onChangeTable = async (pagination) => {
        const { current, pageSize } = pagination;
        setLoading(true);
        var rec = await UserList({
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
            title: 'ID',
            dataIndex: 'id',
            width: '80px',
            fixed: 'left',

        },
        {
            title: '姓名昵称',
            dataIndex: 'nickname',
            width: '120px',
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
                                var rec = await UserList({
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
            render: (vue) => {
                return (
                    <div>
                        <div>{vue}</div>
                    </div>
                )
            },
        },
        {
            title: '身份',
            dataIndex: 'identity',
            width: '80px',
        
            render: (vue) => {
                console.log("vue", vue)
                switch (vue) {
                    case 0:
                        return (
                            <Tag color='blue'>游客</Tag >
                        )
                        break;
                    case 1:
                        return (
                            <Tag color='blue'>个人用户</Tag >
                        )
                        break;
                    case 2:
                        return (
                            <Tag color='red'>企业用户</Tag >
                        )
                        break;
                }
            },
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: '80px',
            render: (vue) => {
                console.log("vue", vue)
                switch (vue) {
                    case 0:
                        return (
                            <Tag color='blue'>未知</Tag >
                        )
                        break;
                    case 1:
                        return (
                            <Tag color='blue'>男</Tag >
                        )
                        break;
                    case 2:
                        return (
                            <Tag color='red'>女</Tag >
                        )
                        break;
                }
            },
        },
        {
            title: '出生日期',
            dataIndex: 'birth',
            width: '120px',
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            width: '150px',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: '150px',
        },
        {
            title: '微信',
            dataIndex: 'wechat',
            width: '150px',
        },
        {
            title: '工作状态',
            dataIndex: 'job_status',
            width: '100px',
            render: (vue) => {
                switch (vue) {
                    // 0：不考虑找工作，1找工作中
                    case 0:
                        return (
                            <Tag color='red'>不考虑找工作</Tag >
                        )
                        break;
                    case 1:
                        return (
                            <Tag color='blue'>找工作中</Tag >
                        )
                        break;
                }
            },
        },
        {
            title: '简历状态',
            dataIndex: 'personal_status',
            width: '100px',
            render: (vue) => {
                switch (vue) {
                    // 0：不考虑找工作，1找工作中
                    case 0:
                        return (
                            <Tag color='red'>不显示</Tag >
                        )
                        break;
                    case 1:
                        return (
                            <Tag color='blue'>显示中</Tag >
                        )
                        break;
                }
            },
        },
        {
            title: '企业状态',
            dataIndex: 'company_status',
            width: '100px',
            render: (vue) => {
                switch (vue) {
                    // 0：不考虑找工作，1找工作中
                    case 0:
                        return (
                            <Tag color='red'>未认定</Tag >
                        )
                        break;
                    case 1:
                        return (
                            <Tag color='blue'>企业</Tag >
                        )
                        break;
                }
            },
        },
        {
            title: '更新时间',
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
            title: '助理',
            dataIndex: 'assistant_name',
            width: '100px',
            render: (state,data) => {
                if (data.assistant_id == 0) {
                    return (
                        <Tag color='red'>未分配</Tag >
                    )
                } else {
                    return (
                        <Tag color='blue'>{state}</Tag >
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
                    <div style={{ display: "flex" }}>
                        <Password id={record.id} nick_name={record.nick_name} Finish={finish}></Password>
                        <EditUser id={record.id} nick_name={record.nick_name} Finish={finish}></EditUser>

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
                        用户管理
                    </Typography.Title>
                </Grid.Col>
                <Grid.Col span={8} style={{ textAlign: 'right' }}>
                    <Space>
                        <AddUser Finish={finish}></AddUser>
                    </Space>
                </Grid.Col>
            </Grid.Row>

            <div style={{ marginTop: "20px" }}>
                <Table
                    columns={columns}
                    data={data}
                    pagination={{
                        sizeCanChange: true,
                        showTotal: true,
                        total: total,
                        pageSize: pageSize,
                        current: current,
                        pageSizeChangeResetCurrent: true,
                    }}
                    scroll={{
                        x: true,
                        y: true,
                      }}
                    onChange={onChangeTable}
                />
            </div>
        </Card>
    );
}

export default User;
