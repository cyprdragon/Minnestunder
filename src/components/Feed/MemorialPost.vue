<template>
  <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-700/30 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img
          :src="post.author.image"
          :alt="post.author.name"
          class="w-10 h-10 rounded-full object-cover border border-slate-600"
        />
        <div>
          <p class="font-semibold text-white">{{ post.author.name }}</p>
          <p class="text-xs text-slate-400">{{ formatTimeAgo(post.createdAt) }}</p>
        </div>
      </div>
      <button class="text-slate-400 hover:text-white transition-colors">
        <MoreVertical class="w-5 h-5" />
      </button>
    </div>

    <!-- Content -->
    <div class="px-6 py-4">
      <p class="text-slate-100 leading-relaxed">{{ post.content }}</p>
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.content"
        class="mt-4 rounded-xl object-cover max-h-96 w-full"
      />
    </div>

    <!-- Stats -->
    <div class="px-6 py-3 border-t border-slate-700/30 flex justify-between text-sm text-slate-400">
      <span>{{ post.likes }} liker</span>
      <span>{{ post.comments }} kommentarer</span>
      <span>🕯️ {{ post.candles }}</span>
    </div>

    <!-- Actions -->
    <div class="px-6 py-3 border-t border-slate-700/30 grid grid-cols-4 gap-2">
      <button
        @click="toggleLike"
        class="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-colors text-slate-300 hover:text-red-400"
      >
        <Heart :class="{ 'fill-red-400': post.isLiked, 'text-red-400': post.isLiked }" class="w-5 h-5" />
        <span class="text-xs">Lik</span>
      </button>
      <button class="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-colors text-slate-300 hover:text-blue-400">
        <MessageCircle class="w-5 h-5" />
        <span class="text-xs">Svar</span>
      </button>
      <button
        @click="lightCandle"
        class="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-colors text-slate-300 hover:text-orange-400"
      >
        <Flame class="w-5 h-5" />
        <span class="text-xs">Lys</span>
      </button>
      <button class="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-colors text-slate-300 hover:text-green-400">
        <Share2 class="w-5 h-5" />
        <span class="text-xs">Del</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFeedStore } from '@/stores/feed'
import { formatTimeAgo } from '@/utils/helpers'
import { Heart, MessageCircle, Flame, Share2, MoreVertical } from 'lucide-vue-next'

const props = defineProps({
  post: Object,
})

const feedStore = useFeedStore()

const toggleLike = () => {
  feedStore.toggleLike(props.post.id)
}

const lightCandle = () => {
  feedStore.lightCandle(props.post.id)
}
</script>
