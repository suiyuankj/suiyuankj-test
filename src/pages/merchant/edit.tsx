import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification, Tree, Radio, Select, Grid, Cascader } from '@arco-design/web-react';

import { DepartmentAdd, DepartmentAll } from '@/service/user';
import MapComponent from './map';
import { RegionCascade } from '@/service/base';
import { MerchantDetail, MerchantEdit } from '@/service/merchant';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Row = Grid.Row;
const Col = Grid.Col;


function EditMerchant(param: any) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    const [state, setState] = React.useState<number>(1);

    const [data, setData] = React.useState<API.Merchant>({});

    const [cityOptions, setCityOptions] = React.useState<API.Cascader[]>([]);
    const [provinceValue, setProvinceValue] = React.useState<number[]>([]);

    const [provinceId, setProvinceId] = React.useState<number>(0);
    const [cityId, setCityId] = React.useState<number>(0);
    const [districtId, setDistrictId] = React.useState<number>(0);

    const [mapLatLng, setMapLatLng] = React.useState<API.Latlng>({
        lat: 39.928216,
        lng: 116.402544,
    });


    //打开弹窗,并初始化
    const openModal = async () => {
        var cascade = await RegionCascade()
        setCityOptions(cascade.data)
        var detail = await MerchantDetail(param.id)
        setData(detail.data)
        setProvinceId(detail.data.province_id)
        setCityId(detail.data.city_id)
        setDistrictId(detail.data.district_id)
        setMapLatLng({
            lat: detail.data.latitude,
            lng: detail.data.longitude,
        })

        //初始化值
        setVisible(true)
    }





    //提交表单
    async function submitForm() {
        // 验证
        var validates = await form.validate();
        validates.id = param.id
        validates.province_id = provinceId
        validates.city_id = cityId
        validates.district_id = districtId

        validates.longitude = mapLatLng.lng
        validates.latitude = mapLatLng.lat
        validates.status = state

        MerchantEdit(validates).then(rec => {
            if (rec.status) {
                Notification.success({
                    title: '编辑商家成功',
                    content: '编辑《' + validates.shop_name + '》',
                })
                param.Finish();
                setVisible(false)
            } else {
                Notification.warning({
                    title: '编辑失败',
                    content: rec.msg,
                })
            }
        })
    }

    //关闭
    const cancelModal = () => {
        setVisible(false)
    }

    return (
        <div>
            <Button onClick={openModal} type='text' size="small" >
                编辑
            </Button>

            <Modal
                title='编辑商家'
                visible={visible}
                okText='添加'
                cancelText='关闭'
                style={{ width: "980px" }}
                onOk={submitForm}
                onCancel={cancelModal}
                maskClosable={false}
                unmountOnExit={true}
            >
                <Row className='grid-gutter-demo' gutter={24}>
                    <Col span={12}>
                        <Form form={form} autoComplete='off'
                            initialValues={{
                                merchant_id:data.merchant_id,
                                account: data.account,
                                shop_name: data.shop_name,
                                name: data.name,
                                phone: data.phone,
                                address: data.address,
                                status: data.status,
                            }}
                        >
                             <FormItem label='来客ID' field='merchant_id' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '抖音来客ID必须填写'
                                },
                            ]}>
                                <Input placeholder='请输入抖音来客ID' maxLength={32} />
                            </FormItem>

                            <FormItem label='登录账号' field='account' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '登录账号必须填写'
                                },
                            ]}>
                                <Input placeholder='请输入登录账号' maxLength={18} />
                            </FormItem>


                            <FormItem label='商家名称' field='shop_name' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '商家名称必须填写'
                                },
                            ]}>
                                <Input placeholder='请输入商家名称' maxLength={32} />
                            </FormItem>

                            <FormItem label='联系人' field='name' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '联系人必须填写'
                                },
                            ]}>
                                <Input placeholder='请输入联系人姓名' maxLength={11} />
                            </FormItem>
                            <FormItem label='联系手机' field='phone' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '联系手机必须填写'
                                },
                            ]}>
                                <Input placeholder='请输入联系人手机' maxLength={11} />
                            </FormItem>

                            <FormItem label='选择地区' >
                                <Cascader
                                    placeholder='选择地区 ...'
                                    style={{ width: "100%" }}
                                    options={cityOptions}
                                    defaultValue={[provinceId, cityId, districtId]}
                                    onChange={(value: any, option) => {
                                        setProvinceId(value[0])
                                        setCityId(value[1])
                                        setDistrictId(value[2])
                                        setMapLatLng({
                                            lat: option[2].lat,
                                            lng: option[2].lng,
                                        })
                                    }}
                                    showSearch
                                    allowClear
                                />
                            </FormItem>

                            <FormItem label='店铺地址' field='address' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '店铺地址必须填写'
                                },
                            ]}>
                                <Input placeholder='请输入店铺地址' maxLength={50} />
                            </FormItem>

                            <FormItem label='是否激活' field='status'>
                                <RadioGroup defaultValue={1}>
                                    <Radio value={0}>失效</Radio>
                                    <Radio value={1}>激活</Radio>
                                </RadioGroup>
                            </FormItem>

                        </Form>
                    </Col>
                    <Col span={12}>
                        <div>
                            <div style={{ marginBottom: "24px", fontSize: "15px", color: "#4e5969" }}>选择位置</div>
                            <MapComponent lat={mapLatLng.lat} lng={mapLatLng.lng}></MapComponent>
                        </div>
                    </Col>
                </Row>


            </Modal>
        </div>
    );
}

export default EditMerchant;