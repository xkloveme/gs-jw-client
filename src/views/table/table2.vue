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
      <el-table-column
        prop="source"
        label="标的物"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.source"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>
            {{ scope.row.source }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="具体地址">
        <template slot-scope="scope">
          <el-input
            v-model.trim="scope.row.address"
            v-if="!$attrs.hiddenOptions"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>
            {{ scope.row.source }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="transactionPrice" label="交易价格">
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.transactionPrice"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>
            {{ scope.row.transactionPrice }}
          </div>
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
      return this.$store.getters.getUser?.rentalGarage;
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
        rentalGarage: [
          {
            source: "", // 标的物
            address: "", // 具体地址
            transactionPrice: "", // 交易价格
          },
        ],
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        let arr = [];
        this.tableData.map((item) => {
          arr.push(item.source);
          arr.push(item.address);
          arr.push(item.transactionPrice);
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
        source: "", // 标的物
        address: "", // 具体地址
        transactionPrice: "", // 交易价格
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
