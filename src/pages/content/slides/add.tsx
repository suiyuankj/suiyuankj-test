import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Radio, Notification, Upload, Transfer, Grid } from '@arco-design/web-react';
import { TypeAdd } from '@/service/product';
import { UpImg } from '@/service/base';
import { GetMerchantAll } from '@/service/merchant';
import { SlidesAdd } from '@/service/slides';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Row = Grid.Row;
const Col = Grid.Col;
function AddSlides(param: any) {

  const [modalWidth, setModalWidth] = React.useState<string>("520px");
  const [modalWidthAdd, setModalWidthAdd] = React.useState<boolean>(false);
  const [modalWidthNum, setModalWidthNum] = React.useState<number>(24);

  const [visible, setVisible] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const [images, setImages] = React.useState<string>("");
  const [merchant, setMerchant] = React.useState<API.KeyVue[]>([]);
  const [merchantID, setMerchantID] = React.useState<string[]>([]);
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {
    var recMer = await GetMerchantAll()
    if (recMer.status) {

      const data = recMer.data.map((item) => ({
        key: item.id,
        value: item.city_name + "-" + item.shop_name,
      }));
      setMerchant(data);
    }

    setVisible(true)
  }
  //提交表单
  async function submitForm() {
    // 验证
    var validates = await form.validate();
    if (images) {
      validates.images = images
    } else {
      Notification.warning({
        title: '添加失败',
        content: '幻灯片图片未上传，请检查后再次提交!',
      })
      return
    }

    validates.merchant_id = merchantID
    validates.sort = Number(validates.sort)

    SlidesAdd(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '添加成功',
          content: '添加《' + validates.slides_name + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '添加失败',
          content: '可能存在！或者填写信息有误，请检查后再次提交!',
        })
      }
    })
  }

  //关闭
  const cancelModal = () => {
    setVisible(false)
  }

  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));

  return (
    <div>
      <Button onClick={openModal} type='primary'>
        添加
      </Button>

      <Modal
        title='添加幻灯片'
        visible={visible}
        okText='添加'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
        style={{ width: modalWidth }}
      >
        <Form form={form} autoComplete='off' initialValues={{
          slides_name: "",
          path: "",
          type: 0,
          sort: 50,
          status: 1,
        }}>
          <Row className='grid-demo' style={{ marginBottom: 16 }}>

            <Col span={modalWidthNum}>
              <FormItem label='名称' field='slides_name' required rules={[
                {
                  type: 'string',
                  required: true,
                  message: '幻灯片名称必须填写'
                },
              ]}>
                <Input placeholder='请输入幻灯片名称' maxLength={32} />
              </FormItem>

              <FormItem label='图片' field='cover' required>
                <div style={{ marginTop: "5px", color: "#999" }}>
                  上传幻灯片图片：尺寸780px X 1080px
                </div>

                <Upload
                  imagePreview
                  limit={1}
                  listType='picture-card'
                  onRemove={(file) => {
                    setImages(undefined)
                  }}
                  customRequest={(option) => {
                    const { onProgress, onError, onSuccess, file } = option;
                    UpImg(file).then(res => {
                      if (res.status) {
                        setImages(res.data.path)
                        onSuccess();
                      } else {
                        onError()
                      }
                    })

                  }}
                >
                </Upload>
              </FormItem>

              <FormItem label='访问页面' field='path' >
                <Input placeholder='请输入访问页面地址：可不填写' />
              </FormItem>

              <FormItem label='发布类型' field='type' >
                <RadioGroup onChange={e => {
                  if (e == 1) {
                    setModalWidth("980px")
                    setModalWidthAdd(true)
                    setModalWidthNum(10)
                    setMerchantID([])
                  } else {
                    setModalWidth("520px")
                    setModalWidthAdd(false)
                    setModalWidthNum(24)
                    setMerchantID([])
                  }
                }}>
                  <Radio value={0}>平台</Radio>
                  <Radio value={1}>商家</Radio>
                </RadioGroup>
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

            </Col>
            {modalWidthAdd ? (
              <Col span={14} >
                <FormItem label='选择商家' field='merchant_id' style={{marginBottom:"0"}}>
                  <Transfer
                    showSearch
                    dataSource={merchant}
                    // defaultTargetKeys={[]}
                    // defaultSelectedKeys={[]}
                    titleTexts={['商家列表', '已选择']}
                    listStyle={{
                      height: 430,
                    }}
                    onChange={(a: string[]) => {
                      console.log("a", a)
                      setMerchantID(a)
                    }}
                  // style={{ height: "400px", backgroundColor: "#ccc" }}
                  />
                </FormItem>
              </Col>
            ) : ""}


          </Row>




        </Form>
      </Modal>
    </div>
  );
}

export default AddSlides;