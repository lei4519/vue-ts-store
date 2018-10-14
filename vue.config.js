const data = require('./mock/goods.json')

module.exports = {
  devServer: {
    before (app) {
      app.get('/api/goods', (req, res) => {
        res.json(data)
      })
    }
  }
}
