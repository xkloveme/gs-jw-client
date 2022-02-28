/* eslint-disable */
<template>
  <el-tabs class="home-title" disabled type="card" v-model="editableTabsValue">
    <el-tab-pane
      :key="i++"
      disabled
      :label="item.title"
      :name="item.name"
      v-for="(item, i) in editableTabs"
    >
      <p v-if="item.desc">
        {{ i - 1 }}、{{ item.desc }}
        <el-tooltip v-if="item.note" :content="item.note" class="item" effect="dark">
          <i class="el-icon-question" />
        </el-tooltip>
        <el-radio label="1" style="margin-left: 30px" v-model="tableStatus[item.content]"
          >有此类情况</el-radio
        >
        <el-radio label="2" v-model="tableStatus[item.content]">无此类情况</el-radio>
        <el-radio label="3" v-model="tableStatus[item.content]">无变化</el-radio>
      </p>
      <div style="color: red; margin: 10px 0px">
        {{ item.note }}
      </div>
      <component :is="item.content" :hiddenOptions="false" :tableStatus="tableStatus[item.content]" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import userInfo from "./userInfo";
import table1 from "./table/table1";
import table2 from "./table/table2";
import table3 from "./table/table3";
import table4 from "./table/table4";
import table5 from "./table/table5";
import table6 from "./table/table6";
import table7 from "./table/table7";
import table8 from "./table/table8";
import table9 from "./table/table9";
import table10 from "./table/table10";
import table11 from "./table/table11";
import table12 from "./table/table12";
import table13 from "./table/table13";
import table14 from "./table/table14";
import table15 from "./table/table15";
import table16 from "./table/table16";
import table17 from "./table/table17";
export default {
  components: {
    userInfo,
    table1,
    table2,
    table3,
    table4,
    table5,
    table6,
    table7,
    table8,
    table9,
    table10,
    table11,
    table12,
    table13,
    table14,
    table15,
    table16,
    table17,
  },
  data() {
    return {
      // editableTabsValue: '0',
      editableTabs: [
        {
          title: "基本信息",
          content: "userInfo",
        },
        {
          title: "表1",
          desc: "租用房屋情况",
          note: "填表说明：只要是登记在本人、配偶、子女名下的房产均需填报。",
          content: "table1",
        },
        {
          title: "表2",
          desc: "租用车库（位）情况",
          note: "填表说明：只要是登记在本人、配偶、子女名下的车库均需填报。",
          content: "table2",
        },
        {
          title: "表3",
          desc: "拒收及上交礼金、礼品、烟票、有价证券的时间、数量、种类",
          note:
            "填报说明：本人拒收及上交礼金、礼品、烟票、有价证券的时间、数量、种类情况",
          content: "table3",
        },
        {
          title: "表4",
          desc: "个人因公出国考察(培训)和因私出国(境)情况",
          note: "填报说明：本人近3年因私出入国（境）情况",
          content: "table4",
        },
        {
          title: "表5",
          desc: "配偶、子女及其配偶出国(境)工作、留学、移(定)居情况",
          note: "填报说明：配偶、子女及其配偶出国(境)工作、留学、移(定)居情况",
          content: "table5",
        },
        {
          title: "表6",
          desc: "购、借、租公共资产(车、财物)等情况(财物名称及来源、时间、费用)",
          note:
            "填报说明：填报本人购、借、租公共资产(车、财物)等情况(财物名称及来源、时间、费用)",
          content: "table6",
        },
        {
          title: "表7",
          desc: "借贷情况(借贷对象、时间、金额)",
          note: "填报说明：本人借贷情况(借贷对象、时间、金额)",
          content: "table7",
        },
        {
          title: "表8",
          desc: "本人、配偶、子女及其配偶投资非上市公司、企业的情况",
          note:
            "填报说明：包括国（境）内外注册或投资入股非上市企业的；私募基金、信托产品投资企业的；代持股份或将身份证借与他人注册或投资企业，即使未参与经营也未出资未获利的；已变更或停止经营活动，但市场监管部门未完成变更或注销的；未开展经营活动、已停止经营活动、被吊销营业执照但未办理注销手续的；持有上市或非上市企业股份的；均需填报",
          content: "table8",
        },
        {
          title: "表9",
          desc: "本人、配偶、子女及其配偶注册个体工商户、个人独资企业或者合伙企业的情况",
          note:
            "填报说明：本人、配偶、子女及其配偶注册个体工商户、个人独资企业或者合伙企业的情况",
          content: "table9",
        },
        {
          title: "表10",
          desc: "配偶、子女及其配偶在银行任职情况(银行名称、所任职务、任职时间)",
          note:
            "填报说明：配偶、子女及其配偶在银行任职情况(银行名称、所任职务、任职时间)",
          content: "table10",
        },
        {
          title: "表11",
          desc:
            "利用名贵特产类特殊资源谋取私立问题：违规公款购买、收送、占用、插手干预，本人或配偶子女及其配偶、特定关系人违规参与经营等情况",
          note:
            "填报说明：利用名贵特产类特殊资源谋取私立问题：违规公款购买、收送、占用、插手干预，本人或配偶子女及其配偶、特定关系人违规参与经营等情况",
          content: "table11",
        },
        {
          title: "表12",
          desc: "亲属情况",
          note: "填报说明：亲属情况",
          content: "table12",
        },
        {
          title: "表13",
          desc: "房产情况",
          note:
            "填报说明：原为本人、配偶、子女名下的房产（含农村自建房），现已出售或正在出售并办理网签（签订出售合同）的；均需填报。",
          content: "table13",
        },
        {
          title: "表14",
          desc: "车辆情况",
          note:
            "填报说明：登记在本人及配偶名下车辆；由本人、配偶出资购买或者与他人合资购买的车辆，不论产权是否登记在本人及配偶名下；均需填报。",
          content: "table14",
        },
        {
          title: "表15",
          desc: "因私出国",
          note: "填报说明：因私出国",
          content: "table15",
        },
        {
          title: "表16",
          desc: "本人投资情况",
          note:
            "填报说明：不论何种方式购买，凡属于投资的产品，填报前一交易日未了结的在途交易投资；他人出资但在本人、配偶、子女名下的投资；均需填报",
          content: "table16",
        },
        {
          title: "其他事项",
          desc: "个人认为需要报告的其他事项",
          note:
            "填报说明：在上述各事项中尚未完全说明或未能涉及的事项，个人认为需要向组织报告的，可在此栏中详细说明。",
          content: "table17",
        },
      ],
    };
  },
  computed: {
    tableStatus() {
      return this.$store.getters.getTableStatus;
    },
    editableTabsValue: {
      get: function () {
        return String(this.$store.getters.getStatus);
      },
      set: function (value) {
        console.log("🐛 ~ file: Home.vue ~ line 233 ~ value", value);
        // this.$store.commit('setStatus', value)
      },
    },
  },
  methods: {},
};
</script>

<style>
.home-title > .is-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;
}
.home-title > .el-tabs__content {
  margin-top: 50px;
}
</style>
