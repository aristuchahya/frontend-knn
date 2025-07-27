<template >
    <Card class="w-1/2 " id="card-form1">
        <CardHeader>
            <CardTitle>Form Penjualan</CardTitle>
            <CardDescription>Form ini digunakan untuk mencatat penjualan ikan</CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit="onSubmit" class="flex flex-col">
                <!-- <FormReuse name="kode_ikan" type="number" label="Kode Ikan" /> -->
                <FormReuse name="jenis_ikan" type="text" label="Jenis Ikan" />
                <FormReuse name="jumlah" type="number" label="Jumlah Penjualan" />
                <FormReuse name="hari" type="text" label="Hari" />
                <FormReuse name="tanggal" type="date" label="Tanggal" placeholder="dd/mm/yyyy"/>
                <Button type="submit" :disabled="isSubmitting" class="cursor-pointer mt-4 ml-auto" >
                <span v-if="isSubmitting" class="animate-spin mr-2">⏳</span>
                {{ isSubmitting ? 'Memproses...' : 'Submit' }}
                </Button>
            </form>
        </CardContent>

    </Card>
</template>
<script setup lang="ts">
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import FormReuse from './FormReuse.vue';
import * as z from 'zod'
import {toast} from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {  useRouter } from 'vue-router';
import api from '@/lib/axios';

const router = useRouter()

const formSchema = toTypedSchema(z.object({
    jenis_ikan: z.string().min(1, 'Jenis Ikan tidak boleh kosong'),
    jumlah: z.number().min(0, 'Jumlah tidak boleh kosong'),
    hari: z.string().min(1, 'Hari tidak boleh kosong'),
    tanggal: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD'),
}))

const {handleSubmit, isSubmitting, resetForm} = useForm({
    validationSchema: formSchema
})

const onSubmit = handleSubmit( async (values) => {
    
    try {
        await api.post('/sales', values)
        toast.success('Penjualan Berhasil Ditambahkan')
        resetForm()
        await router.push('/sales')
    } catch (error) {
        toast.error('Penjualan Gagal Ditambahkan')
    }
})

</script>
<style >
    #card-form1{
        max-height: fit-content;
        margin-left: auto;
        margin-right: auto;
        margin-top: 12pt;
    }
</style>