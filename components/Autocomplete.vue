<template>
  <Combobox v-model="selected">
    <div class="w-full relative">
      <div class="relative w-full cursor-default">
        <ComboboxInput
          class="w-full border-none h-10 py-2 pl-4 pr-10 rounded-md bg-white leading-5 shadow-sm text-gray-900 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
          :displayValue="(option) => option.text"
          @change="query = $event.target.value"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-sm ring-1 ring-inset ring-gray-200 focus:outline-none sm:text-sm">
          <div
            v-if="filteredOptions.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            {{ $t('nothing-found') }}
          </div>

          <ComboboxOption
            v-for="option in filteredOptions"
            as="template"
            :key="option.value"
            :value="option"
            v-slot="{ selected, active }"
          >
            <li :class="[active ? 'bg-primary text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-4 pr-9']">
              <div class="flex items-center">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ option.text }}</span>
              </div>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-primary', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps(['value', 'options'])
const emit = defineEmits(['update:value'])
const options = props.options
const value = props.value

let selected = ref(options.find(option => option.value === value))
let query = ref('')

let filteredOptions = computed(() =>
  query.value === ''
    ? options
    : options.filter((option) =>
        option.text
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)

// Check when selected option changes
watch(selected, (newValue, oldValue) => {
  emit('update:value', newValue.value)
})
</script>
