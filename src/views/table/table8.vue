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
        <template slot-scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="企业名称">
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.title"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="businessScope" label="经营范围">
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.businessScope"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.businessScope }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="marketSubjectType" label="企业性质">
        <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.marketSubjectType"
            size="mini"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column> -->

      <el-table-column prop="money" label="注册资金(万)">
        <template slot-scope="scope">
          <el-input-number
            :min="0"
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.money"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.money }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="personalContribution" label="投资金额(万)">
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.personalContribution"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.personalContribution }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="fundedRatio" label="所占份额(%)">
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.fundedRatio"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.fundedRatio }}</div>
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
      return this.$store.getters.getUser?.partnership;
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
        partnership: [
          {
            title: "",
            businessScope: "", // 经营范围
            // marketSubjectType: "", // 企业性质
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
          arr.push(item.businessScope);
          // arr.push(item.marketSubjectType);
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
        businessScope: "", // 经营范围
        // marketSubjectType: "", // 企业性质
        money: "", // 注册资金
        personalContribution: "", // 投资金额
        fundedRatio: "", // 出资比例
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
