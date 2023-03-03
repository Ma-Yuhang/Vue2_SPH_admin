import request from '@/utils/request'

// 获取spu列表数据的接口
export const reqSpuList = (page, limit, category3Id) => {
    return request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
}

// 修改spu时 获取spu信息的接口
export const reqSpu = (spuId) => {
    return request.get(`/admin/product/getSpuById/${spuId}`)
}
// 修改spu时 获取品牌信息的接口
export const reqTradeMarkList = () => {
    return request.get(`/admin/product/baseTrademark/getTrademarkList`)
}
// 修改spu时 获取spu图片的接口
export const reqSpuImageList = (spuId) => {
    return request.get(`/admin/product/spuImageList/${spuId}`)
}
// 修改spu时 获取平台全部销售属性的接口 整个平台销售属性都是最多三个
export const reqBaseSaleAttrList = () => {
    return request.get(`/admin/product/baseSaleAttrList`)
}

// 修改或添加spu保存后提交数据给服务器的接口
// 对于修改或者添加，携带给服务器的参数大致一样，唯一的区别在于修改spu有id，添加spu没有id
export const reqAddOrUpdateSpu = (spuInfo) => {
    // 如果有id 证明是修改
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
    } else {
        // 没有id 是添加
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    }
}
// 删除spu的接口
export const reqDeleteSpu = (spuId) => {
    return request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
}

// 获取销售属性数据的接口
export const reqSpuSaleAttrList = (spuId) => {
    return request.get(`admin/product/spuSaleAttrList/${spuId}`)
}
// 获取平台属性数据的接口
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request.get(`admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
}
// 添加sku的接口
export const reqAddSku = (skuInfo) => {
    return request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })
}
// 获取sku列表数据的接口
export const reqSkuList = (spuId) => {
    return request.get(`/admin/product/findBySpuId/${spuId}`)
}