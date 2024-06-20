
export const useDialogHook = () => {
  const dialogTitle = ref<string>('添加楼宇')
  const dialogTableVisible = ref<boolean>(false)
  const dialogType = ref<string>('add')
  // 表单配置项
  const formConfig = {
    // 表单配置项
    formItems: [
      {
        label: '楼宇名称',
        itemOrigin: {
          placeholder: '请输入楼宇名称'
        },
        type: 'input',
        field: 'name'
      },
      {
        label: '楼宇层数',
        itemOrigin: {
          placeholder: '请输入楼宇层数'
        },
        type: 'input',
        field: 'floors'
      },
      {
        label: '在管面积',
        itemOrigin: {
          placeholder: '请输入在管面积'
        },
        type: 'slot',
        slotName: 'SquareMeter',
        field: 'area'
      },
      {
        label: '物业费',
        itemOrigin: {
          placeholder: '请输入物业费'
        },
        type: 'slot',
        slotName: 'PerSquareMeter',
        field: 'propertyFeePrice'
      }
    ],
    // 表单样式
    formStyleOrigin: {
      "label-position": "top",
      width: "400px",
      "margin-left": "100px"
    },
    // 校验
    formRules: {
      name: [
        { required: true, message: '请输入楼宇名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
      ],
      floors: [
        { required: true, message: '请输入楼宇层数', trigger: 'blur' },
      ],
      area: [
        { required: true, message: '请输入在管面积', trigger: 'blur' },
      ],
      propertyFeePrice: [
        { required: true, message: '请输入物业费', trigger: 'blur' },
      ]
    }
  }
  const formItems = formConfig.formItems ?? []
  const fromDataInit: any = {}
  formItems.map((item: any) => {
    fromDataInit[item.field] = ''
  })
  fromDataInit.id = ""
  const formData = ref(fromDataInit)


  return {
    dialogTitle,
    dialogTableVisible,
    formConfig,
    formData,
    dialogType
  }
}
