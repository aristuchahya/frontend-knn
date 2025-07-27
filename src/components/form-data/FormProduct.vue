<template >
    <Card class="w-1/2 " id="card-form1">
        <CardHeader>
            <CardTitle>Form Produk</CardTitle>
            <CardDescription>Form ini digunakan untuk menambahkan produk</CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit="onSubmit" class="flex flex-col">
                <FormReuse name="kode_ikan" type="text" label="Kode Ikan" />
                <FormReuse name="jenis_ikan" type="text" label="Jenis Ikan" />
                <FormReuse name="harga" type="number" label="Harga" />
                <FormReuse name="stok" type="number" label="Stok"/>
                <FormReuse name="tanggal" type="date" label="Tanggal" placeholder="yyyy-mm-dd"/>
                <Button type="submit" :disabled="isSubmitting" class="cursor-pointer mt-4 ml-auto" >
                <span v-if="isSubmitting" class="animate-spin mr-2">⏳</span>
                {{ isSubmitting ? 'Memproses...' : 'Submit' }}
                </Button>
            </form>
        </CardContent>

    </Card>
</template>
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import FormReuse from './FormReuse.vue';
import * as z from 'zod'
import {toast} from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import api from '@/lib/axios';
import { useRouter } from 'vue-router';
import { Button } from '../ui/button';

const router = useRouter()

const formSchema = toTypedSchema(z.object({
    kode_ikan: z.string().min(0, 'Kode Ikan tidak boleh kosong'),
    jenis_ikan: z.string().min(1, 'Jenis Ikan tidak boleh kosong'),
    harga: z.number().min(0, 'Harga tidak boleh kosong'),
    stok: z.number().min(0, 'Stok tidak boleh kosong'),
    tanggal: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
}))

const { handleSubmit, resetForm, isSubmitting} = useForm({
    validationSchema: formSchema
})

const onSubmit = handleSubmit( async (values) => {
    try {
        await api.post('/product', values)
        toast.success('Produk Berhasil Ditambahkan')
        resetForm()
        await router.push('/')
    } catch (error) {
        toast.error('Produk Gagal Ditambahkan')
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