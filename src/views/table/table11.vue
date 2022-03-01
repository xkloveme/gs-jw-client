<template>
  <div>
    <el-input
      v-model.trim="tableData"
      type="textarea"
      :rows="20"
      maxlength="1000"
      show-word-limit
      placeholder="请输入内容"
    />
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
    tableData: {
      get: function () {
        return this.$store.getters.getUser?.expensive;
      },
      set: function (newValue) {
        this.$store.dispatch("updateUser", {
          expensive: newValue,
        });
      },
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
        expensive: "",
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        if (!this.tableData) {
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
        title: "", // 与本人关系
        name: "", // 姓名
        bank: "", // 任职银行
        bankDuty: "", // 职务
        time: "", // 任职时间
        vadish: "", // 有无公款存放其任职银行
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
