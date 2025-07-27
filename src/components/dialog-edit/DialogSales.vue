<template >
    
    
        <DialogReuse title="Edit Penjualan" description="Edit Penjualan">
            <template #trigger>
                <Button size="sm" variant="outline">Edit</Button>
            </template>
            <template #content>
                <form @submit.prevent="onSubmit">
                <FormReuse name="jenis_ikan" type="text" label="Jenis Ikan" />
                <FormReuse name="jumlah" type="number" label="Jumlah" />
                <FormReuse name="hari" type="text" label="Harga" />
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

import { DialogFooter } from '../ui/dialog';
import type { Sales } from '@/types/sales';


const props = defineProps<{
  sales: Sales
}>()

const emit = defineEmits(['updated'])



const formSchema = toTypedSchema(z.object({
    id : z.number(),
  kode_ikan: z.string(),
  jenis_ikan: z.string().optional(),
  jumlah: z.number().optional(),
  hari : z.string().optional(),
  tanggal: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
}));

const { handleSubmit, resetForm, isSubmitting} = useForm({
  validationSchema: formSchema,
  initialValues: {
    id : props.sales.id,
    kode_ikan: props.sales.kode_ikan,
    jenis_ikan: props.sales.jenis_ikan,
    hari: props.sales.hari,
    tanggal: props.sales.tanggal
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await api.patch(`/sales/${values.id}`, values);
    toast.success('Penjualan Berhasil Diupdate');
    resetForm();
    emit('updated', res.data);
  } catch (error) {
    toast.error('Penjualan Gagal Diupdate');
  }
});


</script>
<style lang="">
    
</style>