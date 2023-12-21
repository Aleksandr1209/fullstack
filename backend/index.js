const express = require('express')
const categoryRouter = require('./routes/category.routes')
const productRouter = require('./routes/product.routes')
const cors = require('cors');
const PORT = process.env.PORT || 3001

const app = express()
app.use(cors());

app.use(express.json())
app.use('/api', categoryRouter)
app.use('/api', productRouter)



app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`)
})