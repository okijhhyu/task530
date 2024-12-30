<template>
  <div>
    <h1 class='title'><el-button plain @click="open">Бункер</el-button><el-button plain @click="refreshData">Обновить данные</el-button></h1>
    <client-only>
      <el-carousel ref="carusel" type="card" height="80vh" :autoplay="false" @change="changeRoute">
        <el-carousel-item v-for="item in sectionStore.sectionList.data" :key="item">
          <div class="card">
            <h3>Игрок: {{ item.player }} <strong><span v-if="item.player === lastSegment || item.profession.visible ">{{ item.profession.name }}</span>
                <el-button
                  v-if="item.player === lastSegment && !item.profession.visible"
                  @click="changeVisible('profession', item)"
                >
                  Открыть
                </el-button></strong></h3>
            <ul>
              <li><strong>Био характеристика:</strong> <span v-if="item.player === lastSegment || item.bio.visible">{{ item.bio.name }}</span>
                <el-button
                  v-if="item.player === lastSegment && !item.bio.visible"
                  @click="changeVisible('bio', item)"
                >
                  Открыть
                </el-button>
              </li>
              <li><strong>Здорровье:</strong> <span v-if="item.player === lastSegment || item.health.visible">{{ item.health.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.health.visible"
                  @click="changeVisible('health', item)"
              >
                  Открыть
                </el-button></li>
              <li><strong>Характер:</strong> <span v-if="item.player === lastSegment || item.character.visible">{{ item.character.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.character.visible"
                @click="changeVisible('character', item)"
              >
                  Открыть
                </el-button></li>
              <li><strong>Хобби:</strong> <span v-if="item.player === lastSegment || item.hobby.visible">{{ item.hobby.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.hobby.visible"
                @click="changeVisible('hobby', item)"
              >
                  Открыть
                </el-button></li>
              <li><strong>Фобия:</strong> <span v-if="item.player === lastSegment || item.phobia.visible">{{ item.phobia.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.phobia.visible"
                @click="changeVisible('phobia', item)"
              >
                  Открыть
                </el-button></li>
              <li><strong>Факт:</strong> <span v-if="item.player === lastSegment || item.fact.visible">{{ item.fact.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.fact.visible"
                @click="changeVisible('fact', item)"
              >
                  Открыть
                </el-button></li>
              <li><strong>Багаж:</strong> <span v-if="item.player === lastSegment || item.baggage.visible">{{ item.baggage.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.baggage.visible"
                @click="changeVisible('baggage', item)"
              >
                  Открыть
                </el-button></li>
            </ul>
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
import { useRouter, useRoute } from 'vue-router';

import { ref } from 'vue';

const carusel = ref(null);

const router = useRouter()
const route = useRoute();

const lastSegment = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  return Number(segments[segments.length - 1]);
});

// Initialize stores and route
const sectionStore = useSectionsStore();
const modulesStore = useModulesStore();


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
  } catch (error) {
    console.error(error);
  }
});

// Force re-render the component when mounted
onMounted(() => {
  forceRerender();
});


// Compute dialog header based on whether it's an update or create operation
const dialogHeader = computed(() => {
  return sectionStore.currentSection?._id ?
   {title: `Updating ${route.params.module}`,
     buttonText: 'Save changes', type: 'primary'} :
      {title: `Creating ${route.params.module} `,
        buttonText: `Create ${route.params.module}`, type: 'success'};
});

async function changeRoute(e) {
  
  router.push({path: route.path, query: {...route.query, player: e+1}})
}

async function refreshData() {
  try {
    await sectionStore.getSections(route.params.module);
    carusel.value.setActiveItem(Number(route.query.player)-1)
  } catch (error) {
    console.error(error);
  }
}

// Update the current section's value
function updateCurrentValue(key, value) {
  sectionStore.setSection({...sectionStore.currentSection, [key]: value});
}

async function changeVisible(key, item) {
    sectionStore.setSection({...item, [key]: {...item[key], visible: true}});
    if (sectionStore.currentSection._id) {
      await sectionStore.editSection(route.params.module,
          sectionStore.currentSection._id,
          {...sectionStore.currentSection, _id: undefined});
    }
    refreshData()
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
  font-size: 20px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 8px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 8px;
}
.card {
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.card h3 {
  color: #475669;
  margin-bottom: 15px;
  text-align: center;
}

.card ul {
  list-style-type: none;
  padding: 0;
}

.card li {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
}

.card li strong {
  color: #2f3e70;
}
</style>