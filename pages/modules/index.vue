<template>
  <div>
    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between;align-items: center">
          <h1>Modules</h1>
          <el-button type="success" plain @click="openAddDialog()">Add module</el-button>
        </div>
      </template>
      <el-table :data="modules.data" border style="width: 100%;">
        <el-table-column label="Section name" prop="sectionName" />
        <el-table-column width="100px" label="Action" />
      </el-table>
    </el-card>
    <client-only>
      <el-dialog :model-value="dialogVisible">
        <template #header>
          <div style="display: flex; justify-content: space-between;align-items: center">
            <h1>{{  dialogHeader.title  }}</h1>
            <el-button :type="dialogHeader.type" plain @click="openAddDialog()">{{ dialogHeader.buttonText }}</el-button>
          </div>
        </template>
        <el-form>
          <el-form-item label="Section name">
            <el-input :model-value="module.sectionName" />
          </el-form-item>
        </el-form>
      </el-dialog>
    </client-only>
  </div>
</template>
<script setup>
  import { useModulesStore } from '~/store/modules'
  import { useRoute } from 'vue-router'

  const modulesStore = useModulesStore()
  let dialogVisible = ref(false)
  try {
    await modulesStore.getModules(); // Здесь используйте ваш URL
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
  const modules = computed(() => {
    // Access the breadcrumbs from the Pinia store using getters
    return modulesStore.modulesList
  })

  const module = computed(() => {
    return modulesStore.currentModule
  })

  const dialogHeader = computed(() => {
    return modulesStore.currentModule?.id ? { title : 'Updateing module', buttonText: 'Save changes', type: 'primary' } 
      : { title : 'Creating module', buttonText: 'Create module', type: 'success' }
  })

  function openAddDialog() {
    modulesStore.resetCurrentModule()
    dialogVisible.value = true
  }
</script>
