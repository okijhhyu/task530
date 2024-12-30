// Import necessary modules
import {defineStore} from 'pinia';

// Create a Pinia store named 'sections'
export const useSectionsStore = defineStore('sections', {
  // Define the initial state of the store
  state: () => ({
    sectionListState: {data: []},
    // Initialize sectionListState with an empty array
    section: {}, // Initialize section with an empty object
  }),

  // Define getters to retrieve data from the state
  getters: {
    // Getter to retrieve the list of sections
    sectionList(state) {
      return state.sectionListState;
    },
    // Getter to retrieve the current section
    currentSection(state) {
      return state.section;
    },
  },

  // Define actions to modify the state
  actions: {
    // Action to set the list of sections in the state
    setSections(payload: { data: [] }) {
      this.sectionListState = payload;
    },
    
    updateSections(newData: any[]) {
      newData.forEach((newItem) => {
        const existingIndex = this.sectionListState.data.findIndex(
          (item: any) => item.id === newItem.id
        );
    
        if (existingIndex !== -1) {
          // Проверяем, есть ли отличия между старым и новым элементом
          const existingItem = this.sectionListState.data[existingIndex];
          if (JSON.stringify(existingItem) !== JSON.stringify(newItem)) {
            // Обновляем элемент только если он изменился
            this.sectionListState.data[existingIndex] = { ...existingItem, ...newItem };
          }
        } else {
          // Если элемент отсутствует в текущем массиве, добавляем его
          this.sectionListState.data.push(newItem);
        }
      });
    
      // Удаляем элементы, которых нет в новом массиве
      this.sectionListState.data = this.sectionListState.data.filter((item:any) =>
        newData.some((newItem) => newItem.id === item.id)
      );
    },

    // Action to set the current section in the state
    setSection(payload: any) {
      this.section = payload;
    },

    // Action to reset the current section to an empty object
    resetCurrentSection() {
      this.section = {};
    },

    // Action to fetch a list of sections by sectionName from the API
    async getSections(sectionName: string) {
      try {
        const {data} = await useFetch(`/api/vm/${sectionName}`, {
          method: 'get',
        });
        this.setSections(data?.value || {data: [] as any});
        return data;
      } catch (e) {}
    },

    async refreshSections(sectionName: string) {
      try {
        const {data} = await useFetch(`/api/vm/${sectionName}`, {
          method: 'get',
        });
        this.updateSections(data?.value || {data: [] as any});
        return data;
      } catch (e) {}
    },

    // Action to create a new section for a specific sectionName using the API
    createSection(sectionName: string, body: any) {
      try {
        const data = useFetch(`/api/vm/${sectionName}`, {
          method: 'post',
          body,
        });
        return data;
      } catch (e) {}
    },

    // Action to edit/update a section by sectionName and ID using the API
    editSection(sectionName: string, id: string, body: any) {
      try {
        const data = useFetch(`/api/vm/${sectionName}/${id}`, {
          method: 'put',
          body,
        });
        return data;
      } catch (e) {}
    },

    // Action to delete a section by sectionName and ID using the API
    deleteSection(sectionName: string, id: string) {
      try {
        const data = useFetch(`/api/vm/${sectionName}/${id}`, {
          method: 'delete',
        });
        return data;
      } catch (e) {}
    },
  },
});
