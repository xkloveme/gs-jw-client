/**
 * checkPassword,是对password的校验,
 * other,是其他项类似备注的,
 * tableStatus是表的标示,有无此类情况格式类似tableStatus:{table1:1,table2:0},1为有2为没有
 */
const db = {
  uid: '', // 生成数据表唯一id
  version: '', // 版本号
  password: '', // 密码
  checkPassword: '', // 确认密码
  name: '', // 姓名
  gender: '', // 性别
  idCard: '', // 身份证号
  phone: '', // 手机号
  employer: '', // 工作单位
  duty: '', // 现任职务
  politicsStatus: '', // 政治面貌
  work: '', // 分管工作
  marriage: "",//婚姻
  like: "",//个人爱好
  homeAddress: "",//家庭地址
  income: "",//工资收入
  otherIncome: "",//其他收入
  homeYearIncome: '',//家庭年收入
  grade: '', // 职级
  spouseName: "",//配偶信息姓名
  spouseIdCard: '', // 配偶信息身份证号
  spousePhone: '', // 配偶信息手机号
  spousedEmployer: '', // 配偶信息工作单位
  spousedDuty: '', // 配偶信息职务
  spouseYearIncome: '', // 配偶信息年度收入
  phones: [{
    phone: '',//报告人手机号
    spousePhone: '',//配偶手机号
  }],
  // resume: [{
  //   time: [],
  //   startTime: '',//开始时间
  //   endTime: '',//结束时间
  //   unitName: '',//单位
  //   department: '', // 科室
  //   job: ''// 职务
  // }], // 工作简历
  // 租用房屋情况
  house: [{
    source: '', // 标的物
    address: '', // 具体地址
    transactionPrice: '' // 交易价格
  }],
  // 租用车库（位）情况
  rentalGarage: [{
    source: '', // 标的物
    address: '', // 具体地址
    transactionPrice: '' // 交易价格
  }],
  // 拒收及上交礼金、礼品、烟票、有价证券的时间、数量、种类
  gift: [{
    time: '', // 时间
    num: '', // 数量
    type: '' // 种类
  }],
  // 个人因公出国考察(培训)和因私出国(境)情况  // 出国情况
  travelAbroad: [{
    startTime: '',
    endTime: '',
    address: '',//地点
    money: '',//费用来由
    reasons: '', // 出国事由
  }],
  // 配偶、子女及其配偶出国(境)工作、留学、移(定)居情况
  childMoved: [{
    title: '', // 称谓
    time: '',
    nation: '',//国家
    city: '',//城市
    money: '',//费用来由
    reasons: '', // 出国事由
  }],
  // 购、借、租公共资产(车、财物)等情况(财物名称及来源、时间、费用)
  publicAssets: [{
    title: '', // 财务名称
    source: '',//来源
    time: '',
    money: '',//费用来由
  }],
  // 借贷情况(借贷对象、时间、金额
  borrow: [{
    title: '', // 借贷对象
    time: '',
    money: '',//金额
    vadish: '',//是否管理服务对象及其亲
  }],
  // 本人、配偶、子女及其配偶投资非上市公司、企业的情况
  partnership: [{
    title: '',
    businessScope: '', // 经营范围
    // marketSubjectType: '', // 企业性质
    money: '', // 注册资金
    personalContribution: '', // 投资金额
    fundedRatio: '' // 出资比例
  }],
  // 本人、配偶、子女及其配偶注册个体工商户、个人独资企业或者合伙企业的情况
  partnershipListed: [{
    title: '',
    time: '',
    businessScope: '', // 经营范围
    marketSubjectType: '', // 企业性质
    money: '', // 注册资金
    personalContribution: '', // 投资金额
    fundedRatio: '' // 出资比例
  }],
  // 配偶、子女及其配偶在银行任职情况(银行名称、所任职务、任职时间)
  bank: [{
    title: '', // 与本人关系
    name: '', // 姓名
    bank: '',    // 任职银行
    bankDuty: '', // 职务
    time: '',// 任职时间
    vadish: '', // 有无公款存放其任职银行
  }],
  // 利用名贵特产类特殊资源谋取私立问题：违规公款购买、收送、占用、插手干预，本人或配偶子女及其配偶、特定关系人违规参与经营等情况
  expensive: [{
    title: '', // 与本人关系
    name: '', // 姓名
    bank: '',    // 任职银行
    bankDuty: '', // 职务
    time: '',// 任职时间
    vadish: '', // 有无公款存放其任职银行
  }],
  // 亲属情况
  networking: [
    {
      relationship: '', // 本人关系
      name: '',
      idCard: '',
      marketSubjectType: '', // 单位性质
      politicsStatus: '', // 政治面貌
      work: '', // 现任职务
      desc: '' // 备注
    }
  ],
  // 房产交易情况
  homestead: [{
    people: '', // 产权人
    source: '', // 房产来源
    propertyNature: '', // 产权性质
    address: '', // 具体地址
    area: '', // 建筑面积
    transactionTime: '', // 交易时间
    transactionPrice: '', // 交易价格
    saleTime: "", // 出售时间
    salePrice: "", // 出售价格
     rentTime: "", // 出租时间
    rentPrice: "", // 出租价格
  }],
  // 本人配偶车辆情况
  car: [{
    people: '', // 车辆所有人
    brand: '', // 品牌
    time: '', // 购买时间
    price: '', // 价格
    carNumber: '', // 车牌号
    desc: '' // 备注
  }],
  // 出国证件情况
  travelDocuments: [{
    people: '', // 拥有人
    name: '', // 证件名称
    number: '', // 证件号码
    time: '', // 发证时间
    startTime: '',//证件有效期起
    endTime: '',//证件有效期止
    custodyInstitutions: ''// 保管机构
  }],
  // 投资
  invest: [{
    people: "",// 持有人
    name: '',
    type: '',//财产类型
    code: '', // 代码
    num: '', // 数量
    marketValue: '',// 市值
    desc: '',// 备注
  }],
  other: '',// 其他需要说明的
  tableStatus: {},
}
module.exports = db
