<template>
  <NotificationGroup
    :style="{
      right: '10px',
      bottom: '10px',
      alignItems: 'flex-start',
      flexWrap: 'wrap-reverse',
    }"
  >
    <Fade v-for="alert in alerts" appear>
      <Notification
        :type="{
          style: alert.type,
          icon: true,
        }"
        :closable="true"
        @close="remove(alert.id!)"
        :key="alert.id"
      >
        <div v-if="alert.html" :v-html="alert.content"></div>
        <span v-else>{{ alert.content }}</span>
      </Notification>
    </Fade>
  </NotificationGroup>
</template>

<script setup lang="ts">
import { Fade } from '@progress/kendo-vue-animation';
import { Notification, NotificationGroup } from '@progress/kendo-vue-notification';

import { useAlertsStore } from '@/stores/alerts';
import { storeToRefs } from 'pinia';
const { alerts } = storeToRefs(useAlertsStore());
const { remove } = useAlertsStore();
</script>
