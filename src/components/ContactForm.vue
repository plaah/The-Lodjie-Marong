<template>
  <form @submilocale.t.prevent="handleSubmit" class="space-y-6" novalidate>
    <div>
      <label :for="nameId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ locale.t.contaclocale.t.form.name }} <span class="text-red-500">*</span>
      </label>
      <input
        :id="nameId"
        v-model="form.name"
        type="text"
        required
        :class="['w-full px-4 py-3 border bg-cream font-body', errors.name ? 'border-red-500' : 'border-warm-stone/30 focus:border-deep-forest']"
        @blur="validateField('name')"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <div>
      <label :for="emailId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ locale.t.contaclocale.t.form.email }} <span class="text-red-500">*</span>
      </label>
      <input
        :id="emailId"
        v-model="form.email"
        type="email"
        required
        :class="['w-full px-4 py-3 border bg-cream font-body', errors.email ? 'border-red-500' : 'border-warm-stone/30 focus:border-deep-forest']"
        @blur="validateField('email')"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
    </div>

    <div>
      <label :for="phoneId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ locale.t.contaclocale.t.form.phone }} <span class="text-red-500">*</span>
      </label>
      <input
        :id="phoneId"
        v-model="form.phone"
        type="tel"
        required
        :class="['w-full px-4 py-3 border bg-cream font-body', errors.phone ? 'border-red-500' : 'border-warm-stone/30 focus:border-deep-forest']"
        @blur="validateField('phone')"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
    </div>

    <div>
      <label :for="dateId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ locale.t.contaclocale.t.form.date }}
      </label>
      <input
        :id="dateId"
        v-model="form.date"
        type="date"
        class="w-full px-4 py-3 border border-warm-stone/30 bg-cream font-body focus:border-deep-forest"
      />
    </div>

    <div>
      <label :for="messageId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ locale.t.contaclocale.t.form.message }}
      </label>
      <textarea
        :id="messageId"
        v-model="form.message"
        rows="5"
        class="w-full px-4 py-3 border border-warm-stone/30 bg-cream font-body focus:border-deep-forest resize-vertical"
      ></textarea>
    </div>

    <div v-if="submitStatus" :class="['p-4 text-center font-body', submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ submitStatus === 'success' ? locale.t.contaclocale.t.form.success : locale.t.contaclocale.t.form.error }}
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full px-10 py-4 bg-deep-forest text-cream font-label text-label tracking-[0.2em] uppercase hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSubmitting ? locale.t.contaclocale.t.form.submitting : locale.t.contaclocale.t.form.submit }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLocaleStore } from '../stores/locale'

const locale = useLocaleStore()
const nameId = `name-${Math.random().toString(36).slice(2)}`
const emailId = `email-${Math.random().toString(36).slice(2)}`
const phoneId = `phone-${Math.random().toString(36).slice(2)}`
const dateId = `date-${Math.random().toString(36).slice(2)}`
const messageId = `message-${Math.random().toString(36).slice(2)}`

const form = reactive({
  name: '',
  email: '',
  phone: '',
  date: '',
  message: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const submitStatus = ref(null)

function validateField(field) {
  errors[field] = undefined

  if (field === 'name' && !form.name.trim()) {
    errors.name = locale.t.contaclocale.t.form.required
  }

  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = locale.t.contaclocale.t.form.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = locale.t.contaclocale.t.form.invalidEmail
    }
  }

  if (field === 'phone') {
    if (!form.phone.trim()) {
      errors.phone = locale.t.contaclocale.t.form.required
    } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(form.phone)) {
      errors.phone = locale.t.contaclocale.t.form.invalidPhone
    }
  }
}

function validateAll() {
  validateField('name')
  validateField('email')
  validateField('phone')
  return Objeclocale.t.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validateAll()) return

  isSubmitting.value = true
  submitStatus.value = null

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    submitStatus.value = 'success'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.date = ''
    form.message = ''
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
