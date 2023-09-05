import { defineStore } from 'pinia'
export interface Module {
  id?: string
  sectionName: string
  fields: { type: 'String' | 'Number' | 'Boolean' | 'JSON-html', label: string }[]
}
export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [] as Module[],
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
    setModules(payload: Module[]) {
      this.modules = payload
    },

    resetCurrentModule() {
      this.module = {
        sectionsName: '',
        fields: []
      } as unknown as Module
    },
    
    getModules() {
      try {
      const { data } = useFetch('/api/modules')
      this.setModules(data)
      return data
      } catch(e) {}
    }
  },
})