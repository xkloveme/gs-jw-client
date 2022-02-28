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
      <el-table-column
        prop="title"
        label="称谓"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-select v-model="scope.row.title" placeholder="请选择">
            <el-option
              v-for="item in $utils.childrenType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" slot-scope="scope" v-else>{{
          scope.row.title | filterSelect($utils.childrenType)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
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

      <el-table-column prop="nation" label="国家">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.nation"
            size="mini"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="城市">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.city" size="mini" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <el-table-column prop="money" label="费用来由">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.money" size="mini" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <el-table-column prop="reasons" label="出国事由">
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.reasons"
            size="mini"
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
      return this.$store.getters.getUser?.childMoved;
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
        childMoved: [
          {
            title: "", // 称谓
            startTime: "",
            endTime: "",
            nation: "", //地点
            city: "", //城市
            money: "", //费用来由
            reasons: "", // 出国事由
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
          arr.push(item.nation);
          arr.push(item.city);
          arr.push(item.money);
          arr.push(item.reasons);
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
        title: "", // 称谓
        startTime: "",
        endTime: "",
        nation: "", //国家
        city: "", //城市
        money: "", //费用来由
        reasons: "", // 出国事由
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
