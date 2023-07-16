import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification, Tree, Radio, Select, Grid, Cascader } from '@arco-design/web-react';

import { DepartmentAdd, DepartmentAll } from '@/service/user';
import MapComponent from './map';
import { RegionCascade } from '@/service/base';
import { CheckId, MerchantAdd } from '@/service/merchant';
import Merchant from './merchant';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Row = Grid.Row;
const Col = Grid.Col;


function AddMerchant(param: any) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    const [cityOptions, setCityOptions] = React.useState<API.Cascader[]>([]);

    const [provinceId, setProvinceId] = React.useState<number>(0);
    const [cityId, setCityId] = React.useState<number>(0);
    const [districtId, setDistrictId] = React.useState<number>(0);

    const [address, setAddress] = React.useState<string>("");
    const [shopName, setShopName] = React.useState<string>("");
    const [merchantID, setMerchantID] = React.useState<string>("");
    const [merchantState, setMerchantState] = React.useState<boolean>(false);

    const [mapLatLng, setMapLatLng] = React.useState<API.Latlng>({
        lat: 39.928216,
        lng: 116.402544,
    });


    //打开弹窗,并初始化
    const openModal = async () => {
        //获取数据
        setMerchantState(false)
        var cascade = await RegionCascade()
        setCityOptions(cascade.data)
        //初始化值
        setVisible(true)
    }

    //提交表单
    async function submitForm() {
        // 验证
        var validates = await form.validate();
        validates.province_id = provinceId
        validates.city_id = cityId
        validates.district_id = districtId

        validates.longitude = mapLatLng.lng
        validates.latitude = mapLatLng.lat

        MerchantAdd(validates).then(rec => {
            if (rec.status) {
                Notification.success({
                    title: '添加商家成功',
                    content: '添加《' + validates.shop_name + '》',
                })
                param.Finish();
                setVisible(false)
            } else {
                Notification.warning({
                    title: '添加失败',
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
            <Button onClick={openModal} type='primary'>
                添加商家
            </Button>

            <Modal
                title='添加商家'
                visible={visible}
                okText='添加'
                cancelText='关闭'
                style={{ width: "980px" }}
                onOk={submitForm}
                onCancel={cancelModal}
                maskClosable={false}
                unmountOnExit={true}
            >
                {!merchantState ? <Merchant onClick={(e) => {
                    //查询数据库是否存在id
                    CheckId(e.merchant_id).then(c => {

                        if (c.status) {

                            setProvinceId(e.province_id)
                            setCityId(e.city_id)
                            setDistrictId(e.district_id)

                            setMerchantID(e.merchant_id)
                            setShopName(e.shop_name)
                            setAddress(e.address)
                            setMapLatLng({
                                lat: e.latitude,
                                lng: e.longitude,
                            })

                            setMerchantState(true)

                        } else {
                            Notification.warning({
                                title: '该商户存在',
                                content: "当前商户数据存在，请选择其他商户！",
                            })
                        }
                    })



                }}></Merchant> : <Row className='grid-gutter-demo' gutter={24}>
                    <Col span={12}>
                        <Form form={form} autoComplete='off' initialValues={{
                            merchant_id: merchantID,
                            shop_name: shopName,
                            account: "",
                            password: "",
                            merchant_name: "",
                            name: "",
                            phone: "",
                            address: address,
                            status: 1,
                        }}>
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


                            <FormItem label='登录密码' field='password' required rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '登录密码必须填写'
                                },
                            ]}>
                                <Input.Password placeholder='请输入登录密码' maxLength={20} />
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
                                    message: '联系人名称必须填写'
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
                                <RadioGroup>
                                    <Radio value={0}>失效</Radio>
                                    <Radio value={1}>激活</Radio>
                                </RadioGroup>
                            </FormItem>

                        </Form>
                    </Col>
                    <Col span={12}>
                        <div>
                            <div style={{ marginBottom: "24px", fontSize: "15px", color: "#4e5969" }}>选择位置</div>
                            <MapComponent
                                lat={mapLatLng.lat}
                                lng={mapLatLng.lng}
                                retLatLng={e => {
                                    setMapLatLng({
                                        lat: e.lat,
                                        lng: e.lng,
                                    })
                                }}
                            ></MapComponent>
                        </div>
                    </Col>
                </Row>
                }

            </Modal>
        </div>
    );
}

export default AddMerchant;