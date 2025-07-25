<template >
    <div class="w-[800px] h-[400px] m-auto">
      <div class="flex mt-2">
        <Select v-model="selectedBulan">
          <SelectTrigger>
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Bulan</SelectLabel>
              <SelectItem v-for="(bulan, index) in bulanList" :key="index" :value="index + 1">{{ bulan }}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select v-model="selectedTahun">
          <SelectTrigger>
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tahun</SelectLabel>
              <SelectItem v-for="tahun in tahunList" :key="tahun" :value="tahun">{{ tahun }}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button class="ml-auto" @click="fetchRekap">Cari</Button>
      </div>

        <Doughnut v-if="chartData" :data="chartData" :options="chartOption" />

        <div v-else class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
  </div>

    </div>
</template>
<script setup lang="ts">


import { Doughnut } from 'vue-chartjs'
import type { ChartOptions, ChartData } from 'chart.js'
import { Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
  ArcElement 
} from 'chart.js'
import { computed, onMounted, ref, type ComputedRef } from 'vue'
import api from '@/lib/axios'
import { toast } from 'vue-sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'


ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler, ArcElement)

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const tahunList = [2023, 2024, 2025] // bisa disesuaikan

const selectedBulan = ref(new Date().getMonth() + 1)
const selectedTahun = ref(new Date().getFullYear())
const rawData = ref<{ jenis_ikan: string; total_jumlah: number }[]>([])
const bulan = ref('')
const tahun = ref(0)
const loading = ref(true)


const fetchRekap = async () => {
  loading.value = true
  try {
    const res = await api.get(`/sales/rekap?tahun=${selectedTahun.value}&bulan=${selectedBulan.value}`)
    rawData.value = res.data.data
    bulan.value = res.data.bulan
    tahun.value = res.data.tahun
     if (rawData.value.length === 0) {
      toast.error('Data Rekap Penjualan Bulanan masih kosong')
    } else {
      toast.success('Data Rekap Penjualan Bulanan berhasil diambil')
    }
  } catch (error) {
    toast.error('Data Rekap Penjualan Bulanan masih kosong')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRekap()
})

const chartData = computed(() => ({
  labels: rawData.value.map((item) => item.jenis_ikan),
  datasets: [
    {
      label: 'Penjualan',
      data: rawData.value.map((item) => item.total_jumlah),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#66D7D1', '#FF6F91', '#845EC2', '#2C73D2'
      ]
    }
  ]
  
})) as ComputedRef<ChartData<'doughnut'>>

const chartOption = computed((): ChartOptions<'doughnut'> => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
     text: 'Grafik Penjualan Ikan Bulan ' + (bulan.value || '-') + ' Tahun ' + (tahun.value || '-')

    }
  }
}))


// const rawData = ref([
//   { hari: 'Senin', penjualan: 12, pembelian: 8 },
//   { hari: 'Selasa', penjualan: 19, pembelian: 14 },
//   { hari: 'Rabu', penjualan: 3, pembelian: 7 },
//   { hari: 'Kamis', penjualan: 5, pembelian: 5 },
//   { hari: 'Jumat', penjualan: 2, pembelian: 10 }
// ])

// const chartData  = computed(() => ({
//   labels: rawData.value.map((item) => item.hari),
//   datasets: [
//     {
//       label: 'Penjualan',
//       data: rawData.value.map((item) => item.penjualan),
//       borderColor: 'rgb(75, 192, 192)',
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       tension: 0.4,
//       fill: false
//     },
//     {
//       label: 'Pembelian',
//       data: rawData.value.map((item) => item.pembelian),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       tension: 0.4,
//       fill: false
//     }
//   ]
// })) as ComputedRef<ChartData<'line'>>

// const chartOption : ChartOptions<'line'> = {
//     responsive: true,
//     plugins: {
//         legend : {
//             position: 'top' 
//         },
//         title: {
//             display : true,
//             text : 'Grafik Penjualan & Pembelian'
//         }
//     }
// }



</script>
<style lang="">
    
</style>