<template>
  <div>
    <h1 class='title'>Выберите игрока <el-button plain @click="open">Бункер</el-button></h1> 
    <client-only>
      <el-carousel :interval="8000" type="card" height="400px">
        <el-carousel-item v-for="item in sectionStore.sectionList.data.length" :key="item">
          <h3 text="2xl" justify="center">Игрок {{ item }}</h3>
          <div style="height: 50%; width: 100%; display: flex; justify-content: center; align-items: center;">
            <el-button
              type="primary"
              @click="$router.push(`/modules/${modulesStore.currentModule.sectionName}/${item}`)"
            >
              Выбрать
            </el-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </client-only>
  </div>
</template>
<script setup>
// Import necessary store modules
import {useSectionsStore} from '~/store/section';
import {useModulesStore} from '~/store/modules';

// Initialize stores and route
const sectionStore = useSectionsStore();
const modulesStore = useModulesStore();

// Initialize route
const route = useRoute();

// Initialize variables
const renderComponent = ref(false);
const dialogVisible = ref(false);

// Fetch module data when the component is mounted
await nextTick(async () =>{
  try {
    await modulesStore.getModuleByName(route.params.module);
  } catch (e) {
    console.error(e);
  }
});

// Fetch sections data when the component is mounted
await nextTick(() =>{
  try {
    sectionStore.getSections(route.params.module);
    console.log(sectionStore.sectionList.data)
  } catch (error) {
    console.error(error);
  }
});

// Force re-render the component when mounted
onMounted(() => {
  forceRerender();
});

// Compute sections data
const sections = computed(() => {
  return Array.isArray(sectionStore?.sectionList?.data) ?
   sectionStore.sectionList.data : [];
});

// Compute dialog header based on whether it's an update or create operation
const dialogHeader = computed(() => {
  return sectionStore.currentSection?._id ?
   {title: `Updating ${route.params.module}`,
     buttonText: 'Save changes', type: 'primary'} :
      {title: `Creating ${route.params.module} `,
        buttonText: `Create ${route.params.module}`, type: 'success'};
});

// Open the add section dialog and initialize with default values
function openAddDialog() {
  const sectionTemplate = {player: 0};
  sectionStore.setSection(sectionTemplate);
  dialogVisible.value = true;
}

// Open the edit section dialog with existing data
function openEditDialog(id) {
  const item = sections.value.find((item) => item._id === id);
  if (item._id) {
    sectionStore.setSection(item);
    dialogVisible.value = true;
  }
}

// Close the dialog and reset section data
function closeModal() {
  const sectionTemplate = {};
  sectionStore.setSection(sectionTemplate);
  dialogVisible.value = false;
}

// Update the current section's value
function updateCurrentValue(key, value) {
  sectionStore.setSection({...sectionStore.currentSection, [key]: value});
}

// Handle form submission (create or update)
async function submit() {
  try {
    if (sectionStore.currentSection._id) {
      await sectionStore.editSection(route.params.module,
          sectionStore.currentSection._id,
          {...sectionStore.currentSection, _id: undefined});
    } else {
      await sectionStore.createSection(route.params.module,
          {...sectionStore.currentSection, _id: undefined});
    }
    await nextTick(async () => {
      sectionStore.getSections(route.params.module);
    });
    closeModal();
  } catch (e) {
    console.log(e);
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
  await sectionStore.deleteSection(route.params.module, id);
  await nextTick(async ()=>{
    await sectionStore.getSections(route.params.module);
  });
}

const open = () => {
  ElMessageBox.alert(`Бедствие - ${modulesStore.currentModule.catastrophe} Оснащение - ${modulesStore.currentModule.bunker}`, 'Информация о бункере', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
  })
}

</script>
<style>
.el-container {
  background: #07184F;
}
</style>
<style scoped>
.title {
  text-align: center;
  color: #8092CE;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  font-size: 50px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>