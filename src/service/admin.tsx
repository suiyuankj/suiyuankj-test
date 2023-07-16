import request from "@/service/request"

//添加菜单
export async function PageAdmin() {
    return request({
        url: '/admin/page_list',
        method: 'get',
    })
}


//注册用户
export async function RegAdmin(data: API.Admin) {
    return request({
        url: '/admin/reg',
        method: 'post',
        data: data,
    })
}

//修改用户
export async function EditAdminAccount(data: API.Admin) {
    return request({
        url: '/admin/edit',
        method: 'put',
        data: data,
    })
}


//获取详情
export async function AdminDetails(id: number) {
    return request({
        url: '/admin/detail',
        method: 'get',
        params: {
            id: id
        },
    })
}


// 删除用户
export async function DelAdmin(id: number) {
    return request({
        url: '/admin/del',
        method: 'delete',
        data: {
            id: id
        },
    })
}

//菜单

/* 获取菜单列表 */
export async function AdminMenusList() {
    return request({
        url: '/admin_menus/list',
        method: 'get',
    })
}

/* 获取菜单详情 */
export async function AdminMenusDetails(id: number) {
    return request({
        url: '/admin_menus/detail',
        params: {
            id: id
        },
        method: 'get',
    })
}

/* 获取后台图标 */
export async function AdminMenusIcon() {
    return request({
        url: '/admin_menus/icon',
        method: 'get',
    })
}

/* 获取后台一级目录 */
export async function AdminMenusOne() {
    return request({
        url: '/admin_menus/sel',
        method: 'get',
    })
}

/* 获取后台层级 */
export async function AdminMenusLevel() {
    return request({
        url: '/admin_menus/level',
        method: 'get',
    })
}


//添加菜单
export async function AddAdminMenus(data: API.Menus) {
    return request({
        url: '/admin_menus/add',
        method: 'post',
        data: data,
    })
}

//编辑菜单
export async function EditAdminMenus(data: API.Menus) {
    return request({
        url: '/admin_menus/edit',
        method: 'put',
        data: data,
    })
}
// 删除菜单
export async function DelAdminMenus(id: number) {
    return request({
        url: '/admin_menus/del',
        method: 'delete',
        data: {
            id: id
        },
    })
}

//权限

/* 获取权限列表 */
export async function AdminRolesPage() {
    return request({
        url: '/admin_roles/pages',
        method: 'get',
    })
}

export async function AdminRolesSel() {
    return request({
        url: '/admin_roles/sel_list',
        method: 'get',
    })
}


//添加角色
export async function AddAdminRoles(data: API.Roles) {
    return request({
        url: '/admin_roles/add',
        method: 'post',
        data: data,
    })
}

/* 获取角色详情 */
export async function AdminRolesDetails(id: number) {
    return request({
        url: '/admin_roles/detail',
        params: {
            id: id
        },
        method: 'get',
    })
}

//编辑角色
export async function EditAdminRoles(data: API.Roles) {
    return request({
        url: '/admin_roles/edit',
        method: 'put',
        data: data,
    })
}

// 删除角色
export async function DelAdminRoles(id: number) {
    return request({
        url: '/admin_roles/del',
        method: 'delete',
        data: {
            id: id
        },
    })
}
