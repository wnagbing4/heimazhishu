
import type { App } from "vue";
import CommonTable from "./index.vue";

export default function install(app: App) {
    app.component("ICommonTable", CommonTable);
}
