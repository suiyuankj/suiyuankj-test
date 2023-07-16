import React, { useContext, useEffect } from 'react';
import {
  Tooltip,
  Dropdown,
  Link,
} from '@arco-design/web-react';
import {
  IconSunFill,
  IconMoonFill,
  IconPoweroff,
  IconLeft,
} from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';
import useStorage from '@/utils/useStorage';
import { generatePermission } from '@/routes';

function NavbarPage(param: any) {
  const t = useLocale();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);

  const [_, setUserStatus] = useStorage('userStatus');
  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);
  //退出登录
  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>

          <Link href='/content/help' style={{color:"#555",display:"flex",alignItems:"center"}}>
            <IconLeft style={{ fontSize: "24px" }} />
          </Link>

          <div className={styles['logo-name']}>{param.title}</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? t['settings.navbar.theme.toDark']
                : t['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        {/* <Settings /> */}
        {userInfo && (
          <li>
            <Dropdown position="br">
              管理员
            </Dropdown>
          </li>

        )}
        <li>
          <div onClick={logout}>
            <IconPoweroff className={styles['dropdown-icon']} />
            {t['navbar.logout']}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default NavbarPage;
