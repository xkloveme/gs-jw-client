<template>
  <div>
    <el-table
      :data="tableData"
      v-show="tableStatus == '1'"
      class="tb-edit"
      :border="!$attrs.hiddenOptions"
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="操作" v-if="!$attrs.hiddenOptions" :width="80">
        <template scope="scope" slot-scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="企业名称">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.title" size="mini" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="投资时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.time"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" slot-scope="scope" v-else>{{
          scope.row.time | dateDay
        }}</template>
      </el-table-column>
      <el-table-column prop="businessScope" label="经营范围">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.businessScope"
            size="mini"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="marketSubjectType"
        label="企业性质"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-select v-model="scope.row.marketSubjectType" placeholder="请选择">
            <el-option
              v-for="item in $utils.marketEntities"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" slot-scope="scope" v-else>{{
          scope.row.marketSubjectType | filterSelect($utils.marketEntities)
        }}</template>
      </el-table-column>

      <el-table-column prop="money" label="注册资金(万)">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input-number
            :min="0"
            v-model.trim="scope.row.money"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="personalContribution" label="投资金额(万)">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input-number
            :min="0"
            v-model.trim="scope.row.personalContribution"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="fundedRatio" label="出资比例(%)">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input-number
            :min="0"
            v-model.trim="scope.row.fundedRatio"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <div
        slot="append"
        style="cursor: pointer; line-height: 30px; text-align: center"
        @click="handleAddLine"
        v-if="!$attrs.hiddenOptions"
      >
        <i class="el-icon-circle-plus-outline" />
        添加一行
      </div>
    </el-table>
    <el-row
      type="flex"
      style="margin: 30px"
      justify="center"
      v-if="!$attrs.hiddenOptions"
    >
      <el-button @click="handleGoPrevPage">上一项</el-button>
      <el-button @click="handleEmpty" type="primary">重置</el-button>
      <el-button @click="handleGoNextPage">下一项</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tableStatus: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    tableData() {
      return this.$store.getters.getUser?.partnershipListed;
    },
  },
  methods: {
    handleDelete(index, row) {
      if (this.tableData.length > 1) {
        this.tableData.splice(index, 1);
      } else {
        this.$message({
          type: "info",
          message: "已经是最后一个了,不能再删了",
        });
      }
    },
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch("updateStatusSubtract");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        partnershipListed: [
          {
            title: "",
            time: "",
            businessScope: "", // 经营范围
            marketSubjectType: "", // 企业性质
            money: "", // 注册资金
            personalContribution: "", // 投资金额
            fundedRatio: "", // 出资比例
          },
        ],
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        let arr = [];
        this.tableData.map((item) => {
          arr.push(item.title);
          arr.push(item.time);
          arr.push(item.businessScope);
          arr.push(item.marketSubjectType);
          arr.push(item.money);
          arr.push(item.personalContribution);
          arr.push(item.fundedRatio);
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message: "请检查内容是否有误",
          });
        }
        this.$store.dispatch("updateStatus");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2" || this.tableStatus === "3") {
        this.$store.dispatch("updateStatus");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        title: "",
        time: "",
        businessScope: "", // 经营范围
        marketSubjectType: "", // 企业性质
        money: "", // 注册资金
        personalContribution: "", // 投资金额
        fundedRatio: "", // 出资比例
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
