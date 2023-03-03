import request from '@/utils/request'

// sku列表的数据
export const reqSkuList = (page, limit) => {
    return request.get(`/admin/product/list/${page}/${limit}`)
}
// 上架
export const reqSale = (skuId) => {
    return request.get(`/admin/product/onSale/${skuId}`)
}
// 下架
export const reqCancel = (skuId) => {
    return request.get(`/admin/product/cancelSale/${skuId}`)
}
// 获取sku详情的接口
export const reqSkuById = (skuId) => {
    return request.get(`/admin/product/getSkuById/${skuId}`)
}