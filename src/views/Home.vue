<template>
  <div class="min-h-screen">
    <HeroBanner />
    <div class="sticky top-0 z-30 backdrop-blur-md bg-slate-900/50 border-b border-slate-700/30">
      <div class="max-w-6xl mx-auto px-4">
        <QuickActions />
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <FilterPills />
        <div class="mt-6 space-y-6">
          <MemorialPost v-for="post in filteredPosts" :key="post.id" :post="post" />
        </div>
      </div>
      <aside class="hidden lg:block">
        <ProfileCard />
      </aside>
    </div>
    <MemoryWordsModal v-if="showMemoryWordsModal" />
    <AuthModal v-if="authModalOpen" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFeedStore } from '@/stores/feed'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import HeroBanner from '@/components/Hero/HeroBanner.vue'
import QuickActions from '@/components/ActionButtons/QuickActions.vue'
import MemorialPost from '@/components/Feed/MemorialPost.vue'
import FilterPills from '@/components/Filters/FilterPills.vue'
import ProfileCard from '@/components/Profile/ProfileCard.vue'
import MemoryWordsModal from '@/components/Modal/MemoryWordsModal.vue'
import AuthModal from '@/components/Modal/AuthModal.vue'

const feedStore = useFeedStore()
const authStore = useAuthStore()
const uiStore = useUIStore()

const filteredPosts = computed(() => feedStore.filteredPosts)
const authModalOpen = computed(() => authStore.authModalOpen)
const showMemoryWordsModal = computed(() => uiStore.showMemoryWordsModal)
</script>
