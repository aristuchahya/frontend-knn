<template >
    <div class="p-4 w-1/2 m-auto">
      <div class="flex">
        <h1 class="text-xl font-bold mb-4">Data Prediksi</h1>
        <Button variant="default" class="cursor-pointer ml-auto">
          <JsonExcel
            :data="excelData"
            :fields="excelFields"
            name="data-prediksi"
            type="xls"
            
          >
            Export Excel
          </JsonExcel>
          
        </Button>
      </div>
        <form class="mb-4 mt-2" @submit="submitFilter">
            <FormReuse name="search" type="search" placeholder="Cari Prediksi..." />
        </form>
        
        


        <DataTable :columns="columns" :rows="results" :loading="isLoading" :perPage="10">
        </DataTable>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from '../DataTable.vue';
import api from '@/lib/axios';
import FormReuse from '../form-data/FormReuse.vue';
import JsonExcel from "vue-json-excel3";
import { Button } from '../ui/button';


const columns = [
  { key: 'no', label: 'No' },
  { key: 'jenis_ikan', label: 'Nama' },
  { key: 'hari', label: 'Hari' },
  { key: 'stok', label: 'Stok' },
  { key: 'terjual', label: 'Terjual' },
  { key: 'rasio', label: 'Rasio' },
  { key: 'persentase', label: 'Persentase' },
  { key: 'prediksi', label: 'Prediksi' },
];



const excelFields = {
  No: 'no',
  Nama: 'jenis_ikan',
  Hari: 'hari',
  Stok: 'stok',
  Terjual: 'terjual',
  Rasio: 'rasio',
  Persentase: 'persentase',
  Prediksi: 'prediksi',
  Tanggal: 'created_at',
}
const excelData = ref<any[]>([])

const results = ref([] as any[]);
const isLoading = ref(false);
const allResult = ref([]);

const fetchResult = async () => {
    isLoading.value = true
    try {
        const res = await api.get('/data_train/all-predict')

        const dataWithIndex = res.data.map((item: any, index: number) => ({
          no: index + 1,
          jenis_ikan: item.jenis_ikan,
          hari: item.hari,
          stok: item.stok,
          terjual: item.terjual,
          rasio: item.rasio,
          persentase: item.persentase,
          prediksi: item.prediksi,
          created_at: new Date(item.created_at).toLocaleString(),
        }));

        results.value = dataWithIndex
        allResult.value = dataWithIndex
        excelData.value = dataWithIndex

    } catch (error) {
        alert(`Error Fetch Train: ${error}`)
    } finally {
        isLoading.value = false
    }
}

const submitFilter = (event: SubmitEvent) => {
  event.preventDefault()
  const keywords = ((event.target as any)[0].value as string).trim().toLowerCase().split(' ')
  if (keywords.length === 0) {
    results.value = allResult.value
    return
  }
  results.value = allResult.value.map((product: any) => {
    return [`${product.jenis_ikan} ${product.stok} ${product.terjual} ${product.hari} ${product.rasio} ${product.persentase} ${product.prediksi}`.toLowerCase(), product]
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
    fetchResult()
})


</script>
<style lang="">
    
</style>