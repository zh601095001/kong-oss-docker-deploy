import { createApp, ref } from 'vue'
import { createI18n, Translation } from '@kong-ui-public/i18n'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'
import App from '@/App.vue'
import { router } from '@/router'
import { registerGlobalComponents } from './registerGlobalComponents'
import './styles/index'
import { createPinia } from 'pinia'

// 可切换的语言列表
const messages = { en, zh }

// 从 localStorage 读取当前语言，默认 'zh'
const savedLang = localStorage.getItem('app-lang')
const currentLang = ref<any>(savedLang === 'en' ? 'en' : 'zh')

// 创建 i18n 实例
const i18n = createI18n<typeof en>(
    currentLang.value,
    messages[currentLang.value],
    { isGlobal: true }
)

// 切换语言函数：写入 localStorage 并刷新页面
const switchLanguageGlobal = (lang: 'zh' | 'en') => {
    if (currentLang.value === lang) return

    localStorage.setItem('app-lang', lang)
    // 刷新页面，让 i18n 重新初始化
    window.location.reload()
}

const app = createApp(App)
const pinia = createPinia()

app.use(Translation.install<typeof en | typeof zh>, { i18n })
app.use(pinia)
app.use(router)
registerGlobalComponents(app)
app.mount('#app')

export { switchLanguageGlobal, currentLang }
