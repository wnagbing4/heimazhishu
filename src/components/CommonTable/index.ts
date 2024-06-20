/*
 * @Author: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @Date: 2024-06-19 08:52:50
 * @LastEditors: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @LastEditTime: 2024-06-19 08:53:28
 * @FilePath: \Dark_horse\src\components\CommonTable\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App } from "vue";
import CommonTable from "./index.vue";

export default function install(app: App) {
    app.component("ICommonTable", CommonTable);
}
