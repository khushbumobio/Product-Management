const Category = require("../models/categories")
const Product = require("../models/products")
const config = require("../config/config.js")
const logger = require('../logger/logger')
const QRCode = require('qrcode');
const { json } = require("body-parser");
var fs = require('fs');



class productService {
    
    /**
         * create product
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async createProduct(requestParams) {
        try {
            console.log(requestParams)
                if (!((requestParams.category_id) || (requestParams.name) || (requestParams.description) )) {
                    return ({ error: config.emptyFields });
                }
                let data ={
                    "name":requestParams.name,
                    "category_id":requestParams.category_id,
                    "description":requestParams.description,
                }
                let stringdata = JSON.stringify(data)
                let path='src/images/'+requestParams.name+Date.now()
                +'.png'
                QRCode.toFile(path,stringdata,(err)=>{
                        if(err) throw err;
                    })
                requestParams.qrCode=path
                const createdProduct = await Product.create(requestParams);
                
                logger.info({ message: "product created", info: createdProduct});
                return ({
                    success: config.recordCreated,
                });
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }



    /**
     * product
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async listProduct(requestQueries) {
        try {
            var sortObject = {};
            const limit = requestQueries.limit
            const page = requestQueries.page
            const sort = requestQueries.sort
            const sortingMethod = requestQueries.sortingMethod
            var key = requestQueries.key
            if (!key) {
                key = ''
            }
            var productData;
            var orderBy;
            (sortingMethod === 'desc') ? orderBy = '-1' : orderBy = '1'
            var skip;
            (page <= 1) ? skip = 0 : skip = (page - 1) * limit
            sortObject[sort] = orderBy;
            productData = await Product.find({
                "$or": [
                    { "name": { $regex: key } },
                    { "description": { $regex: key } },
                ]
            })
                .collation({ locale: "en" })
                .sort(sortObject)
                .skip(skip)
                .limit(limit)
                .exec()

            if (!productData) {
                return ({ error: config.userNotFound });
            }
            // call getProductData 
            var finalProductData = await formatProduct(productData)
            return ({ data: finalProductData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * edit product
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async editProduct(catId) {
        try {
            const id = catId
            const data = await Product.findOne({ _id: id })
            if (!data) {
                return ({ error: config.dataNotFound });
            }
            const productData = {
                'id': data._id,
                'name': data.name,
                'category_id':data.category_id,
                'description':data.description,
                'qrCode':data.qrCode,
                'createdBy':data.createdBy
            }
            return ({ data: productData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * update product
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async updateProduct(id, requestParams) {
        try {
            // const updates = Object.keys(requestParams)
            // const allowedUpdates = ['name','category_id','description']
            // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

            // if (!isValidOperation) {
            //     return ({ error: config.invalidProductUpdates })
            // }
            let data ={
                "name":requestParams.name,
                "category_id":requestParams.category_id,
                "description":requestParams.description,
            }
            let stringdata = JSON.stringify(data)
            let path='src/images/'+requestParams.name+Date.now()
            +'.png'
            QRCode.toFile(path,stringdata,(err)=>{
                    if(err) throw err;
                })

            let oldQr=await Product.findOne({ _id: id })
            fs.unlinkSync(oldQr.qrCode);

            requestParams.qrCode=path
            const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, requestParams)
            logger.info({ message: "Product updated" }, { info: updatedProduct });
            return ({ success: config.recordUpdated })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * delete product
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async deleteProduct(productId) {
        try {
            const data = await Product.findOne({ _id: productId })
            if (data) {
                const deletedProduct = await Product.deleteOne({ _id: productId })
                logger.info({ message: "Product deleted", info: deletedProduct });
                return ({
                    success: config.recordDeleted
                });
            }
            return ({
                error: config.noData
            });
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }


}

/**
* format product data
* @param {object} publisher 
* @returns {object}
* @author khushbuw
*/
const formatProduct = async (product) => {
    var productDataMap = product.map((product) => {
        return {
            'id': product._id,
            'category_id':product.category_id,
            'name': product.name,
            'description':product.description,
            "qrCode":product.qrCode,
            'createdBy':product.createdBy
        };
    })
    return productDataMap;
}

module.exports = productService;