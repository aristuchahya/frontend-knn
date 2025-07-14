<template >
    <div class="p-4 w-1/2 m-auto">
        <div class="flex">
        <h1 class="text-xl font-bold mb-4">Daftar Penjualan </h1>
        <router-link to="/form-sales" class="ml-auto">
          <Button variant="default" >Add</Button>
        </router-link>
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

const sales = ref([] as any[]);
const isLoading = ref(false);
const allResult = ref([]);

const columns = [
  { key: 'kode_ikan', label: 'Kode', headClass: 'w-[100px]' },
  { key: 'jenis_ikan', label: 'Nama' },
  { key: 'jumlah', label: 'Jumlah' },
  { key: 'tanggal', label: 'Tanggal' },
  // { key: 'actions', label: 'Actions' },
];

const fetchSales = async () => {
  isLoading.value = true
  try {
    const res = await api.get('/sales')
    sales.value = res.data
    allResult.value = res.data
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
  fetchSales()
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