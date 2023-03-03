// 将四个模块的接口函数一起暴露
import * as tradeMark from './product/tradeMark'
import * as sku from './product/sku'
import * as spu from './product/spu'
import * as attr from './product/attr'

// 将权限管理模块引入
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'
// 默认暴露
export default {
    tradeMark,
    sku,
    spu,
    attr,
    user,
    role,
    permission
}