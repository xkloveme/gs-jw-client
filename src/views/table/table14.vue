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
      <el-table-column prop="agency" label="操作" v-if="!$attrs.hiddenOptions">
        <template slot-scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="people"
        label="产权人"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.people"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.people }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="brand"
        label="车辆型号"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.brand"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.brand }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="购买时间"
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
          <div v-else>{{ scope.row.time | dateDay }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(万元)"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.price"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.price }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="carNumber"
        label="车牌号码"
        :width="this.$attrs.hiddenOptions ? 100 : 250"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.carNumber"
            size="mini"
            type="text"
            disabled
            placeholder="请输入内容"
          >
            <template slot="prepend">
              <LicenseKeyboard
                v-model="scope.row.carNumber"
                keyBorderColor="#409eff"
                title="点击"
              />
            </template>
          </el-input>
          <div v-else>{{ scope.row.carNumber }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注">
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.desc"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.desc }}</div>
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
import { isLicensePlate } from "../../common.js";
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
      return this.$store.getters.getUser?.car;
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
        car: [
          {
            people: "",
            brand: "", // 品牌
            time: "", // 购买时间
            price: "", // 价格
            carNumber: "", // 车牌号
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
          arr.push(item.brand);
          arr.push(item.time);
          arr.push(item.price > 0);
          arr.push(isLicensePlate(item.carNumber));
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
        people: "",
        brand: "", // 品牌
        time: "", // 购买时间
        price: "", // 价格
        carNumber: "", // 车牌号
        desc: "", // 备注
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
