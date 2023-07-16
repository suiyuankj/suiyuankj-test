import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification, Tree, Radio, Select } from '@arco-design/web-react';
import { RegAdmin, AdminRolesSel } from '@/service/admin';
const FormItem = Form.Item;
const Option = Select.Option;
function AddAdmin(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const [account, setAccount] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [roles, setRoles] = React.useState<number>();
  const [roleList, setRoleLIst] = React.useState<API.Roles[]>([]);
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {

    //初始化值
    var rolesList = await AdminRolesSel()
    setRoleLIst(rolesList.data)
    setVisible(true)
  }

  //选择权限
  const changeRoles = () => {

  }


  //提交表单
  async function submitForm() {
    // 验证
    var validates = await form.validate();
    RegAdmin(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '注册账户成功',
          content: '注册账号《' + validates.account + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '注册账户失败',
          content: '手机或者邮箱可能存在！或者注册信息有误，请检查后再次提交!',
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
        title='添加后台管理账户'
        visible={visible}
        okText='添加'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
      >
        <Form form={form} autoComplete='off'>
          <FormItem label='登录手机' field='account' required rules={[
            {
              type: 'string',
              required: true,
              message: '登录手机必须填写'
            },
          ]}>
            <Input placeholder='请输入手机号码' maxLength={11} />
          </FormItem>

          <FormItem label='联系邮箱' field='email' required rules={[
            {
              type: 'email',
              required: true,
              message: '邮箱地址必须填写'
            },
          ]}>
            <Input placeholder='请输入邮箱地址' />
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

          
          <FormItem label='用户昵称' field='nickname' required rules={[
            {
              type: 'string',
              required: true,
              message: '昵称必须填写'
            },
          ]}>
            <Input placeholder='请输入用户昵称' />
          </FormItem>

          <FormItem label='角色权限' field='role' initialValue={0}>
            <Select
              placeholder='选择所属层级'
              defaultValue={0}
              value={0}
              onChange={changeRoles}
            >
              <Option value={0}>超级管理员</Option>
              {roleList.map((option, index) => (
                <Option key={index} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default AddAdmin;