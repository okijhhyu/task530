import { defineStore } from 'pinia'
export interface Module {
  id?: string
  sectionName: string
  fields: { type: 'String' | 'Number' | 'Boolean' | 'JSON-html', label: string }[]
}
export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: { data: [] as Module[] },
    module: {
      sectionsName: '',
      fields: []
    } as unknown as Module
  }),

  getters: {
    modulesList(state) {
      return state.modules
    },
    currentModule(state) {
      return state.module
    },
  },

  actions: {
    setModules(payload: { data: Module[] }) {
      this.modules = payload
    },

    setModule(payload: Module) {
      this.module = payload
    },

    resetCurrentModule() {
      this.module = {
        sectionsName: '',
        fields: []
      } as unknown as Module
    },
    
    getModules() {
      try {
      const { data } = useFetch('/api/modules',
      {
        method: "get",
      })
      this.setModules(data)
      return data
      } catch(e) {}
    },

    createModule(body: Module) {
      try {
      const data = useFetch('/api/modules',
      {
        method: "post",
        body
      })
      return data
      } catch(e) {}
    },

    deleteModule(id: string) {
      try {
      console.log(123)
      const data = useFetch(`/api/modules/${id}`,
      {
        method: "delete"
      })
      return data
      } catch(e) {}
    }
  },
})