import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Radio, Notification } from '@arco-design/web-react';
import { TypeAdd } from '@/service/product';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
function AddType(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {
    setVisible(true)
  }
  //提交表单
  async function submitForm() {
    // 验证
    var validates = await form.validate();
    validates.sort=Number(validates.sort)
    TypeAdd(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '添加成功',
          content: '添加分类《' + validates.type_name + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '添加失败',
          content: '分类可能存在！或者填写信息有误，请检查后再次提交!',
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
        添加
      </Button>

      <Modal
        title='添加商品分类'
        visible={visible}
        okText='添加'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
      >
        <Form form={form} autoComplete='off' initialValues={{
          type_name: "",
          sort: 50,
          status: 1,
        }}>
          <FormItem label='分类名称' field='type_name' required rules={[
            {
              type: 'string',
              required: true,
              message: '分类名称必须填写'
            },
          ]}>
            <Input placeholder='请输入分类名称' maxLength={11} />
          </FormItem>

          <FormItem label='显示排序' field='sort' required rules={[
            {
              type: 'number',
              required: true,
              message: '分类排序必须填写'
            },
          ]}>
            <Input placeholder='请输入分类显示排序数字' />
          </FormItem>

          <FormItem label='显示排序' field='status'>
            <RadioGroup defaultValue={1}>
              <Radio value={0}>失效</Radio>
              <Radio value={1}>激活</Radio>
            </RadioGroup>
          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default AddType;