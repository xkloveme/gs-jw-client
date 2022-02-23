<template>
  <div id="pdf-path" style="text-align: center">
    <h2>
      报告人基本情况
      <el-tooltip
        class="item"
        content="说明：①请认真仔细填写。②身份证号码应填写18位公民身份号码。"
        effect="dark"
      >
        <i class="el-icon-question" />
      </el-tooltip>
    </h2>
    <div>
      <el-form :model="form" :rules="rules" label-width="130px" ref="form">
        <el-col :span="6">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-select
              clearable
              filterable
              placeholder="请选择"
              v-model.trim="form.gender"
            >
              <el-option
                :key="item"
                :label="item"
                :value="i"
                v-for="(item, i) in $utils.gender"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
            <el-form-item label="民族">
              <el-select placeholder="请选择"
                v-model="form.nation">
                <el-option :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in $utils.nation" />
              </el-select>
            </el-form-item>
          </el-col> -->
        <el-col :span="6">
          <el-form-item label="政治面貌" prop="politicsStatus">
            <el-select placeholder="请选择" v-model="form.politicsStatus">
              <el-option
                :key="item"
                :label="item"
                :value="i"
                v-for="(item, i) in $utils.politicsStatus"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.trim="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model.trim="form.idCard" />
          </el-form-item>
        </el-col>

        <el-col :span="needCommunity ? 12 : 8">
          <el-form-item label="工作单位" prop="employer">
            <el-input v-model.trim="form.employer" />
            <!-- <el-select @change="handleChangeNeedCommunity"
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.employer">
                  <el-option :key="item.key"
                    :label="item.value"
                    :value="item.key"
                    v-for="item in $utils.workOrganization" />
                </el-select> -->
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="现任职位" prop="duty">
            <el-input v-model.trim="form.duty" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分管工作" prop="work">
            <el-input v-model.trim="form.work" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职级" prop="grade">
            <el-select placeholder="请选择" style="width: 100%" v-model="form.grade">
              <el-option
                :key="item.key"
                :label="item.value"
                :value="item.key"
                v-for="(item, i) in $utils.grade"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婚姻状况" prop="marriage">
            <el-select
              clearable
              filterable
              placeholder="请选择"
              style="width: 100%"
              v-model="form.marriage"
            >
              <el-option
                :key="item.key"
                :label="item.value"
                :value="item.key"
                v-for="item in $utils.marriage"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工资收入(万元)" prop="income">
            <el-input-number
              v-model.trim="form.income"
              size="mini"
              style="width: 100%"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他收入(万元)" prop="otherIncome">
            <el-input-number
              v-model.trim="form.otherIncome"
              size="mini"
              style="width: 100%"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭年收入(万元)" prop="homeYearIncome">
            <el-input-number
              v-model.trim="form.homeYearIncome"
              size="mini"
              style="width: 100%"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="个人爱好">
            <el-input v-model.trim="form.like" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="家庭地址" prop="homeAddress">
            <el-input v-model.trim="form.homeAddress" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input
              :type="passType ? 'password' : 'text'"
              autocomplete="off"
              v-model.trim="form.password"
            >
              <el-button
                @click="passType = !passType"
                icon="el-icon-view"
                slot="append"
              />
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input
              :type="checkPassType ? 'password' : 'text'"
              autocomplete="off"
              v-model.trim="form.checkPassword"
            >
              <el-button
                @click="checkPassType = !checkPassType"
                icon="el-icon-view"
                slot="append"
              />
            </el-input>
          </el-form-item>
        </el-col>
        <h2>配偶基本信息</h2>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="spouseName">
              <el-input v-model.trim="form.spouseName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号" prop="spouseIdCard">
              <el-input v-model.trim="form.spouseIdCard" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="spousePhone">
              <el-input v-model.trim="form.spousePhone" />
            </el-form-item>
          </el-col>
           <el-col :span="8">
          <el-form-item label="工作单位" prop="spousedEmployer">
            <el-input v-model.trim="form.spousedEmployer" />
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="现任职位" prop="spousedDuty">
            <el-input v-model.trim="form.spousedDuty" />
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="年收入(万元)" prop="spouseYearIncome">
            <el-input-number
              v-model.trim="form.spouseYearIncome"
              size="mini"
              style="width: 100%"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
        </el-row>
        <el-form-item label="工作简历" prop="resume">
          <resume :hiddenOptions="false" />
        </el-form-item>

        <el-form-item>
          <!-- <el-button @click="onSubmit"
            type="primary">打印预览</el-button> -->
          <el-button @click="handleGoNextPage">下一项</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import resume from "./resume";
import { isIdentityCard, isLicensePlate } from "./../common.js";
var JSZip = require("jszip");
const fs = require("fs");
export default {
  components: { resume },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value != this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passType: true,
      checkPassType: true,
      disabled: false,
      needCommunity: false,
      communityType: [],
      rules: {
        name: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: "请填写正确的姓名(只支持中文)",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请输入性别", trigger: "change" }],
        employer: [{ required: true, message: "请输入", trigger: "change" }],
        duty: [{ required: true, message: "请输入", trigger: "change" }],
        grade: [{ required: true, message: "请输入", trigger: "change" }],
        marriage: [{ required: true, message: "请输入", trigger: "change" }],
        income: [{ required: true, message: "请输入", trigger: "change" }],
        otherIncome: [{ required: true, message: "请输入", trigger: "change" }],
        homeYearIncome: [{ required: true, message: "请输入", trigger: "change" }],
        homeAddress: [{ required: true, message: "请输入", trigger: "change" }],
        politicsStatus: [
          { required: true, message: "请选择政治面貌", trigger: "change" },
        ],
        idCard: [
          { required: true, message: "请填写身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
          {
            pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请填写正确的联系电话",
            trigger: "blur",
          },
        ],
        spouseIdCard: [
          { required: false, message: "请填写身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
          {
            pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
        ],
        spouseName: [
          { required: false, message: "请填写姓名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: "请填写正确的姓名(只支持中文)",
            trigger: "blur",
          },
        ],
        spousePhone: [
          {
            required: false,
            pattern: /^1\d{10}$/,
            message: "请填写正确的联系电话",
            trigger: "blur",
          },
        ],
        resume: [{ required: true }],
        spousedEmployer: [{ required: false, message: "请输入", trigger: "change" }],
        spousedDuty: [{ required: false, message: "请输入", trigger: "change" }],
        spouseYearIncome: [{ required: false, message: "请输入", trigger: "change" }],
        password: [{ required: false, validator: validatePass, trigger: "blur" }],
        checkPassword: [{ required: false, validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {
    form() {
      return this.$store.getters.getUser;
    },
    id() {
      return this.$formatDay(new Date(), "YYYYMMDDHHmmss") + this.form.idCard.slice(-8);
    },
    tableStatus() {
      return this.$store.getters.getTableStatus;
    },
    getResume() {
      return this.$store.getters.getResume;
    },
    identityList() {
      const arr = [];
      for (const key in this.$utils.identity) {
        if (this.$utils.identity.hasOwnProperty(key)) {
          arr.push({
            value: this.$utils.identity[key],
            label: this.$utils.identity[key],
            disabled: Number(key) === 6 ? false : this.disabled,
          });
        }
      }
      return arr;
    },
  },
  mounted() {
    // 监听与主进程的通信
    this.$ipc.on("action", (event, arg) => {
      switch (arg) {
        case "open": // 打开文件
          console.log("open");
          this.loadAsyncZip();
          break;
        case "about": // 关于
          console.log("about");
          break;
        case "save": // 保存
          this.downloadZip();
          break;
        case "new": // 新建
          this.openNew();
          console.log("new");
          break;
      }
    });
  },
  methods: {
    // 下一项
    handleGoNextPage() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // if (this.getResume && this.getResume.length) {
          //   let arr = [];
          //   this.getResume.map((item) => {
          //     arr.push(item.startTime);
          //     arr.push(item.endTime);
          //     arr.push(item.unitName);
          //     arr.push(item.department);
          //     arr.push(item.job);
          //   });
          //   if (!arr.every((x) => x)) {
          //     this.$message({
          //       type: "error",
          //       message: "请检查个人简历是否有误",
          //     });
          //     return false;
          //   }
          // }
          this.$store.dispatch("updateStatus", "1");
        } else {
          this.$message({
            type: "error",
            message: "请检查是否有误",
          });
          return false;
        }
      });
    },
    // 人员身份逻辑
    handleChange(val) {
      if (val.join(",").indexOf("其他") > -1) {
        this.form.identity = ["其他"];
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // 工作单位逻辑
    handleChangeNeedCommunity(val) {
      let obj = {};
      this.$utils.communityType.map((comm) => {
        obj[comm.key] = comm.value;
      });
      this.needCommunity = !!obj[val];
      this.communityType = obj[val];
      this.form.community = "";
    },
    openDialogByIpc() {
      this.$ipc.send("showDialog", `<${this.$t("a message")}>`);
    },
    openNew() {
      this.$store.dispatch("updateStatus", "0");
      this.$store.dispatch("updateUser", null);
    },
    onSubmit() {
      // const { href } = this.$router.resolve({
      //   name: 'Pdf',
      // })
      // window.open(href, '_blank')
      this.$router.push({ name: "Pdf" });
    },
    // 图片上传
    handleAvatarSuccess(e) {
      var file = e.target.files[0]; // 获取图片资源
      const self = this;
      // 只选择图片文件
      if (!file.type.match("image.*")) {
        return false;
      }

      var reader = new FileReader();

      reader.readAsDataURL(file); // 读取文件

      // 渲染文件
      reader.onload = function (arg) {
        console.log(arg.target.result);
        self.form.imageUrl = arg.target.result;
      };
    },
    downloadZip() {
      console.log("🐛:: downloadZip -> this.$refs.form", this.$refs.form);
      let arr = [];
      // 添加全局正则,检验车牌号和身份证号
      this.form.car.map((item) => {
        if (item.carNumber) {
          arr.push(isLicensePlate(item.carNumber));
        }
      });
      this.form.networking.map((item) => {
        if (item.idCard) {
          arr.push(isIdentityCard(item.idCard));
        }
      });
      if (!arr.every((x) => x)) {
        return this.$message({
          type: "error",
          message: "请检查车牌号和身份证号是否有误",
        });
      }
      if (Object.keys(this.tableStatus).length !== 22) {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
        } else {
          this.$message({
            type: "error",
            message: "请检查是否有误",
          });
          return false;
        }
      });
    },
    loadAsyncZip(defaultpath, callback) {
      const self = this;
      const files = this.$dialog.showOpenDialog({
        filters: [{ name: "WT", extensions: ["wt"] }],
        properties: ["openFile"],
      });
      if (files) {
        files.then((res) => {
          // const buf = Buffer.alloc(1024)
          const path = res.filePaths[0];
          fs.readFile(path, function (err, data) {
            if (err) throw err;
            JSZip.loadAsync(data).then(function (zip) {
              if (zip.files && zip.files.password) {
                zip.files.password.async("text").then((pwd) => {
                  self
                    .$prompt("请输入文件密码", "密码输入", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                    })
                    .then(({ value }) => {
                      if (String(value) === String(pwd)) {
                        self.$message({
                          type: "success",
                          message: "密码正确",
                        });
                        zip.files["user.json"].async("text").then((res) => {
                          self.getJson(res);
                        });
                      } else {
                        self.$message({
                          type: "error",
                          message: "密码错误",
                        });
                      }
                    })
                    .catch(() => {
                      self.$message({
                        type: "info",
                        message: "取消输入",
                      });
                    });
                });
              } else {
                zip.files["user.json"].async("text").then((res) => {
                  self.getJson(res);
                });
              }
            });
          });
        });
      }
    },
    getJson(text) {
      if (text) {
        const jsonData = JSON.parse(text);
        console.log(jsonData);
        this.$store.dispatch("updateUser", jsonData);
      }
    },
  },
};
</script>

<style>
.home-button {
  background-color: #263238;
  opacity: 1;
  border-radius: 4px;
  cursor: pointer;
  height: 45px;
  width: 150px;
  margin: 10px 10px;
  text-align: center;
  line-height: 45px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 260px;
  line-height: 260px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  display: block;
}
</style>
