<template >
    <div class="rounded-lg border border-gray-200 p-2">
    <div v-if="loading" class="text-center py-10 text-gray-500">Loading...</div>

    <div v-else>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead v-for="col in columns" :key="col.key" :class="col.headClass">
              {{ col.label }}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="(row, index) in paginatedRows"
            :key="row.id ?? index"
          >
            <TableCell v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :row="row">
                {{ row[col.key] }}
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <!-- PAGINATION -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-sm text-gray-600">
          Menampilkan {{ startIndex + 1 }} - {{ endIndex }} dari {{ rows.length }} data
        </span>

        <div class="flex gap-2">
          <Button variant="outline" class="text-sm cursor-pointer" size="sm" :disabled="page === 1" @click="page--">Prev</Button>
          <Button variant="outline" class="text-sm cursor-pointer" size="sm" :disabled="endIndex >= rows.length" @click="page++">Next</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Column {
  key: string;
  label: string;
  headClass?: string;
}

const props = defineProps<{
  columns: Column[]
  rows: Record<string, any>[]
  loading?: boolean
  perPage?: number
}>()

const page = ref(1)
const perPage = computed(() => props.perPage ?? 10)

watch(() => props.rows, () => {
  page.value = 1
})

const startIndex = computed(() => (page.value - 1) * perPage.value)
const endIndex = computed(() => Math.min(startIndex.value + perPage.value, props.rows.length))

const paginatedRows = computed(() => {
  return props.rows.slice(startIndex.value, endIndex.value)
})

</script>
<style lang="">
    
</style>