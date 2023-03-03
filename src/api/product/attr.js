import request from '@/utils/request'

// 一级商品分类的接口
export const reqCategory1List = () => {
    return request({ url: '/admin/product/getCategory1', method: 'get' })
}
// 二级商品分类的接口
export const reqCategory2List = (category1Id) => {
    return request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
}
// 三级商品分类的接口
export const reqCategory3List = (category2Id) => {
    return request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })
}
// 获取平台属性的接口
export const reqAttrList = (category1Id, category2Id, category3Id) => {
    return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
}
// 添加属性后保存的接口与修改属性的接口
export const reqAddOrUpdateAttr = (data) => {
    return request({ url: `/admin/product/saveAttrInfo`, method: 'post', data })
}