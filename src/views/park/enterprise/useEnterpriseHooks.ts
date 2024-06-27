
import type {
  BuildingRequestType,
  BuildingResponseType
} from '@/api/park/building/types'
import { delEnterpriseApi, getEnterpriseListApi, getRentDetailApi } from '@/api/park/enterprise'
import type {  Datum, EnterListResponseType } from '@/api/park/enterprise/types'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useBuildingHook = () => {
  // 定义表格配置项
  const tableConfig = {
    // 子数据配置项
    columnsConfig: [
      {
        slot: 'expand',
      },
      {
        type: 'index',
        label: '序号',
        tableColumnStyle: {
          width: '100'
        }
      },
      {
        prop: 'name',
        label: '企业名称'
      },

      {
        prop: 'contact',
        label: '联系人'
      },
      {
        prop: 'contactNumber',
        label: '联系电话'
      },
      {
        slot: 'Controls',
        label: '操作'
      }
    ],
    tableStyle:{
      "row-key":"id"
    }
  }
  const loading=ref(false)
  // 列表请求参数
  const queryForm = ref<BuildingRequestType>({
    pageSize: '10',
    page: '1',
    name: ''
  })
  // 菜单列表数据
  const tableData = ref<EnterListResponseType[]>([])
  const total = ref<number>(0)
  // 初始化菜单列表数据
  const InitBuilding = async () => {
    loading.value=true
    const res = await getEnterpriseListApi(queryForm.value)
    // console.log('res', res)
    tableData.value = res?.data.rows
    total.value = res?.data.total
    loading.value=false

  }
  InitBuilding()
  // 查询列表
  const handleSearch = () => {
    InitBuilding()
    queryForm.value.name = ''
  }
  // 删除
  const handleDelete = (row: BuildingResponseType) => {
    ElMessageBox.confirm('是否确认删除当前企业?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const res = await delEnterpriseApi(row.id)
        if (res!.code === 10000) {
          ElMessage({
            type: 'success',
            message: res!.msg
          })
          InitBuilding()
        } else {
          ElMessage({
            type: 'error',
            message: res!.msg
          })
        }

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
// 展开行数据
const handleExpand = async (row: Datum) => {
  const res = await getRentDetailApi(row.id)
  row.children = res!.data
}
// 添加企业
const $router = useRouter()
const handleAdd = () => {
  $router.push({
    path:"/park/enterprise/add",
    query:{
      mode:"add",
    }
  })
}
// 编辑企业
const handleEdit = (id:number) => {
  $router.push({
    path:"/park/enterprise/add",
    query:{
      mode:"edit",
      id:id
    }
  })
}
// 查看
// const $router = useRouter()
const handleView = (id:number) => {
  $router.push({
    path:"/park/enterprise/detail",
    query:{id}
  })
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
    InitBuilding,
    handleExpand,
    handleAdd,
    handleEdit,
    handleView,
    loading
  }
}
