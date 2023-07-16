import React, { useContext, useEffect } from 'react';
import {
  Tooltip,
  Dropdown,

  Button,
} from '@arco-design/web-react';
import {
  IconSunFill,
  IconMoonFill,
  IconSettings,
  IconPoweroff,
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

function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const dispatch = useDispatch();

  const [_, setUserStatus] = useStorage('userStatus');
  const [role, setRole] = useStorage('userRole', 'admin');

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);
  //退出登录
  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }

  useEffect(() => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    });
  }, [role]);

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  // const handleChangeRole = () => {
  //   const newRole = role === 'admin' ? 'user' : 'admin';
  //   setRole(newRole);
  // };


  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
        
          <div className={styles['logo-name']}>泡泡兔管理系统</div>
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
              {/* <Avatar size={32} style={{ cursor: 'pointer' }}>
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar> */}
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

export default Navbar;
