<script setup lang="ts">
// 获取菜单仓库
import { useMenuStore } from '@/stores/useMenuStore'
const menuStore = useMenuStore()
</script>
<template>
  <el-aside width="200px" class="layout-aside">
    <img
      style="width: 200px"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAB8CAMAAACG2ZMrAAAAOVBMVEUAAABIcP9HcP9HcP9HcP9IcP9IcP9IcP9HcP9HcP9HcP9HcP9HcP9QcP9HcP9FcP9KcP9AcP9HcP/Sk9KTAAAAEnRSTlMAQL/fnyBggO/PcJBQEK8wMBBdxx0AAAAH3UlEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAIDZr7ddR2EYCqDOjVwgofX/f+xopox6jGPU81akvR5LoXW8YwAAAAAAAAAAAAAAAAAAAAAAAAAAAOAXHi2OEJi5hOB9zIvr9F2S21qOvhZWiPiHBx0Gmwo9+VMPqnxhoag++S+w1MkUWSm61EA7Xyr6E0fUc2EtjI2+Ud/dktcfna6yajqIvuRFhMOTY1PO6/DBiI9zWxOHH6qNjQ6LSqLpWVhZ/5Uq/kwgx5fG65x3rSFRz2yI9N3Sa7EjbfxW6fAU21CekqmxpciRMYz4dOf+HvaUVEDo4FmqZFpYi+f5JUqda+fl2SlVtji6iSwyfHCiaWcrfxxrGR9l0zvvRXXekymwNuwk/KJlPbAl0F0Ma0DaS+vZsl1lYZCyWgmJ+oDFsWTnofGlPru533VCv9VZhlexqc4KG8plFhop1Vq3oGe3JX68wTJfKbPo3GJCP5Nb2hp9mJB32z7rSwlCpZ1NQUqiUWX645K3humYFxAp8VRQGkW+dK6TPN9sQuu3parutnqPrnn4yvzJQ3SUV2fZwaXlaF5JNrhOd4x4yhUvWloST+z6q5qXV460820n9B/qzW07bhCGouLuC9hu/v9jmyZtmCPJyLP6Yu+3ZAaMkYAjifkbLflpo0U5uPiyhrldqYxPsR6gCPfBngoVfWVoU3uoQcDcN3NGY4p9nir54fpNOPg69Id7RsHA4LQVdtFlmS1dufvYai2cHat2jIQksh6HTMlW5yFMP5PyGIQKsu0yvzZxLyTbfZBJVzrJVEC20Q6SuBeqKZp2CMNT+9l/ltUXegyT9pLb0C7GQjHcB6ZQAqvSDoP3ayrX1O+LEVStdGOO71NFYbsgomcPoPaYiBL0DiSaoCNkUePSpmcugtc4YDMvr+1yO3/tRRwCk+c42tABbg/kZlUdO6trNPImFf5iqgfCIlxfvNpR1cM86eHnSk0WTAIlaAoG5nry5T0bFdY7dK2VSXzJ7rhbDcmOllZatEAQVlBv8hUtrYPkFKpW6T7oZomCbuA4yBNDrJRhM4/QX6EOumBI3L6RpDcQaUrMr3dKcJi0BotIZRZN/KuBc2eXvS8DX0j6+ekoXQ5LGpjUDQyMLHYdI/VhMEJJ9CDmD4NtED2YOmUbznjWLZktUaz3EHBkkU6pzGLNTHEjIdNz+LAohJxX+93Yfeq1JHLWHaiZIj1fNfA+iQSHrc+RW0VJ7ai5RJUV3kLHR6Cce/YWGUTYEdL03SPr/UfJwiQWGniKKgeBFIPvAZQ+HlJq+AI0KChiixmbQG4TmKB3eUWmfzq8+FNUVRCcHH2myFZsgKd3Odcpwr47ZLg7jaaR29NteY2WIK2sM7FIYzmt9nuQqsJ9Zu3TTvj5Xpf00Lm4chToF0gsbmAZNXzaV5Tw4Th99QlH/llLWJLcBRHteZPT9175loHRyMY6SuApPspN2Q9P1JRQYgn5R5ImRGUZzI04Kx6W+DBE9NvV/mokKoefrtLAabIMAXkNaWCN+I5YKs8tFxqKeGCXc+1x2JdFEPAOMZkePs9WHBPLJ5OVJS+W9yLlEQZOe806DuZIZx01mULoFbTMQfdZhs8+hHTLOw6DQxQN1xRvS0UJ8VNyWacSpfgAA/+VGSgoURHjhRqUwszeLDmFwgqYyV3uaBLZjYAabOOX9j0lS/4HFu6KBFZ7mR+Xyxo9vkNMRClHP909Ej67tFP0cm2Fmccmyyg5hfGGuCzS89mfVPLDeI2VmiBRzGMknQpDn5JIYCXSaMnVXNZvj4rHz3st6/SoGx1/xnyQ14Zc0C7QJGFyauRIDt2HdYRhpkyfoMgOondQVCoZnpjUBJY9SXvT1eVBjwDqY+9X+4//qPbvwwpDJLbCBfk9eSgSHMksxKiC9FlXdmDMdgJZ2gUxLosMDNS4gR0OY9O8x6Bw+wKrQ5SAyq/VdSszTUC3IbkzjgvV/oU3qQNV4wB0n+qARht7NpNY+I/oECw16myv1mvBUGTC3uGf9PTez6g8P7lVPQmkj6GIzSpK+biIH8ZgBwX2bJZmHlvQgcSymO2ETkAHsH6nNt30bscO0ZKuiDGB3DPXoH1VMkRL6D6+3/NQ7tosxCpB/N6O+zeO3twk/Axlo3rhwP5eBqE70JPzWF/xwwURvbEmIKI5B2wZlbkPfJip8sz9zOZvga5xHI6yXkqEO359KPa+4zBngBuK5Cl3Oozf9pvVfuStav/KW3o2f+uw3K9Vms7LSXZNpclLH0+p9w/Y3xfRbnDSvRVQzdxCkf3tR0FJVQTPoJF5BE9SQw8INzqB0zntwm/7K2+yDFQVfhV9ISH0S+T8I1qszZCUAJghUwcUAjxtzJyA8Q4dbrVBt72LG2Q1f9uPQLXfxFO1FDbuE4XtraPWCYzj/RwsPf8WkfJj7NsRN1jqBRENTYxbDmuX0MJ9fNfXSrR1oIGjqEpuXznsPvCo7P5pdy57dWB21qvu7s8AJ5gZnXKj/XlccBBpZal+IjTZ4KcoggO2DAeTtOCl+EM5LDNKVMdETQ/of7dzBykQwjAUQDu1qNPUev/bunAlKOhO8L07hB9I+P34qvO/jM461ilKzy3F3SV6WVuNktLYz1N7jreOL08tvzaVnIdh3k+puUR9Xf8ZAAAAAAAAAAAAAAAAAF+2AQ1+QfCivLd6AAAAAElFTkSuQmCC"
      alt=""
    />
    <!-- 侧边栏 -->
    <el-menu
    router
      active-text-color="#4770ff"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      text-color="black"
    >
    <Menu :menuList="menuStore.menuList"></Menu>
    </el-menu>
  </el-aside>
</template>
<style lang="scss" scoped>
.layout-aside {
  background-color: #fff;
}
</style>
