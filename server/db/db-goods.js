const sha1 = require('sha1')
const axios = require('axios')

const appId = 'A6005740038834'
const appKey = '728FDFAE-F066-BCFC-576B-1F07FFA9E2A9'
const className = 'goods'

const getHeaders = () => {
  const now = Date.now()
  return {
    'X-APICloud-AppId': appId,
    'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
  }
}

const request = axios.create({
  baseURL: `https://d.apicloud.com/mcm/api/${className}`
})

const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = {
  async getAllList(query) {
      return handleRequest(await request.get(`?filter=${JSON.stringify(query)}`, {
        headers: getHeaders()
      }))
  },
  async queryProductById(query) {
      return handleRequest(await request.get(`?filter=${JSON.stringify(query)}`, {
        headers: getHeaders()
      }))
  }
}