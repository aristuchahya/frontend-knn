<template>
  
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Sistem Prediksi Stok</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <router-link
                        v-if="item.title !== 'Logout'"
                        :to="item.url"
                        :class="route.path === item.url ? 'text-blue-500 font-bold' : 'text-gray-700'"
                      >
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                      </router-link>
                      <a
                        v-else
                        href="#"
                        @click.prevent="handleLogout"
                        class="text-gray-700"
                      >
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                      </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from './ui/sidebar'

import {
  Home,
  LogOut,
  BadgePercent,
  Brain,
  Folders,
  BookPlus,
  ChartLine
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const items = [
  {
    title: "Data Produk",
    url: "/",
    icon: Home,
  },
  {
    title: "Data Penjualan",
    url: "/sales",
    icon: BadgePercent,
  },
  {
    title: "Chart Penjualan",
    url: "/chart",
    icon : ChartLine
  },
  {
    title: "Data Latih",
    url: "/train",
    icon: Brain,
  },
  {
    title: "Data Hasil",
    url: "/result",
    icon: Folders,
  },
  {
    title: "Form Prediksi",
    url: "/form",
    icon: BookPlus,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  }
];

const handleLogout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user")
  router.push("/login")
}


</script>
<style lang="">
  
</style>