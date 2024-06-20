import {
  deleteBuildingApi,
  getBuildingListApi
} from '@/api/park/building/index'
import type {
  BuildingRequestType,
  BuildingResponseType
} from '@/api/park/building/types'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useBuildingHook = () => {
  // 定义表格配置项
  const tableConfig = {
    // 子数据配置项
    columnsConfig: [
      {
        type: 'index',
        label: '序号',
        tableColumnStyle: {
          width: '100'
        }
      },
      {
        prop: 'name',
        label: '楼宇名称'
      },

      {
        prop: 'floors',
        label: '层数'
      },
      {
        prop: 'area',
        label: '在管面积(㎡)'
      },
      {
        prop: 'propertyFeePrice',
        label: '(物业费(元/㎡))'
      },
      {
        slot: 'status',
        label: '状态'
      },
      {
        slot: 'Controls',
        label: '操作'
      }
    ]
  }
  // 列表请求参数
  const queryForm = ref<BuildingRequestType>({
    pageSize: '10',
    page: '1',
    name: ''
  })
  // 菜单列表数据
  const tableData = ref<BuildingResponseType[]>([])
  const total = ref<number>(0)
  // 初始化菜单列表数据
  const InitBuilding = async () => {
    const res = await getBuildingListApi(queryForm.value)
    // console.log('res', res)
    tableData.value = res?.data.rows
    total.value = res?.data.total
    ElMessage.success('获取成功!')
  }
  InitBuilding()
  // 查询列表
  const handleSearch = () => {
    InitBuilding()
    queryForm.value.name = ''
  }
  // 删除
  const handleDelete = (row: BuildingResponseType) => {
    ElMessageBox.confirm('是否确认删除当前楼宇?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const res = await deleteBuildingApi(row.id)
        ElMessage({
          type: 'success',
          message: res!.msg
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除'
        })
      })
  }
  // 分页
  const handleSizeChange = (val: number) => {
    queryForm.value.pageSize = val.toString()
    InitBuilding()
  }
  const handleCurrentChange = (val: number) => {
    queryForm.value.page = val.toString()
    InitBuilding()
  }

  return {
    tableConfig,
    queryForm,
    tableData,
    total,
    handleSearch,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    InitBuilding
  }
}
