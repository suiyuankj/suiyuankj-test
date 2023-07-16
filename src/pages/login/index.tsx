import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/logo.svg';
import LoginForm from './form';
import LoginBanner from './banner';
import styles from './style/index.module.less';
import { QyWxOauth2, GetWxUserInfo } from '@/service/login';
import qs from 'query-string';
import { Message } from '@arco-design/web-react';

function Login() {
  const [token, setToken] = React.useState<string>("");
  const params: any = qs.parseUrl(window.location.href).query;
  const [code, setCode] = React.useState<string>("");
  // const [userId, setUserId] = React.useState<string>("");
  // const [openid, setOpenid] = React.useState<string>("");
  // const [userTicket, setUserTicket] = React.useState<string>("");
  // const [externalUserid, setExternalUserid] = React.useState<string>("");
  // const [userInfo, setUserInfo] = React.useState<any>([]);
  useEffect(() => {

    setCode(params.code)
    //企业微信登录
    if (params.type == "word_login") {
      QyWxOauth2().then(res => {
        setToken(res.data)
        window.location.href = res.data;
      })
    }
    var code = params.code

    if (code != undefined) {
      if (code.length == 43) {
        GetWxUserInfo(code).then(e => {
          console.log(e.data)
          // 记录登录状态
          localStorage.setItem('userStatus', 'login');
          // 记录登录状态
          localStorage.setItem('token', e.data);
          localStorage.setItem('login_type',"word");
          // 跳转首页
          window.location.href = '/';

        })
      }
    }


  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {/* <Logo />
        <div className={styles['logo-text']}>集志达信息科技</div> */}
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
