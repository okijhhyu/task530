import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router'; // Для использования route.params

import {useSectionsStore} from '~/store/section';
export function useWebSocket(url, carusel) {
  const socket = ref(null);
  const messages = ref([]);
  const data = ref(null); // Состояние для данных, которые будут обновляться\

  const sendMessage = (message) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(message);
    }
  };

  const sectionStore = useSectionsStore();
  const route = useRoute();


  onMounted(() => {
    
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.value.onmessage = async (event) => {
        
      const dataFromServer = JSON.parse(event.data);
      messages.value.push(dataFromServer.message)
      console.log(dataFromServer.message);
      if (dataFromServer.message === "Обновить данные") {
        console.log(dataFromServer.message)
        await refreshData();  // Вызываем функцию обновления данных
      }
    };

    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.value.onclose = () => {
      console.log('WebSocket connection closed');
    };
  });

  
  const refreshData = async () => {
    try {
      await sectionStore.getSections(route.params.module);
  
      // Ждем, пока Vue обновит DOM и инициализирует ref
        if (carusel.value) {
          carusel.value.setActiveItem(Number(route.query.player) - 1);
        }
    } catch (error) {
      console.error(error);
    }
  };

  onBeforeUnmount(() => {
    if (socket.value) {
      socket.value.close();
    }
  });

  return {
    socket,
    messages,
    sendMessage,
    data, // Возвращаем обновляемое состояние данных
  };
}