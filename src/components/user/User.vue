<template >
    <div class="rounded-lg border border-gray-200 ">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Kode</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Stok</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in users" :key="user.id">
          <TableCell>{{ user.id }}</TableCell>
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>{{ user.stok }}</TableCell>
          <TableCell>{{ user.harga }}</TableCell>
          <TableCell class="text-right">
            <Button variant="outline" size="sm">Edit</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script setup lang="ts">
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const users = [
    {
        id: '1',
        name: 'John Doe',
        stok: '10',
        harga: 'm@example.com',
    },
    {
        id: '2',
        name: 'Tiara Putri',
        stok: '15',
        harga: 'm@example.com',
    },
    {
        id: '3',
        name: 'Arya Putra',
        stok: '20',
        harga: 'm@example.com',
    },
]


</script>
<style lang="">
    
</style>