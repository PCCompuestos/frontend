<template>
  <Listbox as="div" v-model="selected" class="w-full" @update="$emit('input', $event)">
    <!--<ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Choose an option: </ListboxLabel>-->
    <div class="relative">
      <ListboxButton class="relative w-full h-10 py-2 pl-4 pr-10 cursor-default rounded-md bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6">
        <span class="flex items-center">
          <span class="block truncate">{{ selected.text }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-inset ring-gray-200 focus:outline-none">
          <ListboxOption as="template" v-for="option in props.options" :key="option.value" :value="option" v-slot="{ active, selected }">
            <li :class="[active ? 'bg-primary text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-4 pr-9']">
              <div class="flex items-center">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ option.text }}</span>
              </div>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-primary', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps(['value', 'options'])
const emit = defineEmits(['change'])

const selected = ref(props.options.find(option => option.value === props.value))

// Check when selected option changes
watch(selected, (newValue, oldValue) => {
  emit('change', newValue.value)
})
</script>