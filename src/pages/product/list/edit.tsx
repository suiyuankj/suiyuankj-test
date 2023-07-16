import React from 'react';
import { Modal, Button, Form, Input, Radio, Notification, Tabs, Typography, Grid, Card, Select, Upload, Message, Image, DatePicker } from '@arco-design/web-react';
import { ProductDetail, ProductEdit, GetTypeList, } from '@/service/product';

import { UpImg } from '@/service/base';
import { IconArrowFall, IconArrowRise, IconDelete, IconInfoCircle } from '@arco-design/web-react/icon';
import Merchant from './merchant';
import Parameters from './parameters';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const Row = Grid.Row;
const Col = Grid.Col;
const Option = Select.Option;


type InputAttr = {
  name: string;
  val: string;
};

function EditProduct(param: any) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [type, setType] = React.useState<API.ProductType[]>([]);
  const [data, setData] = React.useState<API.Product>({});
  const [form] = Form.useForm();
  const [cover, setCover] = React.useState<string>("");
  const [slides, setSlides] = React.useState<string[]>([]);
  const [details, setDetails] = React.useState<string[]>([]);
  const [merchant, setMerchant] = React.useState<number[]>([]);
  const [startTime, setStartTime] = React.useState<string>("");
  const [endTime, setEndTime] = React.useState<string>("");
  
  const [parameData, setParameData] = React.useState<InputAttr[]>([]);
  //打开弹窗,并初始化
  const openModal = async () => {
    var typeList = await GetTypeList()
    setType(typeList.data)
    var detail = await ProductDetail(param.id)
    if(detail.status){
      setData(detail.data)
      setCover(detail.data.cover)
      setSlides(detail.data.slides)
      setDetails(detail.data.details)
      setStartTime(detail.data.sold_start_date)
      setEndTime(detail.data.sold_end_date)
      setMerchant(detail.data.merchant_id)
      setParameData(detail.data.params)
    }
   
    setVisible(true)
  }
  
  //销售价格判断
  function isPrice(value: string): boolean {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    return priceRegex.test(value);
  }

  //提交表单
  async function submitForm() {
    var validates = await form.validate();
    validates.id = param.id
    if (cover) {
      validates.cover = cover
    } else {
      Notification.warning({
        title: '封面不能为空',
        content: '请上传商品主图封面图片',
      })
      return false
    }
    if (isPrice(validates.sale_price)) {
      validates.sale_price = Number(validates.sale_price)
    } else {
      Notification.warning({
        title: '销售价格有误',
        content: '请输入正确的销售价格参数，例：100、99.9等',
      })
      return false
    }
    if (isPrice(validates.market_price)) {
      validates.market_price = Number(validates.market_price)
    } else {
      Notification.warning({
        title: '市场价格有误',
        content: '请输入正确的市场价格参数，例：100、99.9等',
      })
      return false
    }
    validates.sort = Number(validates.sort)

    if (slides.length > 0) {
      validates.slides = slides
    } else {
      Notification.warning({
        title: '商品幻灯片不能为空',
        content: '请上传商品幻灯片，建议数量1-5张',
      })
      return false
    }

    if (details.length > 0) {
      validates.details = details
    } else {
      Notification.warning({
        title: '商品详情不能为空',
        content: '请上传商品详情图',
      })
      return false
    }

     //销售时间
     if (!startTime && !endTime) {
      Notification.warning({
        title: '销售时间未选择',
        content: '请选择产品开始销售时间和结束时间',
      })
      return false
    }


    validates.sold_start_date = startTime
    validates.sold_end_date = endTime

    //商家选择
    if (merchant.length <= 0) {
      Notification.warning({
        title: '未选择商家',
        content: '请选择产品显示的商家',
      })
      return false
    }
    validates.merchant_id = merchant
    validates.params = parameData


    ProductEdit(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '编辑成功',
          content: '编辑保存商品服务《' + validates.product_name + '》',
        })
        param.Finish();
        setVisible(false)
      } else {
        Notification.warning({
          title: '编辑失败',
          content: '商品名称可能存在！或者填写信息有误，请检查后再次提交!',
        })
      }
    })

  }

  // 初始化的文件列表数据
  const slidesFileList = slides.map((slide, index) => ({
    uid: index.toString(),
    name: slide,
    url: "http://localhost:8055/" + slide,
  }));

  //关闭
  const cancelModal = () => {
    setVisible(false)
  }
  //详情图，向上移动
  const moveUp = (index: number) => {
    if (index > 0) {
      const newArr = [...details];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      setDetails(newArr);
    }
  };
  //详情图，向下移动
  const moveDown = (index: number) => {
    if (index < details.length - 1) {
      const newArr = [...details];
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      setDetails(newArr);
    }
  };
  //详情图，删除
  const deleteItem = (index: number) => {
    const newArr = [...details];
    newArr.splice(index, 1);
    setDetails(newArr);
  };


  return (
    <div>
      <Button onClick={openModal} type='text' size="small">
        编辑
      </Button>

      <Modal
        visible={visible}
        okText='保存'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
        style={{ width: "720px" }}
      >

        <Form form={form} style={{ height: "670px" }} autoComplete='off' initialValues={{
          product_name: data.product_name,
          product_code: data.product_code,
          type_id: data.type_id,
          type_name: data.type_name,
          sale_price: data.sale_price,
          market_price: data.market_price,
          sort: data.sort,
          status: data.status,
          stock_type: data.stock_type,
          stock_number: data.stock_number,
          refund_policy: data.refund_policy,
        }}>
          <Tabs defaultActiveTab='1' style={{ margin: "0px", padding: 0 }}>
            <TabPane key='1' title='基础信息'>
              <Typography.Paragraph>

                <FormItem label='商品名称' field='product_name' required rules={[
                  {
                    type: 'string',
                    required: true,
                    message: '商品名称必须填写'
                  },
                ]}>
                  <Input placeholder='请输入商品名称' maxLength={32} />
                </FormItem>
                <FormItem label='商品编码' field='product_code'>
                  <Input placeholder='请输入商品编码' maxLength={32} />
                </FormItem>
                <FormItem label='商品主图' field='cover' required>
                  <div style={{ marginTop: "5px", color: "#999" }}>
                    上传商品主图：尺寸780px X 1080px
                  </div>
                  <Upload
                    imagePreview
                    limit={1}
                    listType='picture-card'
                    defaultFileList={[
                      {
                        uid: '1',
                        name: cover,
                        url: "http://localhost:8055/" + cover,
                      },
                    ]}
                    onRemove={(file) => {
                      setCover(undefined)
                    }}
                    customRequest={(option) => {
                      const { onProgress, onError, onSuccess, file } = option;
                      UpImg(file).then(res => {
                        if (res.status) {
                          setCover(res.data.path)
                          onSuccess();
                        } else {
                          onError()
                        }
                      })

                    }}
                  >
                  </Upload>
                </FormItem>

                <FormItem label='商品幻灯片' field='slides' required>

                  <div>
                    <div style={{ marginTop: "5px", color: "#999" }}>
                      上传商品主图：尺寸780px X 1080px
                    </div>
                    <Upload
                      multiple
                      imagePreview
                      listType='picture-card'
                      defaultFileList={slidesFileList}
                      onChange={(e) => {
                        console.log("onChange:", e)
                      }}
                      onRemove={(file) => {
                        console.log("file", file)
                        // setCover(null)
                      }}
                      customRequest={(option) => {
                        const { onProgress, onError, onSuccess, file } = option;
                        UpImg(file).then(res => {
                          if (res.status) {
                            setSlides(prevSlides => [...prevSlides, res.data.path]);
                            onSuccess();
                          } else {
                            onError()
                          }
                        })

                      }}
                    />
                  </div>
                </FormItem>

                <FormItem label='商品分类' field='type_id' required>
                  <Select
                    placeholder='选择商品分类'
                    style={{ width: 154 }}

                  >
                    {type.map((option, index) => (
                      <Option key={option.id} value={option.id}>
                        {option.type_name}
                      </Option>
                    ))}
                  </Select>

                </FormItem>

                <FormItem label='销售价格' field='sale_price' required rules={[
                  {
                    type: "number",
                    required: true,
                    min: 0,
                    max: 99999,
                    message: '商品销售价格必须填写'
                  },
                ]}>
                  <Input placeholder='请输入商品销售价格' addAfter='RMB' />
                </FormItem>

                <FormItem label='市场价格' field='market_price' required rules={[
                  {
                    type: "number",
                    required: true,
                    min: 0,
                    max: 99999,
                    message: '商品市场价格必须填写'
                  },
                ]}>
                  <Input placeholder='请输入商品市场价格' addAfter='RMB' />
                </FormItem>

                <FormItem label='售卖时间' required>
                  <DatePicker.RangePicker
                    style={{ width: 400 }}
                    prefix={<IconInfoCircle />}
                    defaultValue={[data.sold_start_date, data.sold_end_date]}
                    onChange={(e) => {
                      setStartTime(e[0])
                      setEndTime(e[1])
                    }}
                  />
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

                {/* <FormItem label='上架状态' field='status'>
                  <RadioGroup defaultValue={1}>
                    <Radio value={0}>放入仓库</Radio>
                    <Radio value={1}>立即上架</Radio>
                    <Radio value={2}>下架</Radio>
                  </RadioGroup>
                </FormItem> */}

              </Typography.Paragraph>
            </TabPane>



            <TabPane key='2' title='服务参数'>
              <Typography.Paragraph >
                    <Parameters data={parameData} update={e=>{
                      setParameData(e)
                    }}></Parameters>
              </Typography.Paragraph>
            </TabPane>

            
            <TabPane key='3' title='详情内容'>
              <Typography.Paragraph >
                <Row gutter={24}>
                  <Col span={9}>
                    <Card style={{ width: "99%", height: "610px", }}
                      bordered={true}
                      title='图片管理'
                      extra={<Upload

                        imagePreview={false}
                        showUploadList={false}
                        customRequest={(option) => {
                          const { onProgress, onError, onSuccess, file } = option;
                          UpImg(file).then(res => {
                            if (res.status) {
                              setDetails(prevSlides => [...prevSlides, res.data.path]);
                              onSuccess();
                            } else {
                              onError()
                            }
                          })

                        }}
                      >
                        <Button type='text'>添加图片</Button>
                      </Upload>}

                    >
                      <div style={{ overflowY: "scroll", height: "520px", }}>

                        {details.map((e, index) => {
                          const isFirst = index === 0;
                          const isLast = index === details.length - 1;
                          return (
                            <div style={{ height: "110px", display: "flex" }} key={index}>
                              <div style={{ height: "90px", display: "flex", background: "#ccc", width: "90px", position: "relative", overflow: "hidden" }}>
                                <Image
                                  key={index}
                                  width={"100%"}
                                  height={"100%"}
                                  style={{
                                    objectFit: "cover",
                                    position: "absolute",
                                  }}
                                  src={"http://localhost:8055/" + e}
                                />
                              </div>
                              <div style={{ height: "90px", boxSizing: 'border-box', paddingLeft: "24px", display: "flex", flexWrap: "wrap", alignContent: "space-between" }}>

                                {/* 省略其他代码 */}
                                {!isFirst && (
                                  <div style={{ width: "100%" }} onClick={() => moveUp(index)}>
                                    <IconArrowRise />
                                  </div>
                                )}
                                {!isLast && (
                                  <div style={{ width: "100%" }} onClick={() => moveDown(index)}>
                                    <IconArrowFall />
                                  </div>
                                )}
                                <div style={{ width: "100%" }} onClick={() => deleteItem(index)}>
                                  <IconDelete />
                                </div>
                                {/* 省略其他代码 */}

                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </Card>
                  </Col>
                  <Col span={15}>
                    <Card style={{ width: "99%", height: "610px", }}
                      bordered={true}

                    >
                      <div style={{ width: "100%", height: "565px", overflowY: "scroll", backgroundColor: "#fff" }}>

                        {details.map((e, key) => {
                          return (<Image
                            key={key}
                            width={"100%"}
                            src={"http://localhost:8055/" + e}
                            alt='lamp'
                          />)
                        })}

                      </div>

                    </Card>
                  </Col>
                </Row>

              </Typography.Paragraph>
            </TabPane>

            <TabPane key='4' title='店铺设置'>
              <Typography.Paragraph >
                <Merchant
                  data={data.merchant_id}
                  onChange={e => {
                    setMerchant(e)
                    console.log("店铺设置：", e)
                  }}
                ></Merchant>
                {/* <Table columns={merchantColumns} data={merchantData} /> */}
              </Typography.Paragraph>
            </TabPane>

            <TabPane key='5' title='其他设置'>
              <Typography.Paragraph >

                <FormItem label='库存类型' field='stock_type'>
                  <RadioGroup >
                    <Radio value={1}>有限库存</Radio>
                    <Radio value={2}>无限库存:（选择后总库存则无效）</Radio>
                  </RadioGroup>
                </FormItem>

                <FormItem label='总库存' field='stock_number' required rules={[
                  {
                    type: "number",
                    required: true,
                    min: 1,
                    max: 99999,
                    message: '商品总库存必须填写'
                  },
                ]}>
                  <Input placeholder='请输入商品总库存' />
                </FormItem>


                <FormItem label='退款政策' field='refund_policy'>
                  <RadioGroup defaultValue={1}>
                    <Radio value={1}>允许退款</Radio>
                    <Radio value={2}>不可退款</Radio>
                    <Radio value={3}>有条件退</Radio>
                  </RadioGroup>
                </FormItem>





              </Typography.Paragraph>
            </TabPane>


          </Tabs>






        </Form>
      </Modal>
    </div>
  );
}

export default EditProduct;

