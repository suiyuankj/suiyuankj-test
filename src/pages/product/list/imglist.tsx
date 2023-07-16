import { Card, Upload } from "@arco-design/web-react";
import React, { useEffect } from "react";


{/* <Card style={{ width: "99%" }}
bordered={true}
title='上传图片'
extra={<Link>More</Link>}
>
</Card> */}


function ImgList(param: any) {
    const uploadRef = React.useRef();
    //初始化
    useEffect(() => {
        console.log("添加图片")
    }, []);
    return (
        <Card style={{ width: "99%", height: "540px" }}
            bordered={true}
            title='图片管理'
            extra={<Upload
                ref={uploadRef}
                multiple
                autoUpload={false}
                action='/' />}

        >
        </Card>
    )
}

export default ImgList;