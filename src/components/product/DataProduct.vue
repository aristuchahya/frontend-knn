<template >
    <div class="p-4 w-1/2 m-auto">
      <div class="flex">
        <h1 class="text-xl font-bold mb-4">Daftar Produk </h1>
        <router-link to="/form-product" class="ml-auto">
          <Button variant="default" >Add</Button>
        </router-link>
      </div>
      <form class="mb-4 mt-2" @submit="submitFilter">
        <FormReuse name="search" type="search" placeholder="Cari Produk..." />
      </form>
        
        <DataTable :columns="columns" :rows="products">
        <!-- <template #cell-actions="{ row }">
            <Button size="sm" variant="outline" @click="editProduct(row)" >Edit</Button>
        </template> -->
        </DataTable>
        
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from '../DataTable.vue';
import api from '@/lib/axios';
import FormReuse from '../form-data/FormReuse.vue';
import { Button } from '../ui/button';
import { toast } from 'vue-sonner';

const products = ref([] as any[]);
const isLoading = ref(false);
const allResult = ref([]);


const columns = [
  { key: 'no', label: 'No' },
  { key: 'kode_ikan', label: 'Kode', headClass: 'w-[100px]' },
  { key: 'jenis_ikan', label: 'Nama' },
  { key: 'stok', label: 'Stok' },
  { key: 'harga', label: 'Harga' },
];

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const res = await api.get('/product')
    const dataIndex = res.data.map((item: any, index: number) => ({
      no: index + 1,
      kode_ikan: item.kode_ikan,
      jenis_ikan: item.jenis_ikan,
      stok: item.stok,
      harga: item.harga
    }))
    products.value = dataIndex
    allResult.value = dataIndex
    toast.success('Data Produk berhasil diambil')
  } catch (error) {
    toast.error('Data Produk masih kosong')
  }
}

const submitFilter = (event: SubmitEvent) => {
  event.preventDefault()
  const keywords = ((event.target as any)[0].value as string).trim().toLowerCase().split(' ')
  if (keywords.length === 0) {
    products.value = allResult.value
    return
  }
  products.value = allResult.value.map((product: any) => {
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
  fetchProducts()
})

// function editProduct(product : any) {
//   alert(`Edit product: ${product.id}`);
// }

</script>
<style lang="">
    
</style>