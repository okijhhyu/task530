// Import necessary modules
import { defineStore } from 'pinia'

// Create a Pinia store named 'sections'
export const useSectionsStore = defineStore('sections', {
  // Define the initial state of the store
  state: () => ({
    sectionListState: { data: [] }, // Initialize sectionListState with an empty array
    section: {} // Initialize section with an empty object
  }),

  // Define getters to retrieve data from the state
  getters: {
    // Getter to retrieve the list of sections
    sectionList(state) {
      return state.sectionListState
    },
    // Getter to retrieve the current section
    currentSection(state) {
      return state.section
    },
  },

  // Define actions to modify the state
  actions: {
    // Action to set the list of sections in the state
    setSections(payload: { data: [] }) {
      this.sectionListState = payload
    },

    // Action to set the current section in the state
    setSection(payload: any) {
      this.section = payload
    },

    // Action to reset the current section to an empty object
    resetCurrentSection() {
      this.section = {}
    },
    
    // Action to fetch a list of sections by sectionName from the API
    async getSections(sectionName: string) {
      try {
        const { data } = await useFetch(`/api/vm/${sectionName}`, {
          method: 'get',
        })
        this.setSections(data?.value || { data: [] })
        return data
      } catch(e) {}
    },

    // Action to create a new section for a specific sectionName using the API
    createSection(sectionName: string, body: any) {
      try {
        const data = useFetch(`/api/vm/${sectionName}`, {
          method: 'post',
          body
        })
        return data
      } catch(e) {}
    },

    // Action to edit/update a section by sectionName and ID using the API
    editSection(sectionName: string, id: string, body: any) {
      try {
        const data = useFetch(`/api/vm/${sectionName}/${id}`, {
          method: 'put',
          body
        })
        return data
      } catch(e) {}
    },

    // Action to delete a section by sectionName and ID using the API
    deleteSection(sectionName: string, id: string) {
      try {
        const data = useFetch(`/api/vm/${sectionName}/${id}`, {
          method: 'delete'
        })
        return data
      } catch(e) {}
    }
  },
})