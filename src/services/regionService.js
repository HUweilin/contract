import baseService from './baseService'
import storageService from './storageService'

import { APP_REGIONS } from '../utils/constant'

const apiUrl = '/region'

function getRegions () {
  let regions = storageService.getLocalStorage(APP_REGIONS)
  if (regions) {
    return new Promise(resolve => {
      resolve(regions)
    })
  }
  return baseService.getAll(apiUrl).then(regions => storageService.setLocalStorage(APP_REGIONS, regions))
}

export default { getRegions }
