import { CONTRACT_DATA, AGENT_DATA } from '../../../../utils/constant.js'

export default {
  data () {
    return {
      formData: new FormData(),
      contract: Object.assign({}, CONTRACT_DATA, AGENT_DATA)
    }
  }
}
