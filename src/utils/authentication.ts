/**
 * { data-analysis:  ['read', 'write'] }
 */

export type UserPermission = Record<string, string[]>;

type Auth = {
  resource: string | RegExp;
  actions?: string[];
};

export interface AuthParams {
  requiredPermissions?: Array<Auth>;
  oneOfPerm?: boolean;
}
/**
 * 对 某资源的某操作鉴权
 * actions: 当前资源需要的操作权限
 * perm: 用户对当前资源所拥有的权限
 **/
const judge = (actions: string[], perm: string[]) => {

  if (!perm || !perm.length) {
    return false;
  }
  // 用户拥有这个资源的全部权限。
  // perm = ['*']
  if (perm.join('') === '*') {
    return true;
  }

  return actions.every((action) => perm.includes(action));
};
/**
 *  对某资源鉴权
 *  params: resource + actions
 *  userPermission: 用户所拥有的权限
 **/
const auth = (params: Auth, userPermission: UserPermission) => {
  const { resource, actions = [] } = params;
  // 当前 resource 是一个正则
  // console.log("resource instanceof RegExp",resource instanceof RegExp)
  if (resource instanceof RegExp) {
    
    const permKeys = Object.keys(userPermission);
    // 获取用户与之匹配的资源
    const matchPermissions = permKeys.filter((item) => item.match(resource));
    // 对匹配的所有资源的权限进行判断。
    if (!matchPermissions.length) {
      return false;
    }
    return matchPermissions.every((key) => {
      const perm = userPermission[key];
      return judge(actions, perm);
    });

  }
  // resource 是一个简单的字符串。
  const perm = userPermission[resource];
  return judge(actions, perm);
};
/**
 * 多个资源组合鉴权
 * params: resource + actions 数组
 * userPermission: 用户权限
 **/
export default (params: AuthParams, userPermission: UserPermission) => {
  const { requiredPermissions, oneOfPerm } = params;
  if (Array.isArray(requiredPermissions) && requiredPermissions.length) {
    let count = 0;
    for (const rp of requiredPermissions) {
      if (auth(rp, userPermission)) {
        count++;
      }
    }
     // 或操作 或者 且操作
    return oneOfPerm ? count > 0 : count === requiredPermissions.length;
  }
  return true;
};
