import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

function Category(param: any) {
    const chartRef =useRef()
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };

    //初始化
    useEffect(() => {
        const char = echarts.init(chartRef.current)
        char.setOption(option)
        return ()=>{
            char.dispose
        }
    }, []);


    return (
        <div>
            <div style={{width:"100%",height:"550px"}} ref={chartRef}></div>
        </div>
    );
}

export default Category;