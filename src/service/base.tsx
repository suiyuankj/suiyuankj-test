import request from "@/service/request"


//上传图片
export async function UpImg(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return request({
        url: '/base/upimg',
        method: 'post',
        headers:{
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    })
    
}

// 获取省市区数据
export async function RegionCascade() {
    return request({
        url: '/base/region_cascade',
        method: 'get',
    })
}
