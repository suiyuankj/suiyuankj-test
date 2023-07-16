import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, InputNumber, Notification, Radio } from '@arco-design/web-react';
import { AdminMenusIcon, EditAdminMenus, AdminMenusLevel, AdminMenusDetails } from '@/service/admin';
import { getIconFromKey } from '@/icon'
const FormItem = Form.Item;
const Option = Select.Option;
// const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
function EditMenus(param: any) {
  const [visible, setVisible] = React.useState<boolean>(param.visible);
  const [form] = Form.useForm();
  const [icon, setIcon] = React.useState<string>();
  const [iconSel, setIconSel] = React.useState<API.Icon[]>([]);
  const [menu, setMenu] = React.useState<API.Menus[]>([]);
  const [id, setId] = React.useState<number>(param.id);
  const [pid, setPid] = React.useState<number>(0);
  const [isMenu, setIsMenu] = React.useState<number>(1);
  const [name, setName] = React.useState<string>();
  const [path, setPath] = React.useState<string>();
  const [sortNumber, setSortNumber] = React.useState<number>(50);

  //打开弹窗,并初始化
  const openModal = async () => {
    var details = await AdminMenusDetails(param.id) //获取详情
    var menus = await AdminMenusLevel() //获取一级菜单
    var iconList = await AdminMenusIcon()
    var data = details.data
    if(menus.data){
      setMenu(menus.data)
    }
    setName(data.name)
    setIcon(data.icon)
    setPath(data.path)
    setSortNumber(data.sort)
    setIsMenu(data.is_menu)
    setPid(data.pid)
    setIconSel(iconList.data)
    setVisible(true)
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
    setSortNumber(e)
  }

  //提交表单
  async function submitForm() {
    var validates = await form.validate();
    validates.id = id
    EditAdminMenus(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '编辑菜单成功',
          content: '编辑菜单《' + validates.name + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '编辑菜单错误',
          content: '请检查是否有误，或者刷新页面重新填写提交试试!',
        })
      }
    })

  }

  //权限类型
  const CheangeRoot = (value: any) => {
    setIsMenu(value)
  }
  //关闭
  const cancelModal = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={openModal} type="text" size="small">
        编辑
      </Button>
      <Modal
        title='编辑后台菜单'
        visible={visible}
        okText='保存'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
        autoFocus={false}
      >
        <Form form={form} autoComplete='off' initialValues={
          {
            name: name,
            pid: pid,
            is_menu: isMenu,
            path: path,
            icon: icon,
            sort: sortNumber,
          }
        }>
          <FormItem label='类型' field='is_menu'>
            <Radio.Group type='button' onChange={CheangeRoot}>
              <Radio value={1}>菜单目录</Radio>
              <Radio value={0}>功能权限</Radio>
            </Radio.Group>
          </FormItem>

          <FormItem label='菜单名称' field='name' required rules={[
            {
              type: 'string',
              required: true,
              message: '菜单名称必须填写'
            },
          ]}>
            <Input placeholder='请输入菜单名称' maxLength={11} />
          </FormItem>

          <FormItem label='菜单层级' field='pid'>
            <Select
              placeholder='选择所属层级'
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

          <FormItem label='显示排序' field='sort' >
            <InputNumber mode='button' onChange={changeSort} placeholder='请输入显示排序' min={0} max={250} />
          </FormItem>

        </Form>
      </Modal>
    </>
  );
}

export default EditMenus;