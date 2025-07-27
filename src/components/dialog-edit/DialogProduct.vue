<template >
    
    
        <DialogReuse title="Edit Produk" description="Edit Produk">
            <template #trigger>
                <Button size="sm" variant="outline">Edit</Button>
            </template>
            <template #content>
                <form @submit.prevent="onSubmit">
                <FormReuse name="jenis_ikan" type="text" label="Jenis Ikan" />
                <FormReuse name="stok" type="number" label="Stok" />
                <FormReuse name="harga" type="number" label="Harga" />
                <FormReuse name="tanggal" type="date" label="Tanggal" placeholder="yyyy-mm-dd"/>
                
                
                <DialogFooter class="mt-4">
                    <Button type="submit" :disabled="isSubmitting" class="ml-auto">
                        <span v-if="isSubmitting" class="animate-spin mr-2">⏳</span>
                        {{ isSubmitting ? 'Memproses...' : 'Submit' }}
                    </Button>
                </DialogFooter>
                </form>
            </template>
        </DialogReuse>
    
    
</template>
<script setup lang="ts">

import DialogReuse from '../form-data/DialogReuse.vue';
import FormReuse from '../form-data/FormReuse.vue';
import { Button } from '../ui/button';
import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';
import { useForm } from 'vee-validate';
import api from '@/lib/axios';
import { toast } from 'vue-sonner';
import type { Product } from '@/types/product';
import { DialogFooter } from '../ui/dialog';

const props = defineProps<{
  product: Product
}>()


const emit = defineEmits(['updated'])

const formSchema = toTypedSchema(z.object({
  kode_ikan: z.string(),
  jenis_ikan: z.string().optional(),
  harga: z.number().optional(),
  stok: z.number().optional(),
  tanggal: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
}));

const { handleSubmit, resetForm, isSubmitting} = useForm({
  validationSchema: formSchema,
  initialValues: {
    kode_ikan: props.product.kode_ikan,
    jenis_ikan: props.product.jenis_ikan,
    harga: props.product.harga,
    stok: props.product.stok,
    tanggal: props.product.tanggal
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await api.patch(`/product?kode=${values.kode_ikan}`, values);
    toast.success('Produk Berhasil Diupdate');
    resetForm();
    emit('updated');
  } catch (error) {
    toast.error('Produk Gagal Diupdate');
  }
});


</script>
<style lang="">
    
</style>