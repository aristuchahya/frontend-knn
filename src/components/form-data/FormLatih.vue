<template >
    <Card class="w-1/2 " id="card-form1">
        <CardHeader>
            <CardTitle>Upload File Excel</CardTitle>
            <CardDescription>Upload File Excel untuk Melakukan Prediksi</CardDescription>
        </CardHeader>
        <CardContent>
            
            <form @submit="onSubmit" class="w-full space-y-6">
           
                <FormReuse name="file"  type="file" accept=".xls, .xlsx" class="cursor-pointer"/>
                
                <Button type="submit" :disabled="isSubmitting" class="cursor-pointer" >
                <span v-if="isSubmitting" class="animate-spin mr-2">⏳</span>
                {{ isSubmitting ? 'Memproses...' : 'Submit' }}
                </Button>
            </form>
        </CardContent>

    </Card>
   

   
</template>
<script setup lang="ts">

import * as z from 'zod'
import {toast} from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '../ui/button';
import api from '@/lib/axios';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
import FormReuse from './FormReuse.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';



const router = useRouter()

const formSchema = toTypedSchema(z.object({

    file: z
      .any()
      .refine((file) => file instanceof File, 'File wajib diunggah')
      .refine(
        (file) => ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file?.type),
        'File harus Excel (.xls/.xlsx)'
      )
}))

const { handleSubmit,  isSubmitting} = useForm({
    validationSchema: formSchema
})

const onSubmit = handleSubmit( async (values) => {
    try {
        const formData = new FormData()
        formData.append('file', values.file)
        await api.post('/data_train/predict-excel', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        
        toast.success('Prediksi Berhasil')
        
        await nextTick() 

        await router.push('/result')

    } catch (error) {
        toast.error(`Gagal mengirim data`, {
            description: `Error: ${error}`
        })
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