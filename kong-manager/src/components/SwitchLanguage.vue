<template>
  <div class="switch-language" ref="dropdownRef">
    <button class="lang-btn" @click="toggleDropdown">
      {{ currentLangLabel }}
    </button>
    <ul v-if="dropdownVisible" class="lang-dropdown">
      <li :class="{ 'lang-current': lang.code === currentLang }" v-for="lang in languages" :key="lang.code" @click="switchLanguage(lang.code)">
        {{ lang.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {switchLanguageGlobal, currentLang} from '@/main' // 引入你 main.ts 中的 ref 和 i18n
import {onClickOutside} from '@vueuse/core'

// 下拉菜单状态
const dropdownVisible = ref(false)

// 可切换语言
const languages = [
  {code: 'zh', label: '中文'},
  {code: 'en', label: 'English'}
]

// 当前显示的语言文字
const currentLangLabel = computed(() => {
  const lang = languages.find(l => l.code === currentLang.value)
  return lang ? lang.label : currentLang.value
})

// 切换语言
const switchLanguage = (lang: any) => {
  switchLanguageGlobal(lang)
  dropdownVisible.value = false
}

// 打开/关闭下拉
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

// 点击外部关闭下拉
const dropdownRef = ref<HTMLElement | null>(null)
onClickOutside(dropdownRef, () => {
  dropdownVisible.value = false
})
</script>

<style scoped lang="scss">
.switch-language {
  position: relative;
  display: inline-block;

  .lang-btn {
    padding: 4px 12px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    width: 80px;
    font-size: 16px;
  }

  .lang-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    padding: 0;
    list-style: none;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    li {
      padding: 6px 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;

      &:hover {
        opacity: 0.6;
      }
    }
  }
  .lang-current{
    background: skyblue;
  }
}
</style>
