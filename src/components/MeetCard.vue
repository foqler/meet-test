<template>
  <b-card
      :title="title"
      class="mb-4 text-left"
      :class="{ 'border border-danger': change }"
  >
    <b-card-sub-title
        v-if="isShowDate"
        class="mb-2"
    >
      <b-icon-calendar-date></b-icon-calendar-date>
      {{ eventDate }}
    </b-card-sub-title>
    <b-card-sub-title
        v-if="isShowGuests"
        class="mb-2"
    >
      <b-icon-people v-if="guestsCount > 1"></b-icon-people>
      <b-icon-person v-else></b-icon-person>
      {{ guestsCount }}
    </b-card-sub-title>
    <b-card-text v-if="isShowAbout">
      {{ about }}
    </b-card-text>
    <b-button
        size="sm"
        variant="primary"
        @click="openModalEdit"
    >
      <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Edit
    </b-button>
    <b-button
        size="sm"
        variant="danger"
        class="ml-2"
        @click="removeMeet"
    >
      <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
    </b-button>
  </b-card>
</template>

<script>
export default {
  name: 'MeetCard',
  props: {
    meetId: {
      type: [String, Number],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    eventDate: {
      type: String,
      default: '',
    },
    guestsCount: {
      type: Number,
      default: null,
    },
    about: {
      type: String,
      default: '',
    },
    selectedOptions: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      change: false
    }
  },
  computed: {
    isShowDate() {
      return this.selectedOptions.includes('event_date')
    },
    isShowGuests() {
      return this.selectedOptions.includes('guests_count')
    },
    isShowAbout() {
      return this.selectedOptions.includes('about')
    }
  },
  watch: {
    title() {
      this.setSelected()
    },
    eventDate() {
      this.setSelected()
    },
    guestsCount() {
      this.setSelected()
    },
    about() {
      this.setSelected()
    }
  },
  methods: {
    openModalEdit() {
      this.$emit('emitOpenModalEdit', this.meetId)
    },
    removeMeet() {
      this.$emit('emitRemove', this.meetId)
    },
    setSelected() {
      this.change = true
      setTimeout(() => {
        this.change = false
      }, 5000)
    }
  }
}
</script>
