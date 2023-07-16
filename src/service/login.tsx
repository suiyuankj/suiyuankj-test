import request from "@/service/request"


/* 后台账号密码登录 */
export async function AdminLogin(data: API.Admin) {
    return request({
        url: '/account/login',
        method: 'post',
        data: data,
    })
}

/* 获取权限菜单 */
export async function GetMenus() {
    return request({
        url: '/base/user_menus',
        method: 'get',
    })
}


/* 刷新token */
export async function RefreshToken() {
    return request({
        url: '/base/refresh_token',
        method: 'get',
    })
}

//企业微信登录
export async function QyWxOauth2() {
    return request({
        url: '/account/oauth2',
        method: 'get',
    })
}

//企业微信登录Token
export async function GetWxUserInfo(code:string) {
    return request({
        url: '/account/wx_user_info',
        method: 'get',
        params: {
            code:code
        },
    })
}