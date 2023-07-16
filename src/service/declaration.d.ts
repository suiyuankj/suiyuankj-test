declare namespace API {

  type Page = {
    sizeCanChange?: boolean;
    showTotal?: boolean;
    total?: number;
    pageSize?: number;
    current?: number;
    search?: string;
    pageSizeChangeResetCurrent?: boolean;
  };
  type Slides = {
    id?: number;
    key?: number;
    type?: number;
    merchant_id?: string;
    slides_name?: string;
    images?: string;
    url?: string;
    sort?: number;
    create_time?: string;
    updata_time?: string;
    status?: number;
  };
  type User = {
    id?: number;
    key?: number;
    department_id?: number;
    department_name?: string;
    nick_name?: string;
    phone?: string;
    openid?: string;
    is_check?: number;
    create_time?: string;
    updata_time?: string;
    status?: number;
    password?: string;
  };
  //商家
  type Merchant = {
    id?: number;
    key?: number;
    merchant_id?:number;
    account?: string;
    password?: string;
    name?: string;
    phone?: string;
    logo?: string;
    shop_name?: string;
    intro?: string;
    province_id?: number;
    city_id?: number;
    district_id?: number;
    province_name?: string;
    city_name?: string;
    district_name?: string;
    address?: string;
    longitude?: number;
    latitude?: number;
    create_time?: string;
    updata_time?: string;
    status?: number;
  };
  //商品
  type Product = {
    id?: number;
    key?: number;
    product_name?: string;
    product_code?: string;
    type_id?: number;
    type_name?: string;
    cover?: string;
    banner?: string;
    slides?: string[];
    parame?:parame[];
    sale_price?: number;
    market_price?: number;
    details?: string[];
    order_virtual?: number;
    sort?: number;
    sold_start_date?: string;
    sold_end_date?: string;
    create_time?: string;
    updata_time?: string;
    status?: number;
    merchant_id?: number[];
    stock_type?:number;
    stock_number?:number;
    refund_policy?:number;
  };

  type parame ={
    key?: number;
    name?: string;
    value?: string;
  }

  //商品分类
  type ProductType = {
    id?: number;
    key?: number;
    type_name?: string;
    icon?: string;
    banner?: string;
    sort?: number;
    create_time?: string;
    updata_time?: string;
    status?: number;
  };


  type Login = {
    userName?: string;
    password?: string;
  };

  type Admin = {
    id?: number;
    account?: string;
    email?: string;
    password?: string;
    nickname?: string;
    status?: number;
    role?: number;
  };

  type Menus = {
    id?: number;
    pid?: number;
    key?: string;
    name?: string;
    icon?: any;
    create_time?: string;
    path?: string;
    sort?: number;
    children?: Menus[]
    str?: string;
    level?: number;
  };
  type Roles = {
    id?: number;
    name?: string;
    create_time?: string;
    is_root?: number;
    menus_id?: any;
    sort?: number;
  };
  type Icon = {
    id?: number;
    name?: string;
    icon?: string;
  };

  type Cascader = {
    value?: number;
    label?: string;
    children?: RegionCascader[];
  };
  type KeyVue = {
    key?: number;
    value?: string;
    disabled?: boolean;
  };

  type Latlng = {
    lat: number;
    lng: number;
  };
}