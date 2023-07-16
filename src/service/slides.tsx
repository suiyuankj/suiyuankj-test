import request from "@/service/request"
//
export async function GetSlidesList(page: API.Page) {
    return request({
        url: '/slides/list',
        method: 'get',
        params: page,
    })
}

//添加
export async function SlidesAdd(data: API.Slides) {
    return request({
        url: '/slides/add',
        method: 'post',
        data: data,
    })
}