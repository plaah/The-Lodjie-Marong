import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import id from '../locales/id.json'
import en from '../locales/en.json'

const locales = { id, en }

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(localStorage.getItem('locale') || 'id')

  const t = computed(() => {
    return locales[currentLocale.value]
  })

  function setLocale(locale) {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }

  function toggleLocale() {
    const newLocale = currentLocale.value === 'id' ? 'en' : 'id'
    setLocale(newLocale)
  }

  return { currentLocale, t, setLocale, toggleLocale }
})
