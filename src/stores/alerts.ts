import { nanoid } from 'nanoid';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export type NotifyOptions = {
  type?: 'info' | 'success' | 'error' | 'warning' | 'none';
  html?: boolean;
  timeout?: number;
  content: string;
};

export interface Alert extends NotifyOptions {
  id: string;
}

const defaults = {
  type: 'info',
  html: false,
} as NotifyOptions;

export const useAlertsStore = defineStore('alerts', () => {
  // STATE
  const alerts = ref<Alert[]>([]);

  // ACTIONS
  const notify = (options: NotifyOptions) => {
    const alert = {
      id: nanoid(),
      ...defaults,
      ...options,
    };

    alerts.value.push(alert);

    if (options.timeout) {
      setTimeout(() => {
        remove(alert.id);
      }, options.timeout);
    }
  };
  const remove = (id: string) => {
    const index = alerts.value.findIndex((alert) => alert.id === id);
    if (index > -1) {
      alerts.value.splice(index, 1);
    }
  };

  function success(content: string, options?: NotifyOptions) {
    notify({ content, type: 'success', ...options });
  }

  function error(content: string, options?: NotifyOptions) {
    notify({ content, type: 'error', ...options });
  }

  function warning(content: string, options?: NotifyOptions) {
    notify({ content, type: 'warning', ...options });
  }

  function info(content: string, options?: NotifyOptions) {
    notify({ content, type: 'info', ...options });
  }

  return { alerts, notify, remove, success, error, warning, info };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlertsStore, import.meta.hot));
}
