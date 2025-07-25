<template >
    <div class="p-4 w-1/2 m-auto">
        <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-bold mb-4">Daftar Penjualan </h1>
        <div class="flex gap-x-2">
          <router-link to="/form-sales" class="">
            <Button variant="default" >Add</Button>
          </router-link>
          <Button variant="default" class="cursor-pointer">
            <JsonExcel
              :data="excelData"
              :fields="excelFields"
              name="data-penjualan"
              type="xls"
              
            >
              Export Excel
            </JsonExcel>
            
          </Button>

        </div>
      </div>
      <form class="mb-4 mt-2" @submit="submitFilter">
        <FormReuse name="search" type="search" placeholder="Cari Penjualan..." />
      </form>
        <DataTable :columns="columns" :rows="sales">
        <!-- <template #cell-actions="{ row }">
            <Button size="sm" variant="outline" @click="editProduct(row)">Edit</Button>
        </template> -->
        </DataTable>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from '../DataTable.vue';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { toast } from 'vue-sonner';
import FormReuse from '../form-data/FormReuse.vue';
import JsonExcel from "vue-json-excel3";

const sales = ref([] as any[]);
const isLoading = ref(false);
const allResult = ref([]);

const columns = [
  { key: 'no', label: 'No' },
  { key: 'kode_ikan', label: 'Kode', headClass: 'w-[100px]' },
  { key: 'jenis_ikan', label: 'Nama' },
  { key: 'jumlah', label: 'Jumlah' },
  { key: 'tanggal', label: 'Tanggal' },
  { key: 'hari', label: 'Hari' },
  // { key: 'actions', label: 'Actions' },
];

const excelFields = {
  no: 'no',
  jenis_ikan: 'jenis_ikan',
  hari: 'hari',
  stok: 'stok',
  terjual: 'jumlah',
  tanggal: 'tanggal'
}
const excelData = ref<any[]>([])


const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await api.get('sales/product')
    const dataIndex = response.data.map((item: any, index: number) => ({
      no: index + 1,
      jenis_ikan: item.jenis_ikan,
      stok: item.stok,
      jumlah: item.jumlah,
      hari: item.hari,
      tanggal: item.tanggal

    }))

    excelData.value = dataIndex
    // toast.success('Data Produk berhasil diambil')
  } catch (error) {
    toast.error('Data Penjualan masih kosong')
  }
}

const fetchSales = async () => {
  isLoading.value = true
  try {
    const res = await api.get('/sales')
    const dataIndex = res.data.map((item: any, index: number) => ({
      no: index + 1,
      kode_ikan: item.kode_ikan,
      jenis_ikan: item.jenis_ikan,
      jumlah: item.jumlah,
      tanggal: item.tanggal,
      hari: item.hari
    }))

    sales.value = dataIndex
    allResult.value = dataIndex
    toast.success('Data Penjualan berhasil diambil')
  } catch (error) {
    toast.error('Data Penjualan masih kosong')
  }
}

const submitFilter = (event: SubmitEvent) => {
  event.preventDefault()
  const keywords = ((event.target as any)[0].value as string).trim().toLowerCase().split(' ')
  if (keywords.length === 0) {
    sales.value = allResult.value
    return
  }
  sales.value = allResult.value.map((product: any) => {
    return [`${product.jenis_ikan} ${product.stok} ${product.harga}`.toLowerCase(), product]
  }).filter(([strMatch]) => {
    let matchAll = false
    for (const keyword of keywords) {
      console.log(strMatch, keyword)
      if (strMatch.includes(keyword)) {
        matchAll = true
      } else {
        matchAll = false
        break

      }
    }
    return matchAll
  }).map((i) => i[1])
}

onMounted(() => {
  fetchSales(),
  fetchProducts()
})

// const products = [
//   { id: '1', name: 'Product 1', jumlah: '10', tanggal: '10/05/2025' },
//   { id: '2', name: 'Product 2', jumlah: '20', tanggal: '12/05/2025' },
//   { id: '3', name: 'Product 3', jumlah: '30', tanggal: '13/05/2025' },
// ];

// function editProduct(product : any) {
//   alert(`Edit product: ${product.id}`);
// }

</script>
<style lang="">
    
</style>