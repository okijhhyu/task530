<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex-items">
          <h1>{{ $route.params.module }}</h1>
          <el-button type="success" plain @click="openAddDialog()">Add {{ $route.params.module }}</el-button>
        </div>
      </template>
      <el-table v-if="renderComponent" :data="sections" border style="width: 100%;">
        <el-table-column width="100px" sortable label="ID" prop="_id">
          <template v-slot="scope">
            <el-tooltip placement="left-start" :content="scope.row._id">
              <span style="white-space: nowrap; overflow: hidden;">
                {{ scope.row._id }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-for="(field, index) in modulesStore.currentModule.fields" sortable :key="'table' + field.label + index" min-width="300px" :label="field.label">
          <template v-slot="scope">
            <el-tooltip placement="left-start" :content="`${scope.row[field.label]}`">
              <span style="white-space: nowrap; overflow: hidden;">
                {{ scope.row[field.label] }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="Action" fixed="right">
          <template v-slot="slot">
            <div style="display: flex; flex-direction: row;">
              <el-tooltip content="View">
                <el-button type="primary" :icon="ElIconEditPen" size="small" text @click="openEditDialog(slot.row._id)" />
              </el-tooltip>
              <el-tooltip content="Delete">
                <el-button type="danger" :icon="ElIconDelete" size="small" text @click="deleteSection(slot.row._id)" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <client-only>
      <el-dialog v-model="dialogVisible" @closed="closeModal">
        <template #header>
          <div class="flex-items">
            <h1>{{  dialogHeader.title  }}</h1>
            <el-button :type="dialogHeader.type" @click="submit()">{{ dialogHeader.buttonText }}</el-button>
          </div>
        </template>
        <el-form>
          <div class="form-items">
            <el-form-item v-for="(field, index) in modulesStore.currentModule.fields" :key="'form' + field.label + index" :label="field.label">
              <el-input v-if="field.type !== 'Boolean'" :type="field.type === 'Number' ? 'number' : 'string'" :model-value="sectionStore.currentSection[field.label]" @input="updateCurrentValue(field.label, field.type === 'Number' ? +$event : $event)" />
              <el-switch v-else :model-value="sectionStore.currentSection[field.label]" @change="updateCurrentValue(field.label, $event)" />
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </client-only>
  </div>
</template>
<script setup>
  // Import necessary store modules
  import { useSectionsStore } from '~/store/section'
  import { useModulesStore } from '~/store/modules'

  // Initialize stores and route
  const sectionStore = useSectionsStore()
  const modulesStore = useModulesStore()

  // Initialize route
  const route = useRoute()
  
  // Initialize variables
  let renderComponent = ref(false)
  let dialogVisible = ref(false)
  const options = ['String', 'Number', 'Boolean']
  
  // Fetch module data when the component is mounted
  await nextTick(async () =>{
  try {
    await modulesStore.getModuleByName(route.params.module);
  } catch (e) {
    console.error(e);
  }
  })

  // Fetch sections data when the component is mounted
  await nextTick(() =>{
    try {
      sectionStore.getSections(route.params.module);
    } catch (error) {
      console.error(error);
    }
  })
  
  // Force re-render the component when mounted
  onMounted(() => {
    forceRerender()
  })

  // Compute sections data
  const sections = computed(() => { return Array.isArray(sectionStore?.sectionList?.data) ? sectionStore.sectionList.data : []; })

  // Compute dialog header based on whether it's an update or create operation
  const dialogHeader = computed(() => {
    return sectionStore.currentSection?._id ? { title : `Updating ${route.params.module}`, buttonText: 'Save changes', type: 'primary' } 
      : { title : `Creating ${route.params.module} `, buttonText: `Create ${route.params.module}`, type: 'success' }
  })
  
  // Open the add section dialog and initialize with default values
  function openAddDialog() {
    const sectionTemplate = {}
    modulesStore.currentModule.fields.map(field => {
      sectionTemplate[field.label] = field.type === 'String' ? '' : field.type === 'Number' ? 0 : false
    })
    sectionStore.setSection(sectionTemplate)
    dialogVisible.value = true
  }

  // Open the edit section dialog with existing data
  function openEditDialog(id) {
    const item = sections.value.find(item => item._id === id)
    if (item._id) {
      sectionStore.setSection(item)
      dialogVisible.value = true
    }
  }
  
  // Close the dialog and reset section data
  function closeModal() {
    const sectionTemplate = {}
    modulesStore.currentModule.fields.map(field => {
      sectionTemplate[field.label] = field.type === 'String' ? '' : field.type === 'Number' ? 0 : false
    })
    sectionStore.setSection(sectionTemplate)
    dialogVisible.value = false
  }
  
  // Update the current section's value
  function updateCurrentValue(key, value) {
    sectionStore.setSection({ ...sectionStore.currentSection, [key]: value })
  }
  
  // Handle form submission (create or update)
  async function submit() {
    try {
      if (sectionStore.currentSection._id) {
        await sectionStore.editSection(route.params.module, sectionStore.currentSection._id, { ...sectionStore.currentSection, _id: undefined })
      } else {
        await sectionStore.createSection(route.params.module, { ...sectionStore.currentSection, _id: undefined })
      }
      await nextTick(async () => {
        sectionStore.getSections(route.params.module);
      })
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  // Force re-render the component
  function forceRerender() {
    renderComponent.value = false;

    nextTick(() => {
      renderComponent.value = true;
    });
  }
  
  // Delete a section by ID
  async function deleteSection(id) {
    await sectionStore.deleteSection(route.params.module, id)
    await nextTick(async ()=>{
      await sectionStore.getSections(route.params.module)
    })
  }
</script>
