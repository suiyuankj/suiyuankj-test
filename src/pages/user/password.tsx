import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification } from '@arco-design/web-react';
import { Password,  } from '@/service/user';
const FormItem = Form.Item;
;
function PasswordUser(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const [id, setID] = React.useState<number>(param.id);
  const [nickName, setNickName] = React.useState<string>(param.nick_name);
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
    Password(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '重置密码成功',
          content: '重置账号《' +nickName + '》密码！',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '置密码失败',
          content: '填写密码可能存在有误！请检查后再次提交!',
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
        重置密码
      </Button>

      <Modal
        title={"重置《"+ param.nick_name +"》账户密码"}
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
          <div style={{padding:15,color:"#666666",paddingTop:0}}>
            提示：重置密码后，用户对应的微信将会解绑，解绑后重新登录即可重新绑定。

          </div>

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

export default PasswordUser;