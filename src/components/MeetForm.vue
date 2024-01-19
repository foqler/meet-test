<template>
  <b-form  @submit.stop.prevent="submit">
    <b-form-group
        id="title"
        label="Title:"
        label-for="title"
    >
      <b-form-input
          id="title"
          name="title"
          v-model="form.title.value.value"
          :state="!(form.title.touched.value && (form.title.errors.required || form.title.errors.minLength)) ? null :  false"
          :trim="true"
          @focus="form.title.reset"
          @blur="form.title.touch"
          required
      ></b-form-input>
      <b-form-invalid-feedback
          :state="!(form.title.touched.value && (form.title.errors.required || form.title.errors.minLength))"
      >
        {{ form.title.errors.required ? 'Title field is required.' : 'Title length can\'t be less then 5.' }}
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
        id="event_date"
        label="Event date:"
        label-for="event_date"
    >
      <b-form-input
          id="event_date"
          name="event_date"
          v-model="form.event_date.value.value"
          type="date"
          :state="!(form.event_date.touched.value && form.event_date.errors.required) ? null :  false"
          @focus="form.event_date.reset"
          @blur="form.event_date.touch"
      ></b-form-input>
      <b-form-invalid-feedback
          :state="!(form.event_date.touched.value && form.event_date.errors.required)"
      >
        Event date field is required.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
        id="guests_count"
        label="Guests count:"
        label-for="guests_count"
    >
      <b-form-input
          id="guests_count"
          name="guests_count"
          v-model="form.guests_count.value.value"
          type="number"
          number
          min="1"
          :state="!(form.guests_count.touched.value && form.guests_count.errors.required) ? null :  false"
          @focus="form.guests_count.reset"
          @blur="form.guests_count.touch"
      ></b-form-input>
      <b-form-invalid-feedback
          :state="!(form.guests_count.touched.value && form.guests_count.errors.required)"
      >
        Guests count field is required.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
        id="about"
        label="About:"
        label-for="about"
    >
      <b-form-textarea
          id="about"
          name="about"
          v-model="form.about.value.value"
          rows="3"
          max-rows="6"
      ></b-form-textarea>
    </b-form-group>
    <b-button
        variant="primary"
        @click="submit"
        class="ml-auto"
    >
      <b-icon icon="check2-square" aria-hidden="true"></b-icon> Save
    </b-button>
  </b-form>
</template>

<script>
import { useForm } from '@/use/form'
import { required, minLength } from '@/utils/validators'

export default {
  name: 'MeetForm',
  props: {
    title: {
      type: String,
      default: '',
    },
    eventDate: {
      type: String,
      default: '',
    },
    guestsCount: {
      type: [String, Number],
      default: null,
    },
    about: {
      type: String,
      default: '',
    },
    meetId: {
      type: [String, Number],
      default: null,
    },
  },
  setup(props, context) {
    const form = useForm({
      title: {
        value: props.title,
        validators: { required, minLength: minLength(5) }
      },
      event_date: {
        value: props.eventDate,
        validators: { required }
      },
      guests_count: {
        value: props.guestsCount,
        validators: { required }
      },
      about: {
        value: props.about,
        validators: {}
      },
    })

    function submit() {
      form.touch()
      if (form.valid.value) {
        const data = {
          id: props.meetId,
          title: form.title.value.value,
          event_date: form.event_date.value.value,
          guests_count: form.guests_count.value.value,
          about: form.about.value.value
        }
        context.emit('emitSave', data)
      }
    }
    return { form, submit }
  },
}
</script>
