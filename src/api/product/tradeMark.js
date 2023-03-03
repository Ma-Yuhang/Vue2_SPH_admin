// 品牌管理的数据模块
import request from '@/utils/request'

// 获取品牌列表的接口
export const reqTradeMarkList = (page, limit) => {
    return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
}
// 添加品牌和修改品牌的接口 添加品牌不需要带id 修改品牌需要带id
export const reqAddOrUpdateTradeMark = tradeMark => {
    // 如果有id 证明是修改
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}
// 删除品牌的接口
export const reqDeleteTradeMark = (id) => {
    return request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
}