import request from "@/service/request"


//
export async function GetProductList() {
    return request({
        url: '/product/product_list',
        method: 'get',
    })
}

//添加产品
export async function ProductAdd(data: API.Product) {
    return request({
        url: '/product/product_add',
        method: 'post',
        data: data,
    })
}
// 
export async function ProductDetail(id:number) {
    return request({
        url: '/product/product_detail',
        method: 'get',
        params: {
            id: id
        },
    })
}

//编辑产品分类
export async function ProductEdit(data: API.Product) {
    return request({
        url: '/product/product_edit',
        method: 'put',
        data: data,
    })
}

//
export async function GetTypeList() {
    return request({
        url: '/product/type_list',
        method: 'get',
    })
}



//添加产品分类
export async function TypeAdd(data: API.ProductType) {
    return request({
        url: '/product/type_add',
        method: 'post',
        data: data,
    })
}

// 
export async function GetTypeDetail(id:number) {
    return request({
        url: '/product/type_detail',
        method: 'get',
        params: {
            id: id
        },
    })
}

//添加产品分类
export async function TypeEdit(data: API.ProductType) {
    return request({
        url: '/product/type_edit',
        method: 'put',
        data: data,
    })
}

// 删除分类
export async function TypeDel(id: number) {
    return request({
        url: '/product/type_del',
        method: 'delete',
        data: {
            id: id
        },
    })
}

//同步到来客
export async function LkSync(id:number) {
    return request({
        url: '/product/lk_sync',
        method: 'get',
        params: {
            id: id
        },
    })
}
// 