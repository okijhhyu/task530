<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex-items">
          <h1>Modules</h1>
          <el-button type="success" plain @click="openAddDialog()">Add module</el-button>
        </div>
      </template>
      <el-table :data="modules" border style="width: 100%;">
        <el-table-column width="100px" sortable label="ID" prop="_id">
          <template v-slot="scope">
            <el-tooltip placement="left-start" :content="scope.row._id">
              <span style="white-space: nowrap; overflow: hidden;">
                {{ scope.row._id }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="300px" sortable label="Section name" prop="sectionName" />
        <el-table-column width="150px" align="center" label="Action" fixed="right">
          <template v-slot="slot">
            <div style="display: flex; flex-direction: row;">
              <el-tooltip content="View">
                <el-button type="primary" :icon="ElIconView" size="small" text @click="openViewDialog(slot.row._id)" />
              </el-tooltip>
              <el-tooltip content="Go to module">
                <el-button type="primary" :icon="ElIconLocation" size="small" text @click="$router.push(`/modules/${slot.row.sectionName}`)" />
              </el-tooltip>
              <el-tooltip content="Delete">
                <el-button type="danger" :icon="ElIconDelete" size="small" text @click="deleteModule(slot.row._id)" />
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
            <el-button v-if="!modulesStore.currentModule?._id" :type="dialogHeader.type" @click="submit()">{{ dialogHeader.buttonText }}</el-button>
          </div>
        </template>
        <el-form>
          <el-form-item label="Section name">
            <el-input :readonly='!!modulesStore.currentModule?._id' style="width: 240px;" :model-value="modulesStore.currentModule.sectionName" @input="updateCurrentValue('sectionName', $event)"/>
          </el-form-item>
          <div class="flex-items">
            <h3>Fields</h3>
            <el-input v-if="!modulesStore.currentModule?._id" v-model="fieldLabel" style="width: 240px; height:30px">
              <template #append>
                <el-button :icon="ElIconPlus" type="success" plain @click="addField" />
              </template>
            </el-input>
          </div>
          <div class="form-items">
            <el-form-item v-for="(field, index) in modulesStore.currentModule.fields" :key="field.label + index" :label="field.label">
              <el-select style="width: 100%;" :disabled='!!modulesStore.currentModule?._id' :model-value="field.type" @change="updateFieldType(field.label, $event)">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </client-only>
  </div>
</template>
<script setup>
  // Import necessary store modules
  import { useModulesStore } from '~/store/modules'
  
  // Initialize modulesStore and reset current module
  const modulesStore = useModulesStore()
  modulesStore.resetCurrentModule()

  let dialogVisible = ref(false)
  let fieldLabel = ref('');
  const options = ['String', 'Number', 'Boolean']

  // Fetch modules data when the component is mounted
  await nextTick(() =>{
    try {
      modulesStore.getModules();
    } catch (error) {
      console.error(error);
    }
  })
  
  // Compute modules data
  const modules = computed(() => { return Array.isArray(modulesStore?.modulesList?.data) ?
    modulesStore.modulesList.data : []; })

  // Compute dialog header based on whether it's an view or create operation
  const dialogHeader = computed(() => {
    return modulesStore.currentModule?._id ? 
      { title : `${modulesStore.currentModule?.sectionName} module`, buttonText: '', type: 'primary' } :
       { title : 'Creating module', buttonText: 'Create module', type: 'success' }
  })

  // Open the add module dialog
  function openAddDialog() {
    dialogVisible.value = true
  }

  // Open the view module dialog with existing data
  function openViewDialog(id) {
    const item = modules.value.find(item => item._id === id)
    if (item._id) {
      modulesStore.setModule(item)
      dialogVisible.value = true
    }
  }

  // Close the dialog and reset module data and field label
  function closeModal() {
    modulesStore.resetCurrentModule()
    dialogVisible.value = false
    fieldLabel.value = ''
  }

  // Update the current module's value
  function updateCurrentValue(key, value) {
    modulesStore.setModule({ ...modulesStore.currentModule, [key]: value })
  }

  // Add a new field to the module
  function addField() {
    if (fieldLabel.value &&
      modulesStore.currentModule.fields.findIndex(({label}) => label === fieldLabel.value) < 0) {
      updateCurrentValue('fields', [...modulesStore.currentModule.fields, { type: 'String', label: fieldLabel.value }])
      fieldLabel.value  = ''
    }
  }

  // Update the type of a field in the module
  function updateFieldType(label, type) {  
    updateCurrentValue('fields', modulesStore.currentModule.fields.map(field => { 
      if (field.label === label) {
        return { label, type }
      } else {
        return field
      }
    }))
  }

  // Handle module submission create
  async function submit() {
    try {
      await modulesStore.createModule({ ...modulesStore.currentModule, id: undefined })
      await nextTick(async ()=>{
        await modulesStore.getModules();
      })
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  // Delete a module by ID
  async function deleteModule(id) {
    await modulesStore.deleteModule(id)
    await nextTick(async ()=>{
      await modulesStore.getModules();
    })
  }
</script>
