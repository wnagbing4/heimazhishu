<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import { getRoleLeftLost, getRoleTreeLost, addLeftAPI } from "@/api/system";
import { ElTree } from "element-plus";
import {useRouter} from 'vue-router'
const router=useRouter()
onMounted(() => {
  if (checkedData.value.length == 0) {
    selectOption(2);
  }
});
// 左侧
const setmenu = ref();
// 右侧
const seright = ref();
const getallList = () => {
  Promise.all([getRoleLeftLost(), getRoleTreeLost()]).then((res: any) => {
    if (res.length > 0) {
      setmenu.value = res[0].data;
      seright.value = res[1].data;
      seright.value.forEach((item) => {
        item.children.forEach((item1) => {
          item1.disabled = true;
          if (item1.children) {
            item1.children.forEach((item2) => {
              item2.disabled = true;
            });
          }
        });
      });
    }
  });
};
getallList();
// 左侧数据操作
const checkedData = ref([]);
const treeRef:any = ref<InstanceType<typeof ElTree>>()
const selectOption = async (index) => {
  const res = await addLeftAPI(index);
  checkedData.value = res.data.perms
  const treeComponentList = treeRef.value
  treeComponentList?.forEach((tree: any, index: number) => {
    tree.setCheckedKeys(checkedData.value[index])
  })
  // console.log(checkedData.value)
};

// 右侧tab
const defaultProps = {
  children: "children",
  label: "title",
};
// 添加
const addRole=()=>{
  router.push('/system/role/add')
}
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<template>
  <div class="qiyw">
    <div class="resleft">
      <el-col :span="12">
        <el-menu default-active="2" class="el-menu-vertical-demo" @select="selectOption">
          <template v-for="(item, i) in setmenu" :key="i">
            <el-menu-item
              :index="item.roleId + ''"
              style="display: flex; justify-content: space-between"
            >
              <div>
                <span>{{ item.roleName }}</span>
              </div>
              <el-dropdown>
                <el-icon class="el-icon--right">
                  <span class="iconfont icon-diandian"></span>
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>编辑</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-menu-item>
          </template>
          <el-button style="width: 100%" @click="addRole">添加角色</el-button>
        </el-menu>
      </el-col>
    </div>
    <div class="resrigth">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="功能权限" name="first">
          <div class="authority">
            <div class="authchilerd" v-for="item in seright" :key="item.id">
              <div class="yaun">{{ item.title }}</div>
              <el-tree ref="treeRef" :props="{ label: 'title' }"  :expand-on-click-node="false" :data="item.children" show-checkbox
                       :default-expand-all="true" node-key="id" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成员" name="second">Config</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.qiyw {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
}

.resleft {
  width: 220px;
  height: 100%;
  // background-color: red;
}

.resrigth {
  flex: 1;
  width: 220px;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.el-col-12 {
  max-width: 100%;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.authority {
  width: 100%;
  height: 100%;
  // background-color: aqua;
  display: flex;

  .authchilerd {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    border-right: 1px solid #eee;
  }

  .yaun {
    width: 100%;
    height: 50px;
    background-color: #f5f7fa;
    text-align: center;
    line-height: 50px;
  }
}

.el-tabs__header {
  margin: 0px !important;
}
</style>
