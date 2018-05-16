import api from '../../src/api/index'
import store from '../../src/store/index'

function addr() {
  let address = [];
  let province = [];
  let city = [];
  let region = [];
  api.axiosPost('/area/getByIds'+store.state.login.str1,1,{
    ids:[]
  },function (res) {
    for (var i = 0; i < res.data.length; i++) {
      if(res.data[i].parentId == null){
        province.push(res.data[i])
      }
    }
  })
  if(address>0){

  }
}

//省
export default {
  address:addr
}


