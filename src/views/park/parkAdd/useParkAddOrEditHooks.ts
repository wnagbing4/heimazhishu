import {
  addEnterpriseApi,
  editEnterpriseApi,
  editOkEnterpriseApi,
  getIndustryListApi,
  uploadFileApi
} from '@/api/park/enterprise'
import type { Data2 } from '@/api/park/enterprise/types'
import type { UploadRequestOptions } from 'element-plus'

export const useParkAddHook = () => {
  // 表单配置项
  const formConfig = {
    // 校验
    formRules: {
      name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
      legalPerson: [{ required: true, message: '请输入法人', trigger: 'blur' }],
      registeredAddress: [
        { required: true, message: '请输入注册地址', trigger: 'blur' }
      ],
      industryCode: [
        { required: true, message: '请输入所在行业', trigger: 'blur' }
      ],
      imageUpload: [
        { required: true, message: '请上传营业执照', trigger: 'blur' }
      ],
      contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
      contactNumber: [
        { required: true, message: '请输入联系电话', trigger: 'blur' }
      ]
    },
    formStyleOrigin: {
      inline: true,
      'label-width': '100px'
    },
    formItems: [
      {
        label: '企业名称',
        type: 'input',
        field: 'name',
        itemOrigin: {
          placeholder: '请输入企业名称'
        },
        itemStyle: {
          width: '45%'
        }
      },
      {
        label: '法人',
        type: 'input',
        field: 'legalPerson',
        itemOrigin: {
          placeholder: '请输入法人'
        },
        itemStyle: {
          width: '45%'
        }
      },
      {
        label: '注册地址',
        type: 'input',
        field: 'registeredAddress',
        itemOrigin: {
          placeholder: '请输入注册地址'
        },
        itemStyle: {
          width: '45%'
        }
      },
      {
        label: '所在行业',
        type: 'slot',
        slotName: 'industryCode',
        field: 'industryCode',
        itemOrigin: {
          placeholder: '请输入所在行业'
        },
        options: [],
        itemStyle: {
          width: '45%'
        }
      },
      {
        label: '营业执照',
        type: 'slot',
        slotName: 'imageUpload',
        itemStyle: {
          width: '45%'
        }
      }
    ]
  }
  // 获取行业列表数据
  const getIndustryList = ref<Data2[]>()
  const getIndustry = async () => {
    const res = await getIndustryListApi()
    getIndustryList.value = res?.data
  }
  getIndustry()

  const formItems = formConfig.formItems
  const formDataInit: any = {}
  formItems.map((item: any) => {
    if (item.field) {
      formDataInit[item.field] = ''
    }
  })
  // 表单数据
  const formData = ref({
    industryCode: '',
    contact: '',
    contactNumber: '',
    businessLicenseId: '', //上传文件ID
    businessLicenseUrl: '', // 上传文件地址
    ...formDataInit
  })

  // 上传文件
  const handleUpload = async (options: UploadRequestOptions) => {
    // console.log(options)
    // 获取选择的文件
    const file = options.file

    // 判断文件大小
    if (file.size > 5 * 1024 * 1024) {
      ElMessage.error('文件带下不能超过5M')
      return
    }

    // 判断文件类型
    const fileType = file.type
    const fileTypeList = ['image/jpeg', 'image/png', 'image/jpg']
    if (!fileTypeList.includes(fileType)) {
      ElMessage.error('文件格式不正确')
      return
    }

    // 实例化formData对象
    const formData2 = new FormData()
    formData2.append('file', file)
    formData2.append('type', 'businessLicense2')
    // 调用上传接口
    const res = await uploadFileApi(formData2)
    // console.log('res', res)
    if (res?.code === 10000) {
      formData.value.businessLicenseUrl = res.data.url
      formData.value.businessLicenseId = res.data.id
      console.log('formData', formData)
      ElMessage.success('上传成功')
    }
  }
  // 判断手机号是否符合规则
  const validatePass2 = (rule: any, value: any, callback: any) => {
    const reg = /^1[3-9]\d{9}$/
    if (value === '') {
      callback(new Error('请输入手机号'))
    } else if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }
  // 添加逻辑
  const $router = useRouter()
  const $route = useRoute()
  const mode = $route.query.mode
  const handleAdd = async () => {
    console.log(mode, 'mode');

    if (mode == 'edit') {
      delete formData.value.businessLicenseName
      delete formData.value.industryName
      delete formData.value.rent
      const res = await editOkEnterpriseApi(formData.value)
      console.log('res', res)
      if (res!.code === 10000) {
        ElMessage.success('修改成功')
      } else {
        ElMessage.error(res!.msg)
      }

    } else {
      // console.log(formData.value, 'data')
      const res = await addEnterpriseApi(formData.value);
      console.log(res, 'tainjai');


      // if (res!.code === 10000) {
      //   ElMessage.success('添加成功')
      // } else {
      //   ElMessage.error(res!.msg)
      // }
    }
    $router.go(-1)
  }
  watchEffect(async () => {
    if (mode === 'edit') {
      const { id } = $route.query
      const res = await editEnterpriseApi(id as any)
      formData.value = { ...res!.data }
    }
  })
  return {
    formConfig,
    formData,
    handleAdd,
    handleUpload,
    validatePass2,
    getIndustryList,
    mode
  }
}
