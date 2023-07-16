import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Notification, Tree, Radio, Tag } from '@arco-design/web-react';
import { EditAdminRoles, AdminMenusList, AdminRolesDetails } from '@/service/admin';
import { getIconFromKey } from '@/icon'
import { IconPlus } from '@arco-design/web-react/icon';

const FormItem = Form.Item;

function EditRoles(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const [menus, setMenus] = React.useState<API.Menus[]>([]);
  const [checkedKeys, setCheckedKeys] = React.useState<string[]>([]);
  const [id, setId] = React.useState<number>(param.id);
  const [name, setName] = React.useState<string>();
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {

    //初始化值
    var recMenus = await AdminMenusList()
    var menus: API.Menus[] = recMenus.data
    for (var i in recMenus.data) {
      var icon = getIconFromKey(menus[i].icon)
      menus[i].icon = icon
    }
    setMenus(menus)

    var recRoles = await AdminRolesDetails(param.id)

    setName(recRoles.data.name)
    setCheckedKeys(recRoles.data.menus_id)
    setVisible(true)
  }


  //提交表单
  async function submitForm() {
    // 验证
    var validates = await form.validate();
    var menus_id = checkedKeys
    if (menus_id.length <= 0) {
      Notification.warning({
        title: '菜单权限有误',
        content: '请检查菜单权限!菜单权限不能为空',
      })
      return
    }
    var data = {
      "id": id,
      "name": validates.name,
      "menus_id": menus_id,
    }
    EditAdminRoles(data).then(rec => {
      console.log("EditAdminRoles", rec)
      if (rec.status) {
        Notification.success({
          title: '编辑成功',
          content: '编辑角色《' + data.name + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        console.log("cfadsfads")
        Notification.warning({
          title: '编辑错误',
          content: '请检查是否有误，或者刷新页面重新填写提交试试!',
        })
      }
    })
    // setVisible(false)
  }

  //关闭
  const cancelModal = () => {
    setVisible(false)
  }




  return (
    <div>
      <Button onClick={openModal} type="text" size="small">
        编辑
      </Button>

      <Modal
        title='编辑后台角色'
        visible={visible}
        okText='保存'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
      >
        <Form form={form} autoComplete='off' initialValues={
          {
            name: name,
          }
        }>
          <FormItem label='角色名称' field='name' required rules={[
            {
              type: 'string',
              required: true,
              message: '角色名称必须填写'
            },
          ]}>
            <Input placeholder='请输入角色名称' maxLength={11} />
          </FormItem>

          <FormItem label='菜单权限'>
            <Tree
              checkable
              checkedKeys={checkedKeys}
              onCheck={(value, extra) => {
                setCheckedKeys(value);
              }}
              showLine
              treeData={menus}
              renderExtra={(node) => {
                if (node.dataRef.is_menu == 1) {
                  return (
                    <>
                      <Tag style={{
                        position: 'absolute',
                        right: 8,
                        fontSize: 12,
                      }} color='red'>菜单</Tag>

                    </>
                  );
                } else {
                  return (
                    <>
                      <Tag style={{
                        position: 'absolute',
                        right: 8,
                        fontSize: 12,
                      }} color='arcoblue'>功能</Tag>
                    </>
                  );
                }

              }}
            ></Tree>
          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default EditRoles;