import request from "@/service/request"


//查询来客账号ID
export async function CheckId(data: string) {
    return request({
        url: '/merchant/check_id',
        method: 'post',
        data: {
            merchant_id:data
        },
    })
}0
//全球逆地理编码
export async function ReverseGeocoding(lng: string,lat: string) {
    return request({
        url: '/merchant/reverse_geocoding',
        method: 'post',
        data: {
            longitude:lng,
            latitude:lat,
        },
    })
}

//商家列表
export async function GetMerchantAll() {
    return request({
        url: '/merchant/all',
        method: 'get',
    })
}


//来客商家列表
export async function GetLaikeMerchant() {
    return request({
        url: '/merchant/api',
        method: 'get',
    })
}

//商家列表
export async function GetMerchantList(page: API.Page) {
    return request({
        url: '/merchant/list',
        method: 'get',
        params: page,
    })
}

//添加商家
export async function MerchantAdd(data: API.Merchant) {
    return request({
        url: '/merchant/add',
        method: 'post',
        data: data,
    })
}
// 获取详情
export async function MerchantDetail(id: number) {
    return request({
        url: '/merchant/detail',
        method: 'get',
        params: {
            id: id
        },
    })
}

//编辑商家
export async function MerchantEdit(data: API.Merchant) {
    return request({
        url: '/merchant/edit',
        method: 'put',
        data: data,
    })
}



// 删除
export async function MerchantDel(id: number) {
    return request({
        url: '/merchant/del',
        method: 'delete',
        data: {
            id: id
        },
    })
}