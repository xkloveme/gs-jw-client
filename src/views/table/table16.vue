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
        prop="people"
        label="持有人姓名"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.people" size="mini" placeholder="请输入内容" />
        </template>
        <template scope="scope" slot-scope="scope" v-else>
          <span>{{ scope.row.people }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="财产种类"
        :width="this.$attrs.hiddenOptions ? 50 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-select v-model="scope.row.type" placeholder="请选择">
            <el-option
              v-for="item in $utils.moneyType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" slot-scope="scope" v-else>{{
          scope.row.type | filterSelect($utils.moneyType)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        :width="this.$attrs.hiddenOptions ? 200 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.name" size="mini" placeholder="请输入内容" />
        </template>
        <template scope="scope" slot-scope="scope" v-else>
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="stockName"
        label="代码"
        :width="this.$attrs.hiddenOptions ? 200 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.code" size="mini" placeholder="请输入内容" />
        </template>
        <template scope="scope" slot-scope="scope" v-else>
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        :width="this.$attrs.hiddenOptions ? 200 : 180"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input-number
       :min="0"
            v-model.trim="scope.row.num"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" slot-scope="scope" v-else>
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stockMarketValue" label="市值（万元）">
        <template slot="header" slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="填报前一交易日净值/市值/总金额(万元)"
            placement="top-start"
          >
            <span>
              市值（万元）
              <i class="el-icon-info"></i>
            </span>
          </el-tooltip>
        </template>
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input-number
       :min="0"
            v-model.trim="scope.row.marketValue"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" slot-scope="scope" v-else>
          <span>{{ scope.row.marketValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="stockName"
        label="备注"
        :width="this.$attrs.hiddenOptions ? 200 : null"
      >
        <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.desc" size="mini" placeholder="请输入内容" />
        </template>
        <template scope="scope" slot-scope="scope" v-else>
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <div slot="append" style="cursor: pointer; line-height: 30px">
        <div
          style="text-align: center"
          @click="handleAddLine"
          v-if="!$attrs.hiddenOptions"
        >
          <i class="el-icon-circle-plus-outline" />
          添加一行
        </div>
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
      return this.$store.getters.getUser?.invest;
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
    inputChange(currentValue, oldValue) {
      if (currentValue > 100) {
        this.$alert("单位为万元,请仔细核对", "⚠️注意⚠️", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `请您再次检查,您输入值的单位为万元`,
            });
          },
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
        invest: [
          {
            people: "", // 持有人
            name: "",
            type: "", //财产类型
            code: "", // 代码
            num: "", // 数量
            marketValue: "", // 市值
            desc: "", // 备注
          },
        ],
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        let arr = [];
        this.tableData.map((item) => {
          arr.push(item.people);
          arr.push(item.name);
          arr.push(item.type);
          arr.push(item.code);
          arr.push(item.num);
          arr.push(item.marketValue>0);
          arr.push(item.desc);
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
        people: "", // 持有人
        name: "",
        type: "", //财产类型
        code: "", // 代码
        num: "", // 数量
        marketValue: "", // 市值
        desc: "", // 备注
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
