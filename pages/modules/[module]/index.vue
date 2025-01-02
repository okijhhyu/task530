<template>
  <div>
    <h1 class='title'>Выберите игрока 
      <el-button plain @click="open">Бункер</el-button>
    </h1> 
    <client-only>
      <el-carousel :interval="8000" type="card" height="60vh">
        <el-carousel-item v-for="(item, index) in sectionStore.sectionList.data" :key="index">
          <h3 class="carousel-title">Игрок {{ item.player }}</h3>
          <div class="button-container">
            <el-button
              type="primary"
              @click="$router.push(`/modules/${modulesStore.currentModule.sectionName}/${item.player}`)"
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
// Импорт необходимых модулей
import { useSectionsStore } from '~/store/section';
import { useModulesStore } from '~/store/modules';

const sectionStore = useSectionsStore();
const modulesStore = useModulesStore();

const route = useRoute();

// Переменные
const renderComponent = ref(false);
const dialogVisible = ref(false);

await nextTick(async () => {
  try {
    await modulesStore.getModuleByName(route.params.module);
  } catch (e) {
    console.error(e);
  }
});

await nextTick(() => {
  try {
    sectionStore.getSections(route.params.module);
    console.log(sectionStore.sectionList.data)
  } catch (error) {
    console.error(error);
  }
});

onMounted(() => {
  forceRerender();
});

const sections = computed(() => {
  return Array.isArray(sectionStore?.sectionList?.data) ? sectionStore.sectionList.data : [];
});

function open() {
  ElMessageBox.alert(`Бедствие - ${modulesStore.currentModule.catastrophe} Оснащение - ${modulesStore.currentModule.bunker}`, 'Информация о бункере', {
    confirmButtonText: 'OK',
  });
}

function forceRerender() {
  renderComponent.value = false;
  nextTick(() => {
    renderComponent.value = true;
  });
}
</script>

<style>
.el-container {
  background: #07184F;
}

.title {
  text-align: center;
  color: #8092CE;
  font-size: 20px;
  padding: 10px;
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
  min-width: 230px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 8px;
  min-width: 230px;
}

.card {
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.card h3 {
  color: #475669;
  margin-bottom: 15px;
  font-size: 16px;
  text-align: center;
  word-wrap: break-word;
}

.card ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.card li strong {
  color: #2f3e70;
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
}

.el-button {
  font-size: 12px;
  padding: 6px 12px;
  margin-top: 5px;
  white-space: nowrap; /* Предотвращает разрыв текста в кнопках */
}

.el-carousel__item {
  padding: 10px;
}

.el-carousel__item:nth-child(2n),
.el-carousel__item:nth-child(2n + 1) {
  padding: 10px;
  border-radius: 8px;
}

.card .el-button + .el-button {
  margin-top: 5px;
}

/* Медиазапросы для мобильных устройств */
@media (max-width: 768px) {
  .title {
    font-size: 18px;
    padding: 5px;
  }

  .el-carousel__item {
    min-width: 100%; /* Для слайдов на мобильных */
  }

  .card {
    padding: 10px;
    max-width: 90%;
  }

  .card h3 {
    font-size: 14px;
    word-wrap: break-word;
  }

  .card li {
    font-size: 12px;
  }

  .el-button {
    font-size: 12px; /* Уменьшаем размер кнопок для мобильных */
    padding: 6px 12px;
  }

  .el-carousel__item h3 {
    font-size: 18px;
  }

  .el-carousel {
    height: 60vh; /* Уменьшаем высоту карусели */
  }
}
</style>