import baseService from './baseService'

const apiUrl = '/brands'

function getBrands () {
  return baseService.getAll(apiUrl)
}

export default { getBrands }
