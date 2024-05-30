<template>
  <div class="bg-gradient-to-t from-indigo-200 h-screen overflow-y-scroll px-40 py-10">
    <div class="bg-white rounded-lg shadow p-5 border border-gray-200">
      <Search @onSearch="onSearch" />
      <div v-if="loading" class="py-2">
        <Loading />
      </div>
      <div v-else>
        <div class="relative overflow-x-scroll mt-5">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3" v-for="(title, index) in tableHead" :key="index">
                  <div v-if="index == 1" class="cursor-pointer flex items-center" @click="sortCountryName">
                    {{ title }}
                    <SortIcon />
                  </div>
                  <div v-else> {{ title }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(country, index) in paginatedCountries" :key="index">
                <td class="px-6 py-4">
                  <img :src="country.flags.png" :alt="country.flags.alt" class="w-20">
                </td>
                <td class="px-6 py-4 cursor-pointer text-blue-500" @click="showCountryDetail(country)">
                  {{ country.name.official }}
                </td>
                <td class="px-6 py-4">
                  {{ country.cca2 }}
                </td>
                <td class="px-6 py-4">
                  {{ country.cca3 }}
                </td>
                <td class="px-6 py-4">
                  <div> <b>Official:</b> {{ getAlternativeName(country.name.nativeName) }}</div>
                  <div><b>Common:</b> {{ getAlternativeName(country.name.nativeName, 'common') }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ country.altSpellings.toString() }}
                </td>
                <td class="px-6 py-4">
                  {{ country.idd.root }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between mt-4">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPageCount }}</span>
          <button @click="nextPage" :disabled="currentPage * rowsPerPage >= filteredCountries.length"
            class="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#modal" v-if="isCountryDetail">
    <CountryDetail @close="isCountryDetail = false" :countryDetail="countryDetail" />
  </Teleport>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Search from "./partials/Search.vue";
import Loading from "./partials/Loading.vue";
import CountryDetail from "./partials/CountryDetail.vue";
import SortIcon from "@/components/icons/SortIcon.vue";
const isCountryDetail = ref(false);
const countryDetail = ref();

const tableHead = ref(['Flags', 'Country Name', 'Country Code (cca2)', 'Country Code (cca3)', 'Native Country Name', 'Alternative Country Name', 'Country Calling Codes']);
const store = useStore();

const loading = computed(() => store.state.loading);
const countries = computed(() => store.state.countries);
const filteredCountries = ref([]);
const sortOrder = ref('asc');

const rowsPerPage = 25;
const currentPage = ref(1);

const getAlternativeName = (nativeName, alt = 'official') => {
  if (!nativeName) return 'N/A';

  const firstKey = Object.keys(nativeName)[0];
  return nativeName[firstKey]?.[alt] || 'N/A';
}

const sortCountryName = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'; // Toggle sorting order

  filteredCountries.value.sort((a, b) => {
    const nameA = a.name.official.toUpperCase();
    const nameB = b.name.official.toUpperCase();

    if (nameA < nameB) {
      return sortOrder.value === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder.value === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// Computed property to get paginated countries
const paginatedCountries = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredCountries.value.slice(start, end);
});

const totalPageCount = computed(() => {
  return Math.ceil(filteredCountries.value.length / rowsPerPage);
});

// Method to go to the next page
const nextPage = () => {
  if (currentPage.value * rowsPerPage < filteredCountries.value.length) {
    currentPage.value++;
  }
}

// Method to go to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const onSearch = (query) => {
  filteredCountries.value = countries.value.filter(country =>
    country.name.official.toLowerCase().includes(query.toLowerCase())
  );
  sortCountryName(); // Re-apply sorting after filtering
  currentPage.value = 1; // Reset to the first page after search
}

const showCountryDetail = (country) => {
  countryDetail.value = country;
  isCountryDetail.value = true;
}

onMounted(async () => {
  await store.dispatch('fetchCountries', {}).catch((err) => {
    console.log({ err });
  });
  filteredCountries.value = [...countries.value]; // Initialize filteredCountries with the fetched countries
});
</script>
