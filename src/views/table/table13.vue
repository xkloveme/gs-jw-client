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
      <el-table-column
        prop="agency"
        :width="50"
        label="操作"
        v-if="!$attrs.hiddenOptions"
      >
        <template slot-scope="scope">
          <span>
            <i
              style="color: #f56c6c"
              class="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </span>
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
        prop="source"
        label="房产来源"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template slot-scope="scope">
          <el-select
            v-if="!$attrs.hiddenOptions"
            v-model="scope.row.source"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in $utils.houseProperty"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
          <div v-else>{{ scope.row.source | filterSelect($utils.houseProperty) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="propertyNature"
        label="房产性质"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template slot-scope="scope">
          <el-select
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.propertyNature"
            clearable
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in $utils.propertyRight"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
          <div v-else>
            {{ scope.row.propertyNature | filterSelect($utils.propertyRight) }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="type"
        label="交易类型"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
          <el-select
            clearable
            v-model.trim="scope.row.type"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, i) in $utils.homesteadType"
              :key="item.key"
              :label="item.value"
              :value="i"
            />
          </el-select>
        </template>
        <template slot-scope="scope"   v-else>{{
          scope.row.type | filterSelect($utils.homesteadType)
        }}</template>
      </el-table-column> -->
      <el-table-column
        prop="address"
        label="具体地址"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.address"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.address }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="area"
        label="建筑面积(m²)"
        :width="this.$attrs.hiddenOptions ? 100 : 135"
      >
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.area"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.area }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="transactionTime"
        label="购入时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-date-picker
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.transactionTime"
            style="width: 150px"
            type="month"
            value-format="timestamp"
            placeholder="选择时间"
          />
          <div v-else>{{ scope.row.transactionTime | dateDay }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="transactionPrice"
        label="购入价格(万元)"
        :width="this.$attrs.hiddenOptions ? 100 : 135"
      >
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.transactionPrice"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.transactionPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="saleTime"
        label="出售时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-date-picker
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.saleTime"
            style="width: 150px"
            type="month"
            value-format="timestamp"
            placeholder="选择时间"
          />
          <div v-else>{{ scope.row.saleTime | dateDay }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="transactionPrice"
        label="出售价格(万元)"
        :width="this.$attrs.hiddenOptions ? 100 : 135"
      >
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.salePrice"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.salePrice }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="rentTime"
        label="出租时间"
        :width="$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-date-picker
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.rentTime"
            style="width: 150px"
            type="month"
            value-format="timestamp"
            placeholder="选择时间"
          />
          <div v-else>{{ scope.row.rentTime | dateDay }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="transactionPrice"
        label="出租价格(万元)"
        :width="$attrs.hiddenOptions ? 100 : 135"
      >
        <template slot-scope="scope">
          <el-input-number
            v-if="!$attrs.hiddenOptions"
            :min="0"
            v-model.trim="scope.row.rentPrice"
            size="mini"
            style="width: 100%"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.rentPrice }}</div>
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
      return this.$store.getters.getUser?.homestead;
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
        homestead: [
          {
            people: "", // 产权人
            source: "", // 房产来源
            propertyNature: "", // 产权性质
            address: "", // 具体地址
            area: "", // 建筑面积
            transactionTime: "", // 交易时间
            transactionPrice: "", // 交易价格
            saleTime: "", // 出售时间
            salePrice: "", // 出售价格
            rentTime: "", // 出租时间
            rentPrice: "", // 出租价格
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
          arr.push(item.source);
          arr.push(item.address);
          arr.push(item.area > 0);
          arr.push(item.propertyNature);
          arr.push(item.transactionTime);
          arr.push(item.transactionPrice >= 0);
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
        people: "", // 产权人
        source: "", // 房产来源
        propertyNature: "", // 产权性质
        address: "", // 具体地址
        area: "", // 建筑面积
        transactionTime: "", // 交易时间
        transactionPrice: "", // 交易价格
        saleTime: "", // 出售时间
        salePrice: "", // 出售价格
        rentTime: "", // 出租时间
        rentPrice: "", // 出租价格
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
