import request from "@/service/request"


//获取部门所有数据
export async function DepartmentList(page: API.Page) {
    return request({
        url: '/depart/page_all',
        method: 'get',
        params: page,
    })
}

//获取部门所有数据
export async function DepartmentAll() {
    return request({
        url: '/depart/all',
        method: 'get',
    })
}

//获取部门单条数据
export async function DepartmentDetails(id:number) {
    return request({
        url: '/depart/detail',
        method: 'get',
        params: {
            id:id
        },
    })
}


//添加部门
export async function DepartmentAdd(data: API.Department) {
    return request({
        url: '/depart/add',
        method: 'post',
        data: data,
    })
}

//编辑部门
export async function DepartmentEdit(data: API.Department) {
    return request({
        url: '/depart/edit',
        method: 'post',
        data: data,
    })
}


//获取上报用户所有数据
export async function UserList(page: API.Page) {
    return request({
        url: '/user/page_all',
        method: 'get',
        params: page,
    })
}

//重置密码
export async function Password(data: API.User) {
    return request({
        url: '/user/reset_password',
        method: 'put',
        data: data,
    })
}

//注册用户
export async function RegUser(data: API.User) {
    return request({
        url: '/user/add_user',
        method: 'post',
        data: data,
    })
}


//获取用户数据
export async function UserDetail(id:number) {
    return request({
        url: '/user/detail',
        method: 'get',
        params: {
            id:id
        },
    })
}


//重置密码
export async function EditUser(data: API.User) {
    return request({
        url: '/user/edit_user',
        method: 'put',
        data: data,
    })
}

// 删除用户
export async function DelUser(id: number) {
    return request({
        url: '/user/del_user',
        method: 'delete',
        data: {
            id: id
        },
    })
}