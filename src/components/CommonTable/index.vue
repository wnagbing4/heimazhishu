<script setup lang="ts">
import { Loading } from "element-plus/es/components/loading/src/service";
import {
  ref,
  onMounted,
  reactive,
  computed,
  onUnmounted,
  watch,
  onActivated,
  nextTick,
} from "vue";
const domRef = ref();
const paginationRef = ref();
const headerRef = ref();
const tableRef = ref();
const emits = defineEmits([`size-change`, `current-change`, `selection-change`]);
const props = defineProps({
  // clearSelection: {
  //   type: Function,
  //   default: () => {},
  // },
  selection: {
    type: Boolean,
    default: () => false,
  },
  Loading:{
    type:Boolean,
    default:()=>false
  },
  page: {
    type: Object,
    default: () => {
      return {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        totalRecord: 0,
      };
    },
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  data: {
    type: Array,
    default: () => {
      const arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
});

const state = reactive({
  height: 0,
  loading: false,
});

onMounted(() => {
  // setTimeout(() => {
  //   state.loading = false;
  // }, 500);
  addEventListener(`resize`, init);
});
// const loading  = computed(() => {
//   return props.data && props.data.length > 0 ? false : true;
// });
const sizeChangeHandle = (val: number) => {
  emits(`size-change`, val);
};
const currentChangeHandle = (val: number) => {
  emits(`current-change`, val);
};
onActivated(() => {});
const init = () => {
  nextTick(() => {
    state.height =
      domRef.value.offsetHeight -
      paginationRef.value.$el.offsetHeight -
      headerRef.value.offsetHeight -
      24;
  });
};
const userInput = ref<number>();
const jumper = computed(() => userInput.value ?? props.page.pageIndex);
const jumperChangeHandle = () => {
  emits(`current-change`, userInput.value);
};
const selectionChangeHandle = (val: any[]) => {
  emits(`selection-change`, val);
};

const clearSelection = () => {
  tableRef.value.clearSelection();
};
defineExpose({
  clearSelection,
});

onUnmounted(() => {});
watch(
  () => domRef.value,
  (e) => {
    init();
  }
);
</script>

<template>
  <div class="common-table" ref="domRef">
    <div class="common-table__header" ref="headerRef">
      <slot name="header" />
    </div>
    <el-table
      ref="tableRef"
      :data="props.data"
      v-loading=" props.Loading "
      row-key="id"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        align="center"
        v-if="props.selection"
        type="selection"
        width="50"
        fixed
      />

      <el-table-column label="序号" align="center" width="75" fixed>
        <template #default="scope">
          <span ref="indexRef">
            {{ (props.page.pageIndex - 1) * props.page.pageSize + scope.$index + 1 }}
          </span>
        </template>
      </el-table-column>
      <template #empty>
        <div>
          <img src="@/assets/table.png" alt="" />
        </div>
      </template>
      <slot />
    </el-table>
    <el-pagination
      ref="paginationRef"
      :current-page="props.page.pageIndex"
      :page-size="props.page.pageSize"
      :page-sizes="props.pageSizes"
      layout="total,prev, pager, next, sizes, slot"
      :total="props.page.totalRecord"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    >
      <template #default>
        <span class="el-pagination__jump">
          <span class="el-pagination__goto">跳转</span>
          <el-input-number
            :model-value="jumper"
            :min="1"
            :max="props.page.totalPage === 0 ? 1 : props.page.totalPage"
            :controls="false"
            :style="{ width: `56px` }"
            @update:model-value="(val: number) => userInput = +val"
            @blur="jumperChangeHandle"
          />
          <span class="el-pagination__classifier">页</span>
          <!-- <span  class="el-pagination__jumper-button"
            >跳转</span
          > -->
        </span>
      </template>
    </el-pagination>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
