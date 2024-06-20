<script setup lang="ts">
import { useParkAddHook } from "./useParkAddOrEditHooks";

const {
  formConfig,
  formData,
  handleAdd,
  handleUpload,
  validatePass2,
  getIndustryList,
} = useParkAddHook();

// 重置
const formDataRef = ref<any>();
const handleReset = () => {
  formData.value.contactNumber = "";
  formData.value.contact = "";
  formData.value.businessLicenseUrl = "";
  formData.value.businessLicenseId = "";
  formDataRef!.value.resetForm();
};
</script>
<template>
  <div class="park-add">
    <el-card style="width: 100%">
      <div class="top flex-between">
        <div class="top-left flex-center" style="height: 30px">
          <el-icon style=" cursor: pointer"><Back /></el-icon>
          <p style="margin: 0 10px; cursor: pointer" @click="$router.go(-1)">返回</p>
          |
          <span style="margin-left: 5px">
            {{ !$route.query.id ? "添加企业" : "编辑企业" }}</span
          >
        </div>
        <p>黑马管理员</p>
      </div>
    </el-card>
    <el-scrollbar height="800px">
      <el-card style="width: 70%; margin: 20px auto">
        <p class="border-left">企业列表</p>
        <FormConfig ref="formDataRef" v-bind="formConfig" v-model="formData">
          <!-- 所在行业插槽 -->
          <template #industryCode>
            <el-select
              v-model="formData.industryCode"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in getIndustryList"
                :key="item.industryCode"
                :label="item.industryName"
                :value="item.industryCode"
              />
            </el-select>
          </template>
          <!-- 营业执照插槽 -->
          <template #imageUpload>
            <el-upload :http-request="handleUpload" class="upload-demo" :limit="1">
              <el-button type="primary" v-if="!formData.businessLicenseUrl"
                >上传文件</el-button
              >
              <el-button type="success" disabled v-else>已上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="formData.businessLicenseUrl"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="[formData.businessLicenseUrl]"
                    :initial-index="4"
                    fit="cover"
                  />
                  <p>支持扩展名：.png .jpg .jpeg，文件大小不得超过5M</p>
                </div>
              </template>
            </el-upload>
          </template>
        </FormConfig>
      </el-card>
      <el-card style="width: 70%; margin: 0 auto">
        <p class="border-left">联系人列表</p>
        <el-form :model="formData" inline>
          <el-form-item style="width: 45%" prop="contact" label="联系人">
            <el-input placeholder="请输入联系人" v-model="formData.contact" />
          </el-form-item>
          <el-form-item
            style="width: 45%"
            prop="contactNumber"
            label="联系电话"
            :rules="{ validator: validatePass2, trigger: 'blur' }"
          >
            <el-input placeholder="请输入联系电话" v-model="formData.contactNumber" />
          </el-form-item>
        </el-form>
      </el-card>
    </el-scrollbar>
    <el-card class="card-bottom" style="text-align: center;width:100%">
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleAdd">确定</el-button>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.park-add {
  width: 100%;
  height: calc(100% - 70px);
  background-color: #f4f6f8;
}
.card-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
}
.border-left {
  border-left: 2px solid #4770ff;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 30px;
  box-sizing: border-box;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>
