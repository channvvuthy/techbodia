<template>
    <div class="fixed w-full h-full left-0 top-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="rounded-2xl shadow w-96 relative bg-white">
            <div class="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer absolute -top-3 -right-3"
                @click="close">
                <CloseIcon :size="18" />
            </div>
            <div class="h-10 flex items-center justify-center px-5">
                <h1>Country Detail</h1>
            </div>
            <div class="p-5 border-t border-gray-300 overflow-y-scroll" style="max-height:500px;">
                <div class="flex items-center mb-4 border-b pb-4">
                    <b>Flag: </b>
                    <div class="ml-5">
                        <img :src="countryDetail.flags.png" :alt="countryDetail.flags.alt" class="w-20">
                    </div>
                </div>
                <div class="flex items-center mb-4 border-b pb-4">
                    <b>Country Name: </b>
                    <div class="ml-5">
                        {{ countryDetail.name.official }}
                    </div>
                </div>

                <div class="flex items-center mb-4 border-b pb-4">
                    <b>Country Code (cca2): </b>
                    <div class="ml-5">
                        {{ countryDetail.cca2 }}
                    </div>
                </div>
                <div class="flex items-center mb-4 border-b pb-4">
                    <b>Country Code (cca3): </b>
                    <div class="ml-5">
                        {{ countryDetail.cca3 }}
                    </div>
                </div>

                <div class="flex items-center mb-4 border-b pb-4">
                    <b>Native Country Name : </b>
                    <div class="ml-5">
                        <div> <b>Official:</b> {{ getAlternativeName(countryDetail.name.nativeName) }}</div>
                        <div><b>Common:</b> {{ getAlternativeName(countryDetail.name.nativeName, 'common') }}</div>
                    </div>
                </div>

                <div class="flex items-center mb-4 border-b pb-4">
                    <b>Alternative Country Name: </b>
                    <div class="ml-5">
                        {{ countryDetail.altSpellings.toString() }}
                    </div>
                </div>

                <div class="flex items-start mb-4 border-b pb-4">
                    <b>Country Calling Codes: </b>
                    <div class="ml-5">
                        <div v-for="(suffixe, index) in countryDetail.idd.suffixes" :key="index">
                            {{ countryDetail.idd.root }}{{ suffixe }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { defineEmits, defineProps } from 'vue';

defineProps({
    countryDetail: {
        type: Object,
        default: () => { }
    }
})

const emit = defineEmits(['close']);

const close = () => emit('close');

const getAlternativeName = (nativeName, alt = 'official') => {
    if (!nativeName) return 'N/A';

    const firstKey = Object.keys(nativeName)[0];
    return nativeName[firstKey]?.[alt] || 'N/A';
}
</script>