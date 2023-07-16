import request from "@/service/request"


//获取首页数据
export async function ReportedData() {
    return request({
        url: '/statistics/reporte',
        method: 'get',
    })
}


