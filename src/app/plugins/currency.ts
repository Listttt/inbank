import type {App} from 'vue'
import {formatCurrency} from "@/shared/helper/currency";

export default {
    install: (app: App) => {
        app.config.globalProperties.$c = formatCurrency
    }
}