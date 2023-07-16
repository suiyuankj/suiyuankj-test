import React, { useState } from 'react';
import { Button, Table, Input } from '@arco-design/web-react';

type InputAttr = {
    key: number;
    name: string;
    val: string;
};

type OutAttr = {
    name: string;
    val: string;
};


function Parameters(param: any) {
    var paramData = []
    let k = 0;
    const inputAttrArray: InputAttr[] = [];
    if(param.data){
        paramData= param.data
        paramData.forEach(d=>{
            inputAttrArray.push({
                key: k++,
                name: d.name,
                val: d.val
            });
        })
    }
    const [count, setCount] = useState(k);
    const [data, setData] = useState<InputAttr[]>(inputAttrArray);
    const [outData, setOutData] = useState<OutAttr[]>(paramData);

    // 修改参数名称
    const handleNameChange = (value: string, key: number) => {
        setData((prevData) =>
            prevData.map((item) => (item.key === key ? { ...item, name: value } : item))
        );
    };

    // 修改参数值
    const handleValueChange = (value: string, key: number) => {
        setData((prevData) =>
            prevData.map((item) => (item.key === key ? { ...item, val: value } : item))
        );
    };

    // 计算输出的值
    const calculateOutData = () => {
        const result: OutAttr[] = data.map((item) => {
            return {
                name: item.name,
                val: item.val,
            };
        });
        setOutData(result);
        param.update(result)
    };

    // 移除行
    const removeRow = (key: number) => {
        setData((prevData) => prevData.filter((item) => item.key !== key));
    };

    // 添加一行
    const addRow = () => {
        setCount((prevCount) => prevCount + 1);
        setData((prevData) =>
            prevData.concat({
                key: count + 1,
                name: '',
                val: '',
            })
        );
    };

    const columns = [
        {
            title: '参数名称',
            dataIndex: 'name',
            width: "200px",
            render: (_, record: InputAttr) => (
                <Input
                    style={{ width: "100%" }}
                    placeholder='请输入参数名称'
                    value={record.name}
                    onChange={(e) => handleNameChange(e, record.key)}
                    onBlur={() => {

                        calculateOutData();
                       
                    }}
                />
            ),
        },
        {
            title: '参数值',
            dataIndex: 'value',
            render: (_, record: InputAttr) => (
                <Input
                    style={{ width: "100%" }}
                    placeholder='请输入参数值'
                    value={record.val}
                    onChange={(e) => handleValueChange(e, record.key)}
                    onBlur={() => {
                        calculateOutData();
                    }}
                />
            ),
        },
        {
            title: '操作',
            width: "100px",
            render: (_, record: InputAttr) => (
                <Button onClick={() => {
                    removeRow(record.key)
                    param.update(data)
                }} type='primary' status='danger'>
                    删除
                </Button>
            ),
        },
    ];

    return (
        <>
            <Button
                style={{ marginBottom: 10 }}
                type='primary'
                onClick={addRow}
            >
                添加参数
            </Button>
            <Table
                data={data}
                virtualized
                scroll={{
                    y: 670
                }}
                pagination={false}
                columns={columns}
            />
        </>
    );
}

export default Parameters;