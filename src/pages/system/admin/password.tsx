import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification } from '@arco-design/web-react';
import { EditAdminAccount,  } from '@/service/admin';
const FormItem = Form.Item;
;
function PasswordAdmin(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const [id, setID] = React.useState<number>(param.id);
  const [account, setAccount] = React.useState<string>(param.account);
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {
    setVisible(true)
  }


  //提交表单
  async function submitForm() {
    var validates = await form.validate();
    validates.id = id
    EditAdminAccount(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '修改账户成功',
          content: '修改账号《' +account + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '修改账户失败',
          content: '手机或者邮箱可能存在！或者填写信息有误，请检查后再次提交!',
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
      <Button onClick={openModal} type="text" size="small">
        修改密码
      </Button>

      <Modal
        title={"修改《"+ param.account +"》管理账户密码"}
        visible={visible}
        okText='修改'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
      >
        <Form form={form} autoComplete='off' initialValues={
          {
            password: "",
          }
        }>

          <FormItem label='登录密码' field='password' required rules={[
            {
              type: 'string',
              required: true,
              message: '登录密码必须填写'
            },
          ]}>
            <Input.Password placeholder='请输入登录密码' />
          </FormItem>


        </Form>
      </Modal>
    </div>
  );
}

export default PasswordAdmin;