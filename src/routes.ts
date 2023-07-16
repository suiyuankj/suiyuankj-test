import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';
import { GetMenus } from '@/service/login';

export type IRoute = AuthParams & {
  name: string;
  key: string;
  icon?: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  //隐藏菜单
  hideInMenu?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
};


const userRoutes = async () => {
  var menus = await GetMenus()
  return menus.data
}



export const routes: IRoute[] = [
  {
    name: '工作台',
    key: 'home',
    icon: 'home',
  },

];

// */
//获取名称
export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

//获取权限
export const generatePermission = (role: string) => {
  const actions = role === 'admin' ? ['*'] : ['read'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};
//userPermission : 角色权限
const useRoute = (userPermission): [IRoute[], string] => {

  // console.log("userPermission:",userPermission)
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    //判断路由数量是否为空
    if (!routes.length) {
      return [];
    }

    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      //权限处理
      let visible = true;
      //判断是否有权限设置
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }
      if (!visible) {
        continue;
      }

      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        //递归
        filterRoute(route.children, newRoute.children);
        //判断子菜单是否为空
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };
  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const userRoutes = async () => {
      var menus = await GetMenus()
      if (menus.status) {
        //初始化路由
        const newRoutes = filterRoute(menus.data);
        //设置到权限
        setPermissionRoute(newRoutes);
      }
    }
    userRoutes()

    //初始化路由
    // const newRoutes = filterRoute(routes);
    // // console.log("newRoutes",newRoutes)
    // //设置到权限
    // setPermissionRoute(newRoutes);

  }, [JSON.stringify(userPermission)]);

  //获取默认打开首个路由地址
  const defaultRoute = useMemo(() => {
    //获取第一个路由信息
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
