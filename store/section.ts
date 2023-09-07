import { defineStore } from 'pinia'

export const useSectionsStore = defineStore('sections', {
  state: () => ({
    sectionListState: { data: [] },
    section: {}
  }),

  getters: {
    sectionList(state) {
      return state.sectionListState
    },
    currentSection(state) {
      return state.section
    },
  },

  actions: {
    setSections(payload: { data: [] }) {
      this.sectionListState = payload
    },

    setSection(payload: any) {
      this.section = payload
    },

    resetCurrentSection() {
      this.section = {}
    },
    
    async getSections(sectionName: string) {
      try {
        const { data } = await useFetch(`/api/vm/${sectionName}`,
        {
          method: "get",
        })
        this.setSections(data?.value || { data: [] as any })
        return data
      } catch(e) {}
    },

    createSection(sectionName: string, body:any) {
      try {
        const data = useFetch(`/api/vm/${sectionName}`,
        {
          method: "post",
          body
        })
        return data
      } catch(e) {}
    },

    editSection(sectionName: string, id: string, body:any) {
      try {
        const data = useFetch(`/api/vm/${sectionName}/${id}`,
        {
          method: "put",
          body
        })
        return data
      } catch(e) {}
    },

    deleteSection(sectionName: string,id: string) {
      try {
        const data = useFetch(`/api/vm/${sectionName}/${id}`,
        {
          method: "delete"
        })
        return data
      } catch(e) {}
    }
  },
})