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
        prop="relationship"
        label="与本人关系"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-select
            v-model.trim="scope.row.relationship"
            v-if="!$attrs.hiddenOptions"
            filterable
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in list"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
          <div v-else>{{ scope.row.relationship | filterSelect(list) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.name"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope">
          <el-input
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.idCard"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ scope.row.idCard }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="birthday"
        label="出生日期"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.birthday"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template slot-scope="scope"   v-else>{{ scope.row.time | dateDay }}</template>
      </el-table-column> -->
      <el-table-column
        prop="politicsStatus"
        label="政治面貌"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template slot-scope="scope">
          <el-select
            v-if="!$attrs.hiddenOptions"
            v-model.trim="scope.row.politicsStatus"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, i) in $utils.politicsStatus"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
          <div v-else>
            {{ scope.row.politicsStatus | filterSelect($utils.politicsStatus) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="duty"
        label="工作单位及职务"
        :width="this.$attrs.hiddenOptions ? 150 : null"
      >
        <template slot-scope="scope">
          <el-input v-if="!$attrs.hiddenOptions" v-model.trim="scope.row.duty" size="mini" placeholder="请输入内容" />
           <div v-else>{{ scope.row.duty }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注">
        <template slot-scope="scope" >
          <el-input v-if="!$attrs.hiddenOptions" v-model.trim="scope.row.desc" size="mini" placeholder="请输入内容" />
           <div v-else>{{ scope.row.desc }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="marketSubjectType"
        label="企业性质"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
          <el-select v-model="scope.row.marketSubjectType" placeholder="请选择">
            <el-option
              v-for="item in $utils.marketEntities"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template slot-scope="scope"   v-else>{{
          scope.row.marketSubjectType | filterSelect($utils.marketEntities)
        }}</template>
      </el-table-column> -->
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
import { isIdentityCard } from "../../common.js";
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
      return this.$store.getters.getUser?.networking;
    },
    list() {
      if (this.$store.getters.getUser.gender === "2") {
        return this.$utils.womenRelationship;
      } else {
        return this.$utils.manRelationship;
      }
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
      this.$store.dispatch("updateStatusSubtract", "20");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        networking: [
          {
            relationship: "", // 本人关系
            name: "",
            idCard: "",
            // marketSubjectType: "", // 单位性质
            politicsStatus: "", // 政治面貌
            duty: "", // 现任职务
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
          arr.push(item.relationship);
          arr.push(item.name);
          arr.push(item.politicsStatus);
          // arr.push(item.marketSubjectType);
          arr.push(item.duty);
          arr.push(isIdentityCard(item.idCard));
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message: "请检查内容是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "22");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2" || this.tableStatus === "3") {
        this.$store.dispatch("updateStatus", "22");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        relationship: "", // 本人关系
        name: "",
        idCard: "",
        marketSubjectType: "", // 单位性质
        politicsStatus: "", // 政治面貌
        duty: "", // 现任职务
        desc: "", // 备注
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
