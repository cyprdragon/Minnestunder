<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="filter in filters"
      :key="filter.id"
      @click="applyFilter(filter.id)"
      :class="[
        'px-4 py-2 rounded-full font-medium transition-all duration-300',
        activeFilter === filter.id
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30'
      ]"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFeedStore } from '@/stores/feed'

const feedStore = useFeedStore()

const filters = [
  { id: 'all', label: 'Alle innlegg' },
  { id: 'text', label: 'Minneord' },
  { id: 'images', label: 'Bilder' },
  { id: 'videos', label: 'Videoer' },
  { id: 'liked', label: 'Mest likt' },
]

const activeFilter = computed(() => feedStore.activeFilter)

const applyFilter = (filterId) => {
  feedStore.setFilter(filterId)
}
</script>
