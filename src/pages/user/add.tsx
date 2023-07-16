import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification, Tree, Radio, Select } from '@arco-design/web-react';

import { RegUser, DepartmentAll } from '@/service/user';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
function AddUser(param: any) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    const [phone, setPhone] = React.useState<string>();
    const [nickName, setNickName] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [departmentID, setDepartmentID] = React.useState<number>();
    const [isCheck, setIsCheck] = React.useState<number>(0);
    const [departList, setDepartLIst] = React.useState<API.Department[]>([]);
    //初始化
    useEffect(() => {

    }, []);

    //打开弹窗,并初始化
    const openModal = async () => {
        //初始化值
        var selList = await DepartmentAll()
        setDepartLIst(selList.data.list)
        setVisible(true)
    }

    //选择部门
    const changeDepartment = (e:any) => {
        console.log(e)
    }
    //选择审核权限
    const changeCheck = (e:any) => {
        console.log(e)
    }
    


    //提交表单
    async function submitForm() {
        // 验证
        var validates = await form.validate();
        validates.is_check = isCheck

        RegUser(validates).then(rec => {
            if (rec.status) {
                Notification.success({
                    title: '注册账户成功',
                    content: '注册账号《' + validates.phone + '》',
                })
                param.Finish();
                setVisible(false)
            } else {
                Notification.warning({
                    title: '注册账户失败',
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
                添加账户
            </Button>

            <Modal
                title='添加账户'
                visible={visible}
                okText='添加'
                cancelText='关闭'
                onOk={submitForm}
                onCancel={cancelModal}
                maskClosable={false}
                unmountOnExit={true}
            >
                <Form form={form} autoComplete='off'>
                    <FormItem label='登录手机' field='phone' required rules={[
                        {
                            type: 'string',
                            required: true,
                            message: '登录手机必须填写'
                        },
                    ]}>
                        <Input placeholder='请输入手机号码' maxLength={11} />
                    </FormItem>

                    <FormItem label='登录密码' field='password' required rules={[
                        {
                            type: 'string',
                            required: true,
                            message: '登录密码必须填写'
                        },
                    ]}>
                        <Input.Password placeholder='请输入登录密码' />
                    </FormItem>

                    <FormItem label='用户昵称' field='nick_name' required rules={[
                        {
                            type: 'string',
                            required: true,
                            message: '昵称必须填写'
                        },
                    ]}>
                        <Input placeholder='请输入用户昵称' />
                    </FormItem>

                    <FormItem label='所属部门' field='department_id' initialValue={0}>
                        <Select
                            placeholder='选择所属部门'
                            onChange={changeDepartment}
                            allowClear
                            showSearch
                        >
                            {departList.map((option, index) => (
                                <Option key={index} value={option.id}>
                                    {option.name}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem label='审核员' field='is_check'>
                        <RadioGroup defaultValue={0} onChange={changeCheck}>
                            <Radio value={0}>上报人员</Radio>
                            <Radio value={1}>审核人员</Radio>
                        </RadioGroup>
                    </FormItem>

                </Form>
            </Modal>
        </div>
    );
}

export default AddUser;