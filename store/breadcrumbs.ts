
import { defineStore } from 'pinia'
interface Breadcrumbs {
  link:string
  title: string
}
export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: () => ({
    breadcrumbs: [] as Breadcrumbs[],
  }),

  getters: {
    getBreadcrumbs(state) {
      return state.breadcrumbs
    },
  },

  actions: {
    setBreadcrumbs(payload: Breadcrumbs[]) {
      this.breadcrumbs = payload
    },
  },
})