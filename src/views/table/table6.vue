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
      <el-table-column prop="title" label="财务名称">
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
      <el-table-column prop="source" label="来源">
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.source"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.source }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-date-picker
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.time"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
          <div slot-scope="scope" v-else>{{ scope.row.time | dateDay }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="money" label="费用(万元)">
        <template slot-scope="scope" >
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
      return this.$store.getters.getUser?.publicAssets;
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
        publicAssets: [
          {
            title: "", // 财务名称
            source: "", //来源
            time: "",
            money: "", //费用来由
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
          arr.push(item.source);
          arr.push(item.time);
          arr.push(item.money);
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
        title: "", // 财务名称
        source: "", //来源
        time: "",
        money: "", //费用来由
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
