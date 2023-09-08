// Import necessary modules
import { defineStore } from 'pinia'

// Define the interface for breadcrumb items
interface Breadcrumbs {
  link: string
  title: string
}

// Create a Pinia store named 'breadcrumbs'
export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  // Define the initial state of the store
  state: () => ({
    breadcrumbs: [] as Breadcrumbs[], // Initialize breadcrumbs as an empty array
  }),

  // Define getters to retrieve data from the state
  getters: {
    // Getter to retrieve the breadcrumbs
    getBreadcrumbs(state) {
      return state.breadcrumbs
    },
  },

  // Define actions to modify the state
  actions: {
    // Action to set the breadcrumbs in the state
    setBreadcrumbs(payload: Breadcrumbs[]) {
      this.breadcrumbs = payload
    },
  },
})