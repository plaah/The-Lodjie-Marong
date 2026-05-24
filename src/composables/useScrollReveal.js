import { onMounted } from 'vue'

let observer = null
const observed = new WeakSet()

export function useScrollReveal() {
  onMounted(() => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )
    }

    document.querySelectorAll('.reveal').forEach((el) => {
      if (!observed.has(el)) {
        observed.add(el)
        observer.observe(el)
      }
    })
  })
}
