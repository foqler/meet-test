import { computed, reactive } from 'vue'
import { useField } from './field'

export function useForm(init = {}) {
    const form = reactive({})
    const validKey = 'valid'

    for (const [key, value] of Object.entries(init)) {
        form[key] = useField(value)
    }

    const withoutValid = k => k !== validKey && k !== 'touched' && k !== 'touch' && k !== 'reset'

    form[validKey] = computed(() => Object.keys(form).filter(withoutValid).every(k => form[k].valid.value))
    form.touched = false

    form.touch = () => {
        form.touched = true
        for (const key of Object.keys(init)) {
            form[key].touch()
        }
    }

    form.reset = () => {
        form.touched = false
        for (const key of Object.keys(init)) {
            form[key].reset()
        }
    }

    return form
}
