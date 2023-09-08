// Import necessary modules
import { defineStore } from 'pinia'

// Define the interface for a module
export interface Module {
  id?: string
  sectionName: string
  fields: { type: 'String' | 'Number' | 'Boolean' | 'JSON-html', label: string }[]
}

// Create a Pinia store named 'modules'
export const useModulesStore = defineStore('modules', {
  // Define the initial state of the store
  state: () => ({
    modules: { data: [] as Module[] }, // Initialize modules as an empty array
    module: {
      sectionsName: '',
      fields: []
    } as unknown as Module, // Initialize module with default values
  }),

  // Define getters to retrieve data from the state
  getters: {
    // Getter to retrieve the list of modules
    modulesList(state) {
      return state.modules
    },
    // Getter to retrieve the current module
    currentModule(state) {
      return state.module
    },
  },

  // Define actions to modify the state
  actions: {
    // Action to set the list of modules in the state
    setModules(payload: { data: Module[] }) {
      this.modules = payload
    },

    // Action to set the current module in the state
    setModule(payload: Module) {
      this.module = payload
    },

    // Action to reset the current module to default values
    resetCurrentModule() {
      this.module = {
        sectionsName: '',
        fields: []
      } as unknown as Module
    },
    
    // Action to fetch a list of modules from the API
    async getModules() {
      try {
        const data = await useFetch('/api/modules', {
          method: 'get',
        })
        this.setModules(data as unknown as { data: Module[] })
        return data
      } catch (e) {}
    },
    
    // Action to fetch a module by name from the API
    async getModuleByName(sectionName: string) {
      try {
        const { data } = await useFetch('/api/modules', {
          method: 'get',
          query: { sectionName }
        })
        this.setModule(data?.value as unknown as Module)
        return data
      } catch (e) {}
    },

    // Action to create a new module using the API
    createModule(body: Module) {
      try {
        const data = useFetch('/api/modules', {
          method: 'post',
          body
        })
        return data
      } catch (e) {}
    },

    // Action to delete a module by ID using the API
    deleteModule(id: string) {
      try {
        const data = useFetch(`/api/modules/${id}`, {
          method: 'delete'
        })
        return data
      } catch (e) {}
    }
  },
})