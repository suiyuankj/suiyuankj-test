import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import rootReducer from './store';
import PageLayout from './layout';
import ArticlePage from './pages/content/article';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import './mock';
// import WordLogin from './pages/word_login';

const store = createStore(rootReducer);

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'zh-CN');
  const [theme, setTheme] = useStorage('arco-theme', 'light');
  //获取国际化
  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }
  //获取用户登录数据
  function fetchUserInfo() {
    //从本地存储获取用户数据
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    });
    //通过api连接获取用户数据
    axios.get('/api/user/userInfo').then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data, userLoading: false },
      });
    });
  }
  
  useEffect(() => {
    //判断是否登录
    if (checkLogin()) {
      //已经登录，获取用户信息数据
      fetchUserInfo();
    }//判断地址是否为登录地址
    else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      //不是登录地址，则跳到登录地址
      window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    //初始化主体
    changeTheme(theme);
  }, [theme]);
  
  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/article" component={ArticlePage} />
              <Route path="/" component={PageLayout} />
             
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
