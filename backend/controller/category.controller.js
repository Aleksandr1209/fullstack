const db = require('../db')
class CategoryController {
    async createCategory(req, res) {
        const {key, name} = req.body
        const newCategory = await db.query(`INSERT INTO categories (key, name) values ($1, $2) RETURNING *`, [key, name])
        res.json(newCategory.rows[0])
    }

    async getCategories(req, res) {
        const categories = await db.query('SELECT * FROM categories')
        res.json(categories.rows)
    }

    async getOneCategory(req, res) {
        const id = req.params.id
        const category = await db.query('SELECT * FROM categories where id = $1', [id])
        res.json(category.rows[0])
    }

    async updateCategory(req, res) {
        const {id, key, name} = req.body
        const category = await db.query(
            'UPDATE categories set key = $1, name = $2 where id = $3 RETURNING *', 
            [key, name, id]
        )
        res.json(category.rows[0])
    }

    async deleteCategory(req, res) {
        const id = req.params.id
        const category = await db.query('DELETE FROM categories where id = $1', [id])
        res.json(category.rows[0])
    }
}

module.exports = new CategoryController()