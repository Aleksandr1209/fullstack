const db = require('../db') 
class ProductController {
    async createProduct(req, res) {
        const {title, img, descr, category, price} = req.body
        const newProduct = await db.query(`INSERT INTO goods (title, img, descr, category, price) values ($1, $2, $3, $4, $5) RETURNING *`, [title, img, descr, category, price])
        res.json(newProduct.rows[0])
    }

    async getGoods(req, res) {
        const goods = await db.query('SELECT * FROM goods')
        res.json(goods.rows)
    }

    async getOneProduct(req, res) {
        const id = req.params.id
        const product = await db.query('SELECT * FROM goods where id = $1', [id])
        res.json(product.rows[0])
    }

    async updateProduct(req, res) {
        const {id, title, img, descr, category, price} = req.body
        const product = await db.query(
            'UPDATE goods set title = $1, img = $2, descr = $3, category = $4, price = $5 where id = $6 RETURNING *', 
            [title, img, descr, category, price, id]
        )
        res.json(product.rows[0])
    }

    async deleteProduct(req, res) {
        const id = req.params.id
        const product = await db.query('DELETE FROM goods where id = $1', [id])
        res.json(product.rows[0])
    }
}

module.exports = new ProductController()