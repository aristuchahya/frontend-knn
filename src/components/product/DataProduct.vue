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
        
        <DataTable :columns="columns" :rows="products" >
          <template #cell-actions="{ row }">
            <div class="flex gap-2">
              <DialogProduct :product="row"/>
               <Button size="sm" variant="destructive" @click="handleDelete(row.kode_ikan)">
                  Delete
              </Button>
            </div>
          </template>
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
import DialogProduct from '../dialog-edit/DialogProduct.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const products = ref([] as any[]);
const isLoading = ref(false);
const allResult = ref([]);


const columns = [
  { key: 'no', label: 'No' },
  { key: 'kode_ikan', label: 'Kode', headClass: 'w-[100px]' },
  { key: 'jenis_ikan', label: 'Nama' },
  { key: 'stok', label: 'Stok' },
  { key: 'harga', label: 'Harga' },
  { key: 'actions', label: 'Actions', headClass: 'w-[180px]', cellClass: 'w-[180px]' },
];

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const res = await api.get('/product')
    const dataIndex = res.data.map((item: any, index: number) => {
      
      const lastStock = item.stok_history?.length 
        ? item.stok_history[item.stok_history.length - 1].stok_setelah 
        : 0

      return {
        id: item.id,
        no: index + 1,
        kode_ikan: item.kode_ikan,
        jenis_ikan: item.jenis_ikan,
        stok: lastStock, 
        harga: item.harga
      }
    })
    products.value = dataIndex
    allResult.value = dataIndex
    toast.success('Data Produk berhasil diambil')
  } catch (error) {
    toast.error('Data Produk masih kosong')
  }
}

const handleDelete = async (kode: string) => {
  try {
    await api.delete(`/product/${kode}`)
    products.value = products.value.filter(p => p.kode_ikan !== kode);
    toast.success('Produk Berhasil Dihapus')
    router.go(0)
  } catch (error) {
    toast.error('Produk Gagal Dihapus')
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



</script>
<style lang="">
    
</style>