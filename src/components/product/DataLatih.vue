<template >
    <div class="p-4 w-1/2 m-auto">
      <div class="flex">
        
        <h1 class="text-xl font-bold mb-4">Data Latih</h1>
        <router-link to="/form-train" class="ml-auto">
          <Button variant="default" >Add Data Train</Button>
        </router-link>
      </div>
        <form class="mb-4 mt-2" @submit="submitFilter">
            <FormReuse name="search" type="search" placeholder="Cari Produk..." />
        </form>
        <DataTable :columns="columns" :rows="trains" :loading="isLoading" :perPage="10">
        </DataTable>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from '../DataTable.vue';
import api from '@/lib/axios';
import FormReuse from '../form-data/FormReuse.vue';
import { toast } from 'vue-sonner';
import Button from '../ui/button/Button.vue';


const columns = [
  { key: 'id', label: 'Kode', headClass: 'w-[100px]' },
  { key: 'jenis_ikan', label: 'Nama' },
  { key: 'hari', label: 'Hari' },
  { key: 'stok', label: 'Stok' },
  { key: 'terjual', label: 'Terjual' },
];
const trains = ref([] as any[]);
const isLoading = ref(false);
const allResult = ref([]);

const fetchTrains = async () => {
    isLoading.value = true
    try {
        const res = await api.get('/data_train')
        trains.value = res.data
        allResult.value = res.data
        toast.success('Data Latih berhasil diambil')
    } catch (error) {
        toast.error('Data Latih masih kosong')
    } finally {
        isLoading.value = false
    }
}

const submitFilter = (event: SubmitEvent) => {
  event.preventDefault()
  
  const keywords = ((event.target as any)[0].value as string).trim().toLowerCase().split(' ')
  if (keywords.length === 0) {
    trains.value = allResult.value
    return
  }
  trains.value = allResult.value.map((product: any) => {
    return [`${product.jenis_ikan} ${product.stok} ${product.hari}`.toLowerCase(), product]
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
    fetchTrains()
})


</script>
<style lang="">
    
</style>