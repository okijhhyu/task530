<template>
  <div>
    <h1 class='title'><el-button plain @click="open">Бункер</el-button><el-button plain @click="refreshData">Обновить данные</el-button><el-button :disabled="!available" @click="open2">Угроза</el-button></h1>
    <client-only>
      <el-carousel ref="carusel" height="80vh" :autoplay="false" @change="changeRoute">
        <el-carousel-item v-for="item in sections" :key="item">
          <div class="card">
            <el-button style="position: absolute;right: 30px;top: 5px;" v-if="!item.kicked" :disabled="currentPlayer.kicked" @click="kick(item)">
              x
            </el-button>
            <div v-else style="position: absolute;right: 30px;top: 5px; color:red">
              Исключен
            </div>
            <h3>Игрок: {{ item.player }} <strong><span v-if="item.player === lastSegment || item.profession.visible ">{{ item.profession.name }}</span>
                <el-button
                  v-if="item.player === lastSegment && !item.profession.visible"
                  @click="changeVisible('profession', item)"
                >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.profession.visible && 
                    currentPlayer.profession.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'profession' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('profession', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.profession.visible && 
                    currentPlayer.profession.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'profession' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('profession', item, 'action2')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.profession.visible && 
                    currentPlayer.profession.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'profession' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('profession', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.profession.visible && 
                    currentPlayer.profession.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'profession' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('profession', item, 'action2')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.profession.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'profession' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('profession', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.profession.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'profession' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('profession', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.profession.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'profession' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('profession', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.profession.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'profession' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('profession', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.profession.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'profession' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('profession', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.profession.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'profession' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('profession', item, 'action2')"
                >
                 Заменить
                </el-button>
                </strong></h3>
            <ul>
              <li><strong>Био характеристика:</strong> <span v-if="item.player === lastSegment || item.bio.visible">{{ item.bio.name }}</span>
                <el-button
                  v-if="item.player === lastSegment && !item.bio.visible"
                  @click="changeVisible('bio', item)"
                >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.bio.visible && 
                    currentPlayer.bio.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'bio' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('bio', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.bio.visible && 
                    currentPlayer.bio.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'bio' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('bio', item, 'action2')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.bio.visible && 
                    currentPlayer.bio.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'bio' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('bio', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.bio.visible && 
                    currentPlayer.bio.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'bio' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('bio', item, 'action2')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.bio.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'bio' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('bio', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.bio.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'bio' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('bio', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.bio.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'bio' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('bio', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.bio.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'bio' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('bio', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.bio.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'bio' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('bio', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.bio.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'bio' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('bio', item, 'action2')"
                >
                 Заменить
                </el-button>
              </li>
              <li><strong>Здоровье:</strong> <span v-if="item.player === lastSegment || item.health.visible">{{ item.health.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.health.visible"
                  @click="changeVisible('health', item)"
              >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.health.visible && 
                    currentPlayer.health.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'health' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('health', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.health.visible && 
                    currentPlayer.health.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'health' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('health', item, 'action2')"
                >
                 Скопировать
                </el-button><el-button
                  v-if="item.player !== lastSegment && 
                    item.health.visible && 
                    currentPlayer.health.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'health' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('health', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.health.visible && 
                    currentPlayer.health.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'health' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('health', item, 'action2')"
                >
                 Обменять
                </el-button><el-button
                  v-if="item.player !== lastSegment && 
                    !item.health.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'health' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('health', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.health.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'health' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('health', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.health.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'health' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('health', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.health.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'health' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('health', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.health.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'health' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('health', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.health.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'health' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('health', item, 'action2')"
                >
                 Заменить
                </el-button>
              </li>
              <li><strong>Характер:</strong> <span v-if="item.player === lastSegment || item.character.visible">{{ item.character.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.character.visible"
                @click="changeVisible('character', item)"
              >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.character.visible && 
                    currentPlayer.character.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'character' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('character', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.character.visible && 
                    currentPlayer.character.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'character' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('character', item, 'action2')"
                >
                 Скопировать
                </el-button><el-button
                  v-if="item.player !== lastSegment && 
                    item.character.visible && 
                    currentPlayer.character.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'character' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('character', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.character.visible && 
                    currentPlayer.character.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'character' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('character', item, 'action2')"
                >
                 Обменять
                </el-button><el-button
                  v-if="item.player !== lastSegment && 
                    !item.character.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'character' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('character', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.character.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'character' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('character', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.character.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'character' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('character', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.character.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'character' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('character', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.character.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'character' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('character', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.character.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'character' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('character', item, 'action2')"
                >
                 Заменить
                </el-button></li>
              <li><strong>Хобби:</strong> <span v-if="item.player === lastSegment || item.hobby.visible">{{ item.hobby.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.hobby.visible"
                @click="changeVisible('hobby', item)"
              >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.hobby.visible && 
                    currentPlayer.hobby.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'hobby' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('hobby', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.hobby.visible && 
                    currentPlayer.hobby.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'hobby' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('hobby', item, 'action2')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.hobby.visible && 
                    currentPlayer.hobby.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'hobby' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('hobby', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.hobby.visible && 
                    currentPlayer.hobby.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'hobby' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('hobby', item, 'action2')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.hobby.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'hobby' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('hobby', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.hobby.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'hobby' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('hobby', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.hobby.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'hobby' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('hobby', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.hobby.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'hobby' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('hobby', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.hobby.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'hobby' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('hobby', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.hobby.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'hobby' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('hobby', item, 'action2')"
                >
                 Заменить
                </el-button></li>
              <li><strong>Фобия:</strong> <span v-if="item.player === lastSegment || item.phobia.visible">{{ item.phobia.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.phobia.visible"
                @click="changeVisible('phobia', item)"
              >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.phobia.visible && 
                    currentPlayer.phobia.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'phobia' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('phobia', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.phobia.visible && 
                    currentPlayer.phobia.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'phobia' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('phobia', item, 'action2')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.phobia.visible && 
                    currentPlayer.phobia.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'phobia' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('phobia', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.phobia.visible && 
                    currentPlayer.phobia.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'phobia' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('phobia', item, 'action2')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.phobia.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'phobia' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('phobia', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.phobia.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'phobia' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('phobia', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.phobia.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'phobia' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('phobia', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.phobia.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'phobia' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('phobia', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.phobia.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'phobia' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('phobia', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.phobia.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'phobia' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('phobia', item, 'action2')"
                >
                 Заменить
                </el-button></li>
              <li><strong>Факт:</strong> <span v-if="item.player === lastSegment || item.fact.visible">{{ item.fact.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.fact.visible"
                @click="changeVisible('fact', item)"
              >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.fact.visible && 
                    currentPlayer.fact.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'fact' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('fact', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.fact.visible && 
                    currentPlayer.fact.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'fact' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('fact', item, 'action2')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.fact.visible && 
                    currentPlayer.fact.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'fact' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('fact', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.fact.visible && 
                    currentPlayer.fact.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'fact' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('fact', item, 'action2')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.fact.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'fact' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('fact', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.fact.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'fact' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('fact', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.fact.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'fact' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('fact', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.fact.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'fact' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('fact', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.fact.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'fact' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('fact', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.fact.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'fact' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('fact', item, 'action2')"
                >
                 Заменить
                </el-button></li>
              <li><strong>Багаж:</strong> <span v-if="item.player === lastSegment || item.baggage.visible">{{ item.baggage.name }}</span>
              <el-button
                v-if="item.player === lastSegment && !item.baggage.visible"
                @click="changeVisible('baggage', item)"
              >
                  Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.baggage.visible && 
                    currentPlayer.baggage.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Скопировать' && 
                    (currentPlayer.action2.character === 'baggage' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="copy('baggage', item, 'action1')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.baggage.visible && 
                    currentPlayer.baggage.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Скопировать' && 
                    (currentPlayer.action1.character === 'baggage' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="copy('baggage', item, 'action2')"
                >
                 Скопировать
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.baggage.visible && 
                    currentPlayer.baggage.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обмен' && 
                    (currentPlayer.action1.character === 'baggage' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="exchange('baggage', item, 'action1')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.baggage.visible && 
                    currentPlayer.baggage.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обмен' && 
                    (currentPlayer.action2.character === 'baggage' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="exchange('baggage', item, 'action2')"
                >
                 Обменять
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.baggage.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Открыть' && 
                    (currentPlayer.action1.character === 'baggage' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="openCard('baggage', item, 'action1')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    !item.baggage.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Открыть' && 
                    (currentPlayer.action2.character === 'baggage' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="openCard('baggage', item, 'action2')"
                >
                 Открыть
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.baggage.visible &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить чужое' && 
                    (currentPlayer.action1.character === 'baggage' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('baggage', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player !== lastSegment && 
                    item.baggage.visible &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить чужое' && 
                    (currentPlayer.action2.character === 'baggage' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('baggage', item, 'action2')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.baggage.visible && 
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Заменить свою' && 
                    (currentPlayer.action1.character === 'baggage' 
                    || currentPlayer.action1.character === 'certain')"
                  @click="changeMy('baggage', item, 'action1')"
                >
                 Заменить
                </el-button>
                <el-button
                  v-if="item.player === lastSegment && 
                    currentPlayer.baggage.visible && 
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Заменить свою' && 
                    (currentPlayer.action2.character === 'baggage' 
                    || currentPlayer.action2.character === 'certain')"
                  @click="changeMy('baggage', item, 'action2')"
                >
                 Заменить
                </el-button></li>
            </ul>
            <div style="display: flex; justify-content: space-around">
              <p v-if="item.player === lastSegment || item.action1.visible"><strong>Способность 1</strong><br>{{ item.action1.text }}
                <el-button
                  v-if="item.player === lastSegment &&
                    !currentPlayer.action1.visible && 
                    currentPlayer.action1.action === 'Обменяться'"
                  @click="allExchange('baggage', item, 'action1')"
                >
                 Использовать
                </el-button></p>
              <p v-if="item.player === lastSegment || item.action2.visible"><strong>Способность 2</strong><br>{{ item.action2.text }}
                <el-button
                  v-if="item.player === lastSegment &&
                    !currentPlayer.action2.visible && 
                    currentPlayer.action2.action === 'Обменяться'"
                  @click="allExchange('baggage', item, 'action2')"
                >
                 Использовать
                </el-button></p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
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
// Import necessary store modules
import {useSectionsStore} from '~/store/section';
import {useModulesStore} from '~/store/modules';
import { useRouter, useRoute } from 'vue-router';
import { useWebSocket } from '~/composables/useWebSocket';

import { ref } from 'vue';

const carusel = ref(null);


const input = ref('');


const router = useRouter()
const route = useRoute();

const lastSegment = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  return Number(segments[segments.length - 1]);
});

const available = computed(() => {
  const data = sectionStore.sectionList.data.filter(item => item.kicked <= 4);
  return data.length<=4;
});

// Initialize stores and route
const sectionStore = useSectionsStore();
const modulesStore = useModulesStore();
const { sendMessage, data } = useWebSocket('ws://localhost:8080', carusel);

const send = () => {
  sendMessage("Обновить данные");
};

const randomFromArray = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1)[0];
};

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



const sections = computed(() => {
  return Array.isArray(sectionStore?.sectionList?.data) ?
   sectionStore.sectionList.data : [];
});

// Compute dialog header based on whether it's an update or create operation
const currentPlayer = computed(() => {
  const item = sections.value.find((item) => item.player === Number(route.params.id));
  return item
});

async function changeRoute(e) {
  router.push({path: route.path, query: {...route.query, player: e+1}})
}

async function kick(item) {
 sectionStore.setSection({...item, kicked: true });
  if (sectionStore.currentSection._id) {
    await sectionStore.editSection(route.params.module,
        sectionStore.currentSection._id,
        {...sectionStore.currentSection, _id: undefined});
  }
  send()
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

const generateCharacters = () => {
  let availableCharacters = [...characterData];
  let availableFacts = [...factData];
  let availableFobias = [...fobiaData];
  let availableHealths = [...healthData];
  let availableHobbies = [...hobbyData];
  let availableProfessions = [...professionData];
  let availableStorages = [...storageData];  

  const age = Math.floor(Math.random() * 75) + 16;
  const health = randomFromArray(availableHealths).name;
  const severity = health !== "Отличное" ? Math.floor(Math.random() * 90) + 10 : null;
  return {
    profession: { name: randomFromArray(availableProfessions).name, visible: true },
    bio: {
      name: `Возраст: ${age}, пол: ${randomFromArray(['Мужчина', 'Женщина'])}, плодовитость: ${
        age >= 16 && age <= 50
          ? Math.random() >= 0.1
            ? "Плодовитый"
            : "Не плодовитый"
          : Math.random() <= 0.15
          ? "Плодовитый"
          : "Не плодовитый"
      }`,
      visible: true,
    },
    health: { name: `${health} ${severity ? ` Тяжесть ${severity}%` : ""}`, visible: true },
    character: { name: randomFromArray(availableCharacters).name, visible: true },
    hobby: { name: randomFromArray(availableHobbies).name, visible: true },
    phobia: { name: randomFromArray(availableFobias).name, visible: true },
    fact: { name: randomFromArray(availableFacts).name, visible: true },
    baggage: { name: randomFromArray(availableStorages).name, visible: true },
  }

};

async function changeVisible(key, item) {
    sectionStore.setSection({...item, [key]: {...item[key], visible: true} });
    if (sectionStore.currentSection._id) {
      await sectionStore.editSection(route.params.module,
          sectionStore.currentSection._id,
          {...sectionStore.currentSection, _id: undefined});
    }
    send()
  }

// Force re-render the component
function forceRerender() {
  renderComponent.value = false;

  nextTick(() => {
    renderComponent.value = true;
  });
}
const allExchange  = async (key, player, action) => {
  const item1 = sections.value.find((item) => item.player === player.player);
  sectionStore.setSection({...item1, [action]: {...item1[action], visible: true}})
  await sectionStore.editSection(route.params.module,
    sectionStore.currentSection._id,
    {...sectionStore.currentSection, _id: undefined});
  await refreshData()
  const character = player[action].character
  let changed = sections.value.filter((item) => item[character].visible === true)
  let filteredNames = changed.map(item => item[character].name);
  await changed.forEach(async item => {
    sectionStore.setSection({...item, [character]: {name: randomFromArray(filteredNames), visible: true}})
    await sectionStore.editSection(route.params.module,
      sectionStore.currentSection._id,
      {...sectionStore.currentSection, _id: undefined});
  });
  send()
}

const changeMy = async (key, player, action) => {
    const item = generateCharacters()
    const item1 = sections.value.find((item) => item.player === player.player);
    const item2 = sections.value.find((item) => item.player === Number(route.params.id));
    if (item1.player === Number(route.params.id)) {
      sectionStore.setSection({...item1, [key]: item[key], [action]: {...item1[action], visible: true}});
      await sectionStore.editSection(route.params.module,
      sectionStore.currentSection._id,
      {...sectionStore.currentSection, _id: undefined});
    } else {
      sectionStore.setSection({...item1, [key]: item[key]});
      await sectionStore.editSection(route.params.module,
      sectionStore.currentSection._id,
      {...sectionStore.currentSection, _id: undefined});
      sectionStore.setSection({...item2, [action]: {...item2[action], visible: true}});
      await sectionStore.editSection(route.params.module,
      sectionStore.currentSection._id,
      {...sectionStore.currentSection, _id: undefined});
    }
  send()
  }


const openCard = async (key, player, action) => {
  const item1 = sections.value.find((item) => item.player === player.player);
  const item2 = sections.value.find((item) => item.player === Number(route.params.id));
  sectionStore.setSection({...item2, [action]: {...item2[action], visible: true}});
  await sectionStore.editSection(route.params.module,
    sectionStore.currentSection._id,
    {...sectionStore.currentSection, _id: undefined});
  changeVisible(key, player)
}

const copy = async (key, player, action) => {
    const item1 = sections.value.find((item) => item.player === player.player);
    const item2 = sections.value.find((item) => item.player === Number(route.params.id));
    sectionStore.setSection({...item2, [key]: item1[key], [action]: {...item2[action], visible: true}});
  await sectionStore.editSection(route.params.module,
    sectionStore.currentSection._id,
    {...sectionStore.currentSection, _id: undefined});
  send()
}

  const exchange = async (key, player, action) => {
    const item1 = sections.value.find((item) => item.player === player.player);
    const item2 = sections.value.find((item) => item.player === Number(route.params.id));
    sectionStore.setSection({...item2, [key]: item1[key], [action]: {...item2[action], visible: true}});
    await sectionStore.editSection(route.params.module,
      sectionStore.currentSection._id,
      {...sectionStore.currentSection, _id: undefined});
    sectionStore.setSection({...item1, [key]: item2[key]});
    await sectionStore.editSection(route.params.module,
      sectionStore.currentSection._id,
      {...sectionStore.currentSection, _id: undefined});
    send()
  }

const open = () => {
  ElMessageBox.alert(`${modulesStore.currentModule.catastrophe}`, 'Информация о бункере', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
  })
}

const open2 = () => {
  ElMessageBox.alert(`${modulesStore.currentModule.threat}`, 'Угроза', {
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
    padding: 15px;
  }

  .card h3 {
    font-size: 16px;
  }

  .card li {
    font-size: 14px;
  }

  .card .el-button {
    font-size: 12px; /* Уменьшаем размер кнопок для мобильных */
    padding: 6px 12px;
  }

  .card .el-button + .el-button {
    margin-top: 5px;
  }

  .el-carousel__item h3 {
    font-size: 18px;
  }

  .el-carousel {
    height: 90vh; /* Уменьшаем высоту карусели */
  }
}
</style>