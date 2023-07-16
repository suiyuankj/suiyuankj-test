import { GetMerchantAll } from '@/service/merchant';
import { Table, TableColumnProps } from '@arco-design/web-react';
import React, { useEffect, useRef } from 'react';


function Merchant(param: any) {
    var paramData:any =[]
    if(param.data){
       paramData = param.data
    }
    
    const [type, setType] = React.useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<number[]>(paramData);
    const [data, setData] = React.useState<API.Merchant[]>([]);
    const chartRef = useRef()


    const columns: TableColumnProps[] = [
        {
            title: '店铺名称',
            dataIndex: 'shop_name',
            width: "180px",
        },
        {
            title: '联系人',
            dataIndex: 'name',
            width: "150px",
            render: (state, rec) => (
                <div key={rec.id}>
                    <div style={{ fontWeight: "600" }} key={"city_" + rec.id}>{rec.name}</div>
                    <div style={{ color: "#666" }} key={"address_" + rec.id}>{rec.phone}</div>
                </div>
            ),
        },
        {
            title: '所在地区',
            dataIndex: 'city',

            render: (state, rec) => (
                <div key={rec.id}>
                    <div key={"city_" + rec.id}>{rec.province_name} . {rec.city_name} . {rec.district_name} </div>
                    <div key={"address_" + rec.id}>{rec.address}</div>
                </div>
            ),
        },
    ];


    //初始化
    useEffect(() => {
        GetMerchantAll().then(e => {
            setData(e.data)
        })
    }, []);


    return (
        <div>
            <Table
                columns={columns}
                data={data}
                virtualized
                scroll={{
                    y: 670
                }}
                pagination={false}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (selKey) => {
                        setSelectedRowKeys(selKey);
                        param.onChange(selKey)
                    },
                }}
            />
        </div>
    );
}

export default Merchant;