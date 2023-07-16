import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Radio, Notification, Tabs, Typography, Grid, Card, Select, Upload, Message, Image, DatePicker, Table } from '@arco-design/web-react';
import { GetTypeList, ProductAdd, } from '@/service/product';

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


function AddProduct(param: any) {
  const uploadRef = React.useRef();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [type, setType] = React.useState<API.ProductType[]>([]);
  const [data, setData] = React.useState<API.Product>({});
  const [form] = Form.useForm();
  const [cover, setCover] = React.useState<string>("");
  const [slides, setSlides] = React.useState<string[]>([]);
  const [details, setDetails] = React.useState<string[]>([]);
  const [startTime, setStartTime] = React.useState<string>("");
  const [merchant, setMerchant] = React.useState<number[]>([]);
  const [endTime, setEndTime] = React.useState<string>("");

  const [parameData, setParameData] = React.useState<InputAttr[]>([]);
  //初始化
  useEffect(() => {

  }, []);

  //打开弹窗,并初始化
  const openModal = async () => {
    setCover(undefined)
    setSlides([])
    setDetails([])

    GetTypeList().then(rec => {
      setType(rec.data)
    })
    setVisible(true)
  }

  function isPrice(value: string): boolean {
    const priceRegex = /^\d+(\.\d{1,2})?$/; // 正则表达式，匹配数字和最多两位小数的价格格式
    return priceRegex.test(value);
  }

  //提交表单
  async function submitForm() {
    // 验证
    var validates = await form.validate();
    //封面
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
    //市场价格
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

    //parameData
    validates.params = parameData
    // console.log("validates", validates)

    ProductAdd(validates).then(rec => {
      if (rec.status) {
        Notification.success({
          title: '添加成功',
          content: '添加商品服务《' + validates.product_name + '》',
        })
        // param.Finish();
        // setVisible(false)
      } else {
        Notification.warning({
          title: '添加失败',
          content: '商品名称可能存在！或者填写信息有误，请检查后再次提交!',
        })
      }
    })

  }

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
      <Button onClick={openModal} type='primary'>
        添加
      </Button>

      <Modal
        // title='添加商品'
        visible={visible}
        okText='添加'
        cancelText='关闭'
        onOk={submitForm}
        onCancel={cancelModal}
        maskClosable={false}
        unmountOnExit={true}
        style={{ width: "760px" }}
      >

        <Form form={form} style={{ height: "670px" }} autoComplete='off' initialValues={{
          type_name: "",
          sort: 50,
          status: 1,
          stock_type: 1,
          stock_number: 100,
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
                  {/* type */}

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
                  <Input placeholder='请输入商品销售价格' addAfter='RMB' maxLength={32} />
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
                  <Input placeholder='请输入商品市场价格' addAfter='RMB' maxLength={32} />
                </FormItem>

                <FormItem label='售卖时间' required>
                  <DatePicker.RangePicker
                    style={{ width: 400 }}
                    prefix={<IconInfoCircle />}
                    onChange={(e) => {
                      setStartTime(e[0])
                      setEndTime(e[1])
                    }}
                  />
                </FormItem>

                <FormItem label='显示排序' field='sort'>
                  <Input placeholder='请输入分类显示排序数字' />
                </FormItem>
                {/* 
                <FormItem label='上架状态' field='status'>
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
                    <Parameters update={e=>{
                      setParameData(e)
                      console.log("Parameters",e)
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
                        ref={uploadRef}
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
                      <div style={{ overflowY: "scroll", height: "500px", }}>

                        {details.map((e, index) => {
                          const isFirst = index === 0;
                          const isLast = index === details.length - 1;
                          return (
                            <div style={{ height: "110px", display: "flex" }}>
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
                    <Card style={{ width: "99%" }}
                      bordered={true}>
                      <div style={{ width: "100%", height: "570px", overflowY: "scroll", backgroundColor: "#fff" }}>

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
                  <RadioGroup defaultValue={3}>
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

export default AddProduct;