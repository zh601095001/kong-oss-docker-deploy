<template>
  <div :key="currentLang">
  <AppLayout
    :sidebar-top-items="sidebarItems"
  >
    <template #navbar-right>
      <SwitchLanguage/>
    </template>
    <template #sidebar-header>
      <NavbarLogo />
    </template>
    <router-view />
    <MakeAWish />
  </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { AppLayout, type SidebarPrimaryItem } from '@kong-ui-public/app-layout'
import { useInfoStore } from '@/stores/info'
import NavbarLogo from '@/components/NavbarLogo.vue'
import MakeAWish from '@/components/MakeAWish.vue'
import { useI18n } from '@/composables/useI18n'
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import {currentLang} from "@/main";


const route = useRoute()
const infoStore = useInfoStore()
const { t } = useI18n()

const { isHybridMode } = storeToRefs(infoStore)

const sidebarItems = computed<SidebarPrimaryItem[]>(() => {
  return [
    {
      name: t('sidebar.overview'),
      to: { name: 'overview' },
      key: 'Overview',
      active: route.name === 'overview',
    },
    {
      name: t('sidebar.services'),
      to: { name: 'service-list' },
      key: 'Gateway Services',
      active: route.meta?.entity === 'service',
    },
    {
      name: t('sidebar.routes'),
      to: { name: 'route-list' },
      key: 'Routes',
      active: route.meta?.entity === 'route',
    },
    {
      name: t('sidebar.consumers'),
      to: { name: 'consumer-list' },
      key: 'Consumers',
      active: route.meta?.entity === 'consumer',
    },
    {
      name: t('sidebar.plugins'),
      to: { name: 'plugin-list' },
      key: 'Plugins',
      active: route.meta?.entity === 'plugin',
    },
    {
      name: t('sidebar.upstreams'),
      to: { name: 'upstream-list' },
      key: 'Upstreams',
      active: route.meta?.entity === 'upstream',
    },
    {
      name: t('sidebar.certificates'),
      to: { name: 'certificate-list' },
      key: 'Certificates',
      active: route.meta?.entity === 'certificate',
    },
    {
      name: t('sidebar.caCertificates'),
      to: { name: 'ca-certificate-list' },
      key: 'CA Certificates',
      active: route.meta?.entity === 'ca-certificate',
    },
    {
      name: t('sidebar.snis'),
      to: { name: 'sni-list' },
      key: 'SNIs',
      active: route.meta?.entity === 'sni',
    },
    {
      name: t('sidebar.vaults'),
      to: { name: 'vault-list' },
      key: 'Vaults',
      active: route.meta?.entity === 'vault',
    },
    {
      name: t('sidebar.keys'),
      to: { name: 'key-list' },
      key: 'Keys',
      active: route.meta?.entity === 'key',
    },
    {
      name: t('sidebar.keySets'),
      to: { name: 'key-set-list' },
      key: 'Key Sets',
      active: route.meta?.entity === 'key-set',
    },
    ...(
        isHybridMode.value
            ? [
              // 可根据需要继续添加 i18n
            ]
            : []
    ),
  ]
})

</script>

<style scoped lang="scss">
.app-title {
  color: #fff;
  margin: 0;
  font-size: 20px;
}

:deep(.kong-ui-app-layout-content-inner) {
  position: relative;
  min-height: 100%;
  padding: 32px 40px 80px !important;
}

:deep(.json-content.k-code-block) {
  border-top-left-radius: $kui-border-radius-0 !important;
  border-top-right-radius: $kui-border-radius-0 !important;
}
</style>
