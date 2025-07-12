// stores/result.ts
import { defineStore } from 'pinia'

export const useResultStore = defineStore('result', {
  state: () => ({
    data: null as any,
  }),
  actions: {
    setResult(payload: any) {
      this.data = payload
    },
    clear() {
      this.data = null
    }
  }
})
