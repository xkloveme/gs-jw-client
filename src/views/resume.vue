<template>
  <el-table
    :data="tableData"
    class="tb-edit"
    border
    style="width: 100%"
    highlight-current-row
  >
    <el-table-column prop="agency" label="操作">
      <template scope="scope" slot-scope="scope" :width="50" v-if="!$attrs.hiddenOptions">
        <i
          style="color: #f56c6c"
          class="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="报告人手机号">
      <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
        <el-input v-model.trim="scope.row.phone" size="mini" placeholder="报告人手机号" />
      </template>
    </el-table-column>
    <el-table-column prop="spousePhone" label="配偶手机号">
      <template scope="scope" slot-scope="scope" v-if="!$attrs.hiddenOptions">
        <el-input
          v-model.trim="scope.row.spousePhone"
          size="mini"
          placeholder="配偶手机号"
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
</template>

<script>
export default {
  data() {
    return {
      uniNameList: [],
      departmentList: [],
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.getResume;
    },
    pickerOptions() {
      return {};
    },
  },
  mounted() {
    // this.handleUniNameList();
  },
  methods: {
    handleUniNameList() {
      const arr = [];
      const obj = {};
      this.$utils.unitNamelist.map((res) => {
        arr.push(res.key);
        obj[res.key] = res.value;
      });
      this.obj = obj;
      this.uniNameList = arr;
    },
    changeValue1(val, index) {
      this.tableData[index].department = "";
      // console.log(val, index, this.tableData, "88888");
      // let obj = {}
      // this.$utils.unitNamelist.map((comm) => {
      //   obj[comm.key] = comm.value
      // })
      // this.departmentList = obj[val]
      // console.log(val, this.departmentList, "5555");
    },
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
    changeValue(value) {
      let arr = [];
      this.tableData.map((item) => {
        if (value && value.length) {
          arr.push({ ...item, startTime: item.time[0], endTime: item.time[1] });
        } else {
          arr.push(item);
        }
      });
      this.$store.commit("setResumeList", arr);
    },
    handleAddLine() {
      this.tableData.push({
        phone: "",
        spousePhone: "",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
