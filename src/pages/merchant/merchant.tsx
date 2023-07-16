import { GetLaikeMerchant, ReverseGeocoding } from '@/service/merchant';
import { Button, Table, TableColumnProps } from '@arco-design/web-react';
import React, { useEffect, useRef } from 'react';


function MerchantApi(param: any) {
    var paramData: any = []
    if (param.data) {
        paramData = param.data
    }

    const [data, setData] = React.useState<API.Merchant[]>([]);
    const columns: TableColumnProps[] = [
        {
            title: '店铺ID',
            dataIndex: 'merchant_id',
            width: "210px",
        },
        {
            title: '店铺名称',
            dataIndex: 'shop_name',
            width: "250px",
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '选择操作',
            dataIndex: 'active',
            width: "120px",
            render: (state, rec) => (
                <div>
                    <Button type='primary' onClick={() => {
                        ReverseGeocoding(rec.longitude, rec.latitude).then(e => {
                            rec.province_name = e.data.province
                            rec.province_id = e.data.province_id
                            rec.city_name = e.data.city
                            rec.city_id = e.data.city_id
                            rec.district_name = e.data.district
                            rec.district_id = e.data.district_id
                            param.onClick(rec)
                        })
                    }}>选择</Button>
                </div>
            ),
        },
    ];


    //初始化
    useEffect(() => {
        GetLaikeMerchant().then(e => {
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
                    y: 470
                }}
                pagination={false}
            />
        </div>
    );
}

export default MerchantApi;