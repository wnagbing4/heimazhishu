<template>
  <el-dialog v-model="dialogVisible" title="添加合同" width="500">
    <div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="租聘楼宇" prop="name">
          <el-select
              v-model="industryCode"
              placeholder="请选择"
              style="width: 100%"
              @change="getHandleChange"
            >
              <el-option
                v-for="item in getIndustryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
        </el-form-item>

        <el-form-item label="租聘止日期" prop="data">
          <el-date-picker
            v-model="ruleForm.data"
            type="daterange"
            :disabledDate="disabledDate"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="changeTime"
          />
        </el-form-item>
        <el-form-item label="租聘合同" prop="uploadImg">
          <el-upload
            class="upload-demo"
            :limit="1"
            :http-request="handleUpload"
            :on-remove="handleExceed"
          >
            <template #trigger>
              <el-button v-if="!formData1.contractUrl">文件上传</el-button>
              <el-button type="success" disabled v-else>已上传</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip text-red">
                支持扩展名：.doc .docx .pdf, 文件大小不得超过5M
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ComponentSize, ElMessage, FormInstance, FormRules } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { genFileId } from "element-plus";
import { uploadFileApi,getLouyuApi,addHeTongApi } from "@/api/park/enterprise";
import {formatTime} from "@/utils/day"
const upload = ref<UploadInstance>();
const industryCode=ref()
const getIndustryList=ref([])
const louyu=async ()=>{
   let res=await getLouyuApi()
   getIndustryList.value=res.data
}
louyu()
// 获取漏雨的id
const getHandleChange=(val:any)=>{
  // console.log(val,'val');
  formData1.buildingId=val
}
const handleExceed: UploadProps["onExceed"] = (files) => {
  formData1.contractUrl = "";
};
const changeTime=(val:any)=>{

console.log(val,'val');
formData1.startTime=formatTime(val[0])
formData1.endTime=formatTime(val[1])
console.log(formData1,'formData1');

}
/**
 * empty object
 */
type EmptyObject = {
  /**
   * 租赁楼宇id
   */
  buildingId: number | string;
  /**
   * 合同附件id
   */
  contractId: number | string;
  /**
   * 合同附件url
   */
  contractUrl: string;
  /**
   * 租赁结束日期
   */
  endTime: string;
  /**
   * 企业id
   */
  enterpriseId: number | string;
  /**
   * 开始日期
   */
  startTime: string;
  /**
   * 操作类型，添加合同0，续签合同1
   */
  type: number;
};
const formData1 = reactive<EmptyObject>({
  buildingId: "",
  contractId: "",
  contractUrl: "",
  endTime: "",
  startTime: "",
  enterpriseId: "",
  type: 0,
});
// 文件上传
const handleUpload = async (options: any) => {
  console.log(options, "文件上传");
  const file = options.file;
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error("文件带下不能超过5M");
    return;
  }
  // 实例化formData对象
  const formData2 = new FormData();
  formData2.append("file", file);
  formData2.append("type", "contract");
  // 调用上传接口
  const res = await uploadFileApi(formData2);
  console.log(res, "ffffff");

  // console.log('res', res)
  if (res?.code === 10000) {
    formData1.contractUrl = res.data.url;
    formData1.contractId = res.data.id;
    ElMessage.success("上传成功");
  }
};
interface RuleForm {
  name: string;
  data:[]
  uploadImg:string
}
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 8.64e7;
};
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  data:[],
  uploadImg:''
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请选择楼宇", trigger: "blur" },

  ],
  data: [
    { required: true, message: "请选择时间", trigger: "blur" },

  ],
  // uploadImg: [
  //   { required: true, message: "请添加文件", trigger: "blur" },

  // ],
});
const emits=defineEmits('getList')
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // console.log("submit!");
      const res=await addHeTongApi(formData1)
      console.log(res,'添加合同');
      if(res.code===10000){
        ElMessage.success('添加成功')
        dialogVisible.value=false
        emits('getList')
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const dialogVisible = ref<boolean>(false);
const openDialog = (id) => {
  formData1.enterpriseId=id
  dialogVisible.value = true;
};
const closeDialog = () => {
  dialogVisible.value = true;
};
defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style></style>
