<template>
  <el-table
    :data="tableData"
    class="tb-edit"
    border
    style="width: 100%"
    highlight-current-row
  >
    <el-table-column prop="agency" label="操作">
      <template slot-scope="scope"   :width="50" v-if="!$attrs.hiddenOptions">
        <i
          style="color: #f56c6c"
          class="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="年月"
      :width="this.$attrs.hiddenOptions ? '' : 280"
    >
      <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
        <el-date-picker
          v-model="scope.row.time"
          type="monthrange"
          align="right"
          unlink-panels
          style="width: 250px"
          range-separator="至"
          start-placeholder="开始年月"
          end-placeholder="结束年月"
          value-format="timestamp"
          @change="changeValue"
        >
        </el-date-picker>
      </template>
    </el-table-column>
    <el-table-column
      prop="unitName"
      label="单位"
      :width="this.$attrs.hiddenOptions ? '' : 180"
    >
      <!-- <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.unitName"
          filterable
          allow-create
          default-first-option
          @change="changeValue1($event, scope.$index)"
          placeholder="请选择单位"
        >
          <el-option
            v-for="(item, index) in uniNameList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </template> -->
      <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
        <el-input
          v-model.trim="scope.row.unitName"
          size="mini"
          placeholder="请输入单位"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="department"
      label="科室"
      :width="this.$attrs.hiddenOptions ? '' : 180"
    >
      <!-- <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.department"
          filterable
          allow-create
          default-first-option
          placeholder="请选择科室"
        >
          <el-option
            v-for="(item, index) in obj[scope.row.unitName]"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </template> -->
      <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
        <el-input
          v-model.trim="scope.row.department"
          size="mini"
          placeholder="请输入科室"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="job"
      label="职务"
      :width="this.$attrs.hiddenOptions ? '' : null"
    >
      <template slot-scope="scope"   v-if="!$attrs.hiddenOptions">
        <el-input v-model.trim="scope.row.job" size="mini" placeholder="请输入职务" />
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
    this.handleUniNameList();
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
        time: [],
        startTime: "", //开始时间
        endTime: "", //结束时间
        unitName: "", //单位
        department: "", // 科室
        job: "", // 职务
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
