<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex-items">
          <h1>Игры</h1>
          <el-button
            type="success"
            plain
            @click="openAddDialog()"
          >
            Создать игру
          </el-button>
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
        <el-table-column
          min-width="300px"
          sortable
          label="Название игры"
          prop="sectionName"
        />
        <el-table-column
          min-width="300px"
          sortable
          label="Количество игроков"
          prop="players"
        />
        <el-table-column
          width="150px"
          align="center"
          label="Action"
          fixed="right"
        >
          <template v-slot="slot">
            <div style="display: flex; flex-direction: row;">
              <el-tooltip content="View">
                <el-button
                  type="primary"
                  :icon="ElIconView"
                  size="small"
                  text
                  @click="openViewDialog(slot.row._id)"
                />
              </el-tooltip>
              <el-tooltip content="Перейти в игру">
                <el-button
                  type="primary"
                  :icon="ElIconLocation"
                  size="small"
                  text
                  @click="$router.push(`/modules/${slot.row.sectionName}`)"
                />
              </el-tooltip>
              <el-tooltip content="Удалить">
                <el-button
                  type="danger"
                  :icon="ElIconDelete"
                  size="small"
                  text
                  @click="deleteModule(slot.row._id)"
                />
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
            <el-button
              v-if="!modulesStore.currentModule?._id"
              :type="dialogHeader.type"
              @click="submit()"
            >
              {{ dialogHeader.buttonText }}
            </el-button>
          </div>
        </template>
        <el-form>
          <el-form-item label="Название игры">
            <el-input
              :readonly="!!modulesStore.currentModule?._id"
              style="width: 240px;"
              :model-value="modulesStore.currentModule.sectionName"
              @input="updateCurrentValue('sectionName', $event)"
            />
          </el-form-item>

          <div class="form-items">
            <el-form-item
              label="Количество игроков"
            >
              <el-input-number
                :min="1"
                :model-value="modulesStore.currentModule.players"
                style="width: 100%;"
                :disabled='!!modulesStore.currentModule?._id'
                @input="updateCurrentValue('players', $event)"
              />
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </client-only>
  </div>
</template>
<script setup>
import characterData from '@/assets/data/character.json'
import factData from '@/assets/data/fact.json'
import fobiaData from '@/assets/data/fobii.json'
import healthData from '@/assets/data/health.json'
import hobbyData from '@/assets/data/hobby.json'
import professionData from '@/assets/data/profesion.json'
import storageData from '@/assets/data/storage.json'

import {useSectionsStore} from '~/store/section';
import {useModulesStore} from '~/store/modules';

// Initialize stores and route
const sectionStore = useSectionsStore();
const modulesStore = useModulesStore();
modulesStore.resetCurrentModule();

const dialogVisible = ref(false);
const fieldLabel = ref('');
const characters = ref([]);

const randomFromArray = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1)[0];
};

const generateCharacters = async (sectionName, numCharacters) => {
  let availableCharacters = [...characterData];
  let availableFacts = [...factData];
  let availableFobias = [...fobiaData];
  let availableHealths = [...healthData];
  let availableHobbies = [...hobbyData];
  let availableProfessions = [...professionData];
  let availableStorages = [...storageData];
  let actions =
   [
  { "text": "Обменяться здоровье c выбранным человеком", "action": "Обмен", "character": "health" },
  { "text": "Обменяться характером c выбранным человеком", "action": "Обмен", "character": "character" },
  { "text": "Обменяться хобби c выбранным человеком", "action": "Обмен", "character": "hobby" },
  { "text": "Обменяться фобией c выбранным человеком ", "action": "Обмен", "character": "phobia" },
  { "text": "Обменяться фактом c выбранным человеком", "action": "Обмен", "character": "fact" },
  { "text": "Обменяться багажом с выбранным человеком", "action": "Обмен", "character": "baggage" },
  { "text": "Обменяться проффессией с выбранным человеком", "action": "Обмен", "character": "profession" },
  { "text": "Обменять био характеристику с выбранным человеком", "action": "Обмен", "character": "bio" },
  { "text": "Обменять характеристику на выбор с выбранным человеком", "action": "Обмен", "character": "certain" },
  
  { "text": "Заменить свое здоровье на случайное", "action": "Заменить свою", "character": "health" },
  { "text": "Заменить свой характер на случайный", "action": "Заменить свою", "character": "character" },
  { "text": "Заменить свое хобби на случайное", "action": "Заменить свою", "character": "hobby" },
  { "text": "Заменить свою фобию на случайную", "action": "Заменить свою", "character": "phobia" },
  { "text": "Заменить свой факт на случайный", "action": "Заменить свою", "character": "fact" },
  { "text": "Заменить свой багаж на случайный", "action": "Заменить свою", "character": "baggage" },
  { "text": "Заменить свою проффессию на случайную", "action": "Заменить свою", "character": "profession" },
  { "text": "Заменить свою био характеристику на случайную", "action": "Заменить свою", "character": "bio" },
  { "text": "Заменить свою выбранную характеристику на случайную", "action": "Заменить свою", "character": "certain" },
  
  { "text": "Заменить чужое здоровье на случайное", "action": "Заменить чужое", "character": "health" },
  { "text": "Заменить чужой характер на случайный", "action": "Заменить чужое", "character": "character" },
  { "text": "Заменить чужое хобби на случайное", "action": "Заменить чужое", "character": "hobby" },
  { "text": "Заменить чужую фобию на случайную", "action": "Заменить чужое", "character": "phobia" },
  { "text": "Заменить чужой факт на случайный", "action": "Заменить чужое", "character": "fact" },
  { "text": "Заменить чужой багаж на случайный", "action": "Заменить чужое", "character": "baggage" },
  { "text": "Заменить чужую проффессию на случайную", "action": "Заменить чужое", "character": "profession" },
  { "text": "Заменить чужую био характеристику на случайную", "action": "Заменить чужое", "character": "bio" },
  { "text": "Заменить чужую выбранную характеристику на случайную", "action": "Заменить чужое", "character": "certain" },
  
  { "text": "Все игроки обмениваются открытым здоровьем", "action": "Обменяться", "character": "health" },
  { "text": "Все игроки обмениваются открытыми характерами", "action": "Обменяться", "character": "character" },
  { "text": "Все игроки обмениваются открытым хобби", "action": "Обменяться", "character": "hobby" },
  { "text": "Все игроки обмениваются открытыми фобиями", "action": "Обменяться", "character": "phobia" },
  { "text": "Все игроки обмениваются открытыми фактами", "action": "Обменяться", "character": "fact" },
  { "text": "Все игроки обмениваются открытыми багажами", "action": "Обменяться", "character": "baggage" },
  { "text": "Все игроки обмениваются открытыми проффессиями", "action": "Обменяться", "character": "profession" },
  { "text": "Все игроки обмениваются открытыми био характеристиками", "action": "Обменяться", "character": "bio" },
  
  { "text": "Скопировать чужое здоровье", "action": "Скопировать", "character": "health" },
  { "text": "Скопировать чужой характер", "action": "Скопировать", "character": "character" },
  { "text": "Скопировать чужое хобби", "action": "Скопировать", "character": "hobby" },
  { "text": "Скопировать чужую фобию", "action": "Скопировать", "character": "phobia" },
  { "text": "Скопировать чужой факт", "action": "Скопировать", "character": "fact" },
  { "text": "Скопировать чужой багаж", "action": "Скопировать", "character": "baggage" },
  { "text": "Скопировать чужую проффессию", "action": "Скопировать", "character": "profession" },
  { "text": "Скопировать чужую био характеристику", "action": "Скопировать", "character": "bio" },
  { "text": "Скопировать чужую выбранную характеристику на случайную", "action": "Скопировать", "character": "certain" },

  { "text": "Откройте здоровье выбранного игрока", "action": "Открыть", "character": "health" },
  { "text": "Откройте характер выбранного игрока", "action": "Открыть", "character": "character" },
  { "text": "Откройте хобби выбранного игрока", "action": "Открыть", "character": "hobby" },
  { "text": "Откройте фобию выбранного игрока", "action": "Открыть", "character": "phobia" },
  { "text": "Откройте факт выбранного игрока", "action": "Открыть", "character": "fact" },
  { "text": "Откройте багаж выбранного игрока", "action": "Открыть", "character": "baggage" },
  { "text": "Откройте проффессию выбранного игрока", "action": "Открыть", "character": "profession" },
  { "text": "Откройте био характеристику выбранного игрока", "action": "Открыть", "character": "bio" },
  { "text": "Откройте выбранную характеристику выбранного игрока", "action": "Открыть", "character": "certain" },
]
  let genders = ["Мужчина", "Женщина"];
  const half = Math.ceil(numCharacters / 2);
  const allGenders = Array.from({ length: half }, () => [...genders]).flat();

  const results = [];
  
  for (let index = 0; index < numCharacters; index++) {
    const age = Math.floor(Math.random() * 75) + 16;
    const health = randomFromArray(availableHealths).name;
    const severity = health !== "Отличное" ? Math.floor(Math.random() * 90) + 10 : null;
    const randomAction1 = randomFromArray(actions);
    const randomAction2 = randomFromArray(actions);
    const character = {
      player: index + 1,
      xod: (index + 1) === 1,
      profession: { name: randomFromArray(availableProfessions).name, visible: false },
      bio: {
        name: `Возраст: ${age}, пол: ${randomFromArray(allGenders)}, плодовитость: ${
          age >= 16 && age <= 50
            ? Math.random() >= 0.1
              ? "Плодовитый"
              : "Не плодовитый"
            : Math.random() <= 0.15
            ? "Плодовитый"
            : "Не плодовитый"
        }`,
        visible: false,
      },
      health: { name: `${health} ${severity ? ` Тяжесть ${severity}%` : ""}`, visible: false },
      character: { name: randomFromArray(availableCharacters).name, visible: false },
      hobby: { name: randomFromArray(availableHobbies).name, visible: false },
      phobia: { name: randomFromArray(availableFobias).name, visible: false },
      fact: { name: randomFromArray(availableFacts).name, visible: false },
      baggage: { name: randomFromArray(availableStorages).name, visible: false },
      action1: { ...randomAction1, visible: false },
      action2: { ...randomAction2, visible: false }
    };

    // Создаем секцию
    await sectionStore.createSection(sectionName, {
      ...sectionStore.currentSection,
      _id: undefined,
      ...character,
    });
  }
};
// Fetch modules data when the component is mounted
await nextTick(() =>{
  try {
    modulesStore.getModules();
  } catch (error) {
    console.error(error);
  }
});

// Compute modules data
const modules = computed(() => {
  return Array.isArray(modulesStore?.modulesList?.data) ?
    modulesStore.modulesList.data : [];
});

// Compute dialog header based on whether it's an view or create operation
const dialogHeader = computed(() => {
  return modulesStore.currentModule?._id ?
      {title: `${modulesStore.currentModule?.sectionName} игра`,
        buttonText: '', type: 'primary'} :
       {title: 'Создание игры', buttonText: 'Создать игру', type: 'success'};
});

// Open the add module dialog
function openAddDialog() {
  dialogVisible.value = true;
}

// Open the view module dialog with existing data
function openViewDialog(id) {
  const item = modules.value.find((item) => item._id === id);
  if (item._id) {
    modulesStore.setModule(item);
    dialogVisible.value = true;
  }
}

// Close the dialog and reset module data and field label
function closeModal() {
  modulesStore.resetCurrentModule();
  dialogVisible.value = false;
  fieldLabel.value = '';
}

// Update the current module's value
function updateCurrentValue(key, value) {
  modulesStore.setModule({...modulesStore.currentModule, [key]: value});
}


// Handle module submission create
async function submit() {
  try {
    if (modulesStore.currentModule.sectionName) {
      let data = await modulesStore.createModule({...modulesStore.currentModule,
        id: undefined});

      await generateCharacters(data.data.value.sectionName, data.data.value.players)
      
      await nextTick(async ()=>{
        await modulesStore.getModules();
      });
      closeModal();
    }
  } catch (e) {
    console.log(e);
  }
}

// Delete a module by ID
async function deleteModule(id) {
  await modulesStore.deleteModule(id);
  await nextTick(async ()=>{
    await modulesStore.getModules();
  });
}
</script>
