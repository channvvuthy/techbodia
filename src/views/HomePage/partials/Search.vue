<template>
    <div class="h-10 w-full rounded-full bg-gray-200 flex items-center px-3">
        <SearchIcon />
        <div class="ml-3 w-full">
            <input type="text" placeholder="Search..."
                class="focus:outline-none bg-transparent focus:ring-0 focus:ring-transparent ring-transparent border-none w-full"
                v-model="searchQuery" @keyup.enter="onSearch" />
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import SearchIcon from "@/components/icons/SearchIcon.vue";

const searchQuery = ref('');
const emit = defineEmits(['onSearch']);

const onSearch = () => {
    emit('onSearch', searchQuery.value)
}
</script>