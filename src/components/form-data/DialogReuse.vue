<template >
    <div>
        <Dialog>
            <DialogTrigger as-child>
            <slot name="trigger" />
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription>
                {{ description }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <slot name="content" />
            </div>
            <!-- <DialogFooter>
                <slot name="footer" >
                    <Button type="submit">
                    Save changes
                    </Button>
                </slot>
            </DialogFooter> -->
            </DialogContent>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
// import { Button } from '../ui/button';
// import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';


const props = defineProps({
  title: {
    type: String,
    default: 'Dialog Title'
  },
  description: {
    type: String,
    default: 'Dialog Description'
  }
})

const { title, description } = props

// function handleSubmit(e: Event) {
//   e.preventDefault();
//   console.log('submit triggered!');
// }

</script>
<style lang="">
    
</style>