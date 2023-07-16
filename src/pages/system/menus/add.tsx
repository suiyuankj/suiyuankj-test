import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Select, InputNumber, Notification, Radio } from '@arco-design/web-react';
import { AdminMenusIcon, AddAdminMenus, AdminMenusOne, AdminMenusLevel } from '@/service/admin';
import { getIconFromKey } from '@/icon'
const FormItem = Form.Item;
const Option = Select.Option;
function AddMenus(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const [icon, setIcon] = React.useState<string>();
  const [iconSel, setIconSel] = React.useState<API.Icon[]>([]);
  const [menu, setMenu] = React.useState<API.Menus[]>([]);
  const [pid, setPid] = React.useState<number>(0);
  const [isMenu, setIsMenu] = React.useState<number>(1);
  const [name, setName] = React.useState<string>();
  const [path, setPath] = React.useState<string>();
  const [sort, setSort] = React.useState<number>(50);
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {
    setVisible(true)
    //初始化值
    //获取菜单名称
    var MenusLevel = await AdminMenusLevel()
    if(MenusLevel.data){
      setMenu(MenusLevel.data)
    }
  
    //获取图标数据
    var MenusIcon = await AdminMenusIcon()
    setIconSel(MenusIcon.data);

    setPid(0)
    setSort(20)
    setPath("")
  }

  //选择改变菜单层级
  const changePid = (e: any) => {
    setPid(e)
    if (e > 0) {
      setIcon("")
    }
  }

  //选择图标
  const changeIcon = (e: any) => {
    setIcon(e)
  }

  //选择图标
  const selIcon = () => {
    if (pid == 0) {
      return (
        <>
          <FormItem label='图标' field='icon' required rules={[
            {
              type: 'string',
              required: true,
              message: '图标未选择'
            },
          ]}>
            <Select
              placeholder='选择图标'
              defaultValue={icon}
              value={icon}
              onChange={changeIcon}
            >
              {iconSel.map((option, index) => (
                <Option key={index} value={option.icon}>
                  {getIconFromKey(option.icon)} - {option.name}
                </Option>
              ))}
            </Select>
          </FormItem>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  //修改排序
  const changeSort = (e: any) => {
    setSort(e)
  }

  //提交表单
  async function submitForm() {
    // 验证
    var validates = await form.validate();
    AddAdminMenus(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '添加成功',
          content: '新添加菜单《' + validates.name + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '添加菜单错误',
          content: '请检查是否有误，或者刷新页面重新填写提交试试!',
        })
      }
    })
  }

  //关闭
  const cancelModal = () => {
    setVisible(false)
  }

  //权限类型
  const CheangeRoot = (value: any) => {
    setIsMenu(value)
  }

  return (
    <div>
      <Button onClick={openModal} type='primary'>
        添加后台菜单
      </Button>

      <Modal
        title='添加后台菜单'
        visible={visible}
        okText='添加'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
      >


        <Form form={form} autoComplete='off' initialValues={
          {
            name: "",
            is_menu:1,
            pid:0,
            path:"",
            sort:20
          }
        }>

          <FormItem label='类型' field='is_menu'>
            <Radio.Group type='button' onChange={CheangeRoot}>
              <Radio value={1}>菜单目录</Radio>
              <Radio value={0}>功能权限</Radio>
            </Radio.Group>
          </FormItem>

          <FormItem label='名称' field='name' required rules={[
            {
              type: 'string',
              required: true,
              message: '菜单/功能名称必须填写'
            },
          ]}>
            <Input placeholder='请输入菜单/功能名称' maxLength={11} />
          </FormItem>

          <FormItem label='所属栏目' field='pid'>
            <Select
              placeholder='选择所属层级'
              defaultValue={0}
              value={pid}
              onChange={changePid}
            >
              <Option value={0}>顶级栏目</Option>
              {menu.map((option, index) => (
                <Option key={index} value={option.id}>
                  {option.str} {option.name}
                </Option>
              ))}
            </Select>

          </FormItem>

          {selIcon()}

          <FormItem label='地址路径' field='path' rules={[
            {
              type: 'string',
              required: true,
              message: '地址路径必须填写'
            },
          ]}>
            <Input value={path} placeholder='请输入页面目录名称' />
          </FormItem>

          <FormItem label='显示排序' field='sort'>
            <InputNumber mode='button' onChange={changeSort}  placeholder='请输入显示排序' min={0} max={250} />
          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default AddMenus;