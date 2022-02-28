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
        :width="this.$attrs.hiddenOptions ? 50 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-select v-model="scope.row.title" placeholder="请选择">
            <el-option
              v-for="item in $utils.familiesType10"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" slot-scope="scope" v-else>{{
          scope.row.title | filterSelect($utils.familiesType10)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        :width="this.$attrs.hiddenOptions ? 50 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.name" size="mini" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <el-table-column
        prop="bank"
        :width="this.$attrs.hiddenOptions ? 80 : 180"
        label="任职银行"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.bank" size="mini" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <el-table-column
        prop="bankDuty"
        label="职务"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.bankDuty"
            size="mini"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="任职时间"
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
        <template scope="scope" slot-scope="scope" v-else>{{ scope.row.time | dateDay }}</template>
      </el-table-column>
      <el-table-column
        prop="vadish"
        label="是否公款存放其任职银行"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-select v-model="scope.row.vadish" placeholder="请选择">
            <el-option
              v-for="item in $utils.livingTogether"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" slot-scope="scope" v-else>{{
          scope.row.isLife | filterSelect($utils.livingTogether)
        }}</template>
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
      return this.$store.getters.getUser?.expensive;
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
        expensive: [
          {
            title: "", // 与本人关系
            name: "", // 姓名
            bank: "", // 任职银行
            bankDuty: "", // 职务
            time: "", // 任职时间
            vadish: "", // 有无公款存放其任职银行
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
          arr.push(item.name);
          arr.push(item.bank);
          arr.push(item.bankDuty);
          arr.push(item.time);
          arr.push(item.vadish);
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message:
              "请检查称谓、姓名、移居国家、居住城市、移居国家证件号码、移居时间是否有误",
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
