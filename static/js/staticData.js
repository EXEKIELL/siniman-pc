import api from '../../src/api/index'
let orderType = ['一般订单（全屋）', '一般订单（橱柜）', '售后订单（全屋）', '售后订单（橱柜）', '新店上样屋）', '新店上样（橱柜）', '老店重装（全屋）', '老店重装（橱柜）', '内部订单（全屋）', '内部订单（橱柜）', '促销订单（全屋）', '促销订单（橱柜）', '项目订单（全屋）', '项目订单（橱柜）', 'C单（全屋）', 'C单（橱柜）', 'S单（全屋）', 'S单（橱柜）', '订单（门窗）', '工程单（门窗）', 'M订单（门窗）', '内部订单（门窗）', '订单配件服务（门窗）', '软件销售（门窗）', '售后销售（门窗）', '样板（门窗）', '赠送订单（门窗）'];
  let orderSort = ['A（柜）', undefined,'C（原材料）', 'D（柜+门）', 'DX（吸塑柜+门）', 'M（门）', 'MX（吸塑门）', 'G（改补）', 'S（散单）', 'MC(免漆木门)', 'HC(混油木门)', 'KC(烤漆木门)', 'YC(原木木门)','订单', '工程单', 'M订单', '内部订单', '订单配件销售', '软件服务', '售后销售', '样板', '赠送订单'];
  let orderStatusStart = [];
  orderStatusStart['1'] = '新建中';
  orderStatusStart['2'] = '待审核';
  orderStatusStart['3'] = '审核中';
  orderStatusStart['4'] = '已审核待估款';
  orderStatusStart['5'] = '已估款待核款';
  orderStatusStart['6'] = '已核款生产中';
  orderStatusStart['7'] = '已入库';
  orderStatusStart['8'] = '工厂已发货';
  orderStatusStart['9'] = '已收货';
  orderStatusStart['10'] = '已派工';
  orderStatusStart['11'] = '已安装';
  orderStatusStart['12'] = '完成';
  orderStatusStart['21'] = '已退回';
  orderStatusStart['22'] = '已作废';

  export default {
    orderType,
    orderSort,
    orderStatusStart,
  }
