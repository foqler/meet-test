<template>
  <div id="app">
    <b-container>
      <b-row class="mt-4">
        <b-col cols="12" class="mb-4 d-flex justify-content-end">
          <b-button
              variant="primary"
              class="mr-2"
              v-b-modal.modal-add
          >
            <b-icon icon="plus" aria-hidden="true"></b-icon> Add
          </b-button>
          <b-dropdown right>
            <template #button-content>
              <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings
            </template>

            <b-dropdown-group header="Selected showed options" class="small">
              <b-dropdown-form>
                <b-form-checkbox-group
                    id="checkbox-options"
                    v-model="selected"
                    :options="options"
                    name="options"
                    @change="setSelectedOptionsInCookies"
                ></b-form-checkbox-group>
              </b-dropdown-form>
            </b-dropdown-group>
          </b-dropdown>
        </b-col>
      </b-row>
      <transition-group
          tag="div"
          class="row"
          name="fade"
          mode="out-in"
      >
        <b-col
            v-for="item in sortedMeetings"
            :key="item.id"
            cols="12"
            md="4"
            lg="3"
        >
          <meet-card
              :meet-id="item.id"
              :title="item.title"
              :event-date="item.event_date"
              :guests-count="item.guests_count"
              :about="item.about"
              :selected-options="selected"
              @emitOpenModalEdit="openModalEdit"
              @emitRemove="removeMeet"
          />
        </b-col>
      </transition-group>
      <div class="text-center">
        <b-spinner
            v-if="start"
            variant="primary"
            label="Spinning"
        ></b-spinner>
        <h2 v-else-if="!meetings.length">
          There are no appointments yet...
        </h2>
      </div>

    </b-container>
    <b-modal
        id="modal-add"
        ref="modal-add"
        title="Add new meeting"
        hide-footer
    >
      <meet-form @emitSave="addMeet"/>
    </b-modal>
    <b-modal
        id="modal-edit"
        ref="modal-edit"
        title="Edit meeting"
        hide-footer
    >
      <meet-form
          v-if="selectedMeet"
          :meet-id="selectedMeet.id"
          :title="selectedMeet.title"
          :event-date="selectedMeet.event_date"
          :guests-count="selectedMeet.guests_count"
          :about="selectedMeet.about"
          @emitSave="editMeet"
      />
    </b-modal>
  </div>
</template>

<script>
import MeetForm from '@/components/MeetForm'
import MeetCard from '@/components/MeetCard'
import { getMeetings } from '@/services/meetings';

const SELECTED_OPTIONS_COOKIE_NAME = 'selected_options'

export default {
  name: 'App',
  components: {
    MeetForm,
    MeetCard
  },
  data() {
    return {
      meetings: [],
      selected: [],
      options: [
        { text: 'Event date', value: 'event_date' },
        { text: 'Guests', value: 'guests_count' },
        { text: 'Description', value: 'about' }
      ],
      selectedMeetId: null,
      start: false
    }
  },
  sockets: {
    connect() {
      console.log('socket connected.....')
    },
    'meetings:update'(meetings) {
      this.meetings = meetings
    },
  },
  computed: {
    sortedMeetings() {
      return this.meetings.sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
    },
    selectedMeet() {
      const selectedMeet = this.meetings.filter(item => item.id === this.selectedMeetId)
      return selectedMeet && selectedMeet[0]
    }
  },
  async mounted() {
    this.setSelectedOptionsOfCookies()

    this.start = true
    await getMeetings().then(response => {
      this.meetings = response
    }).finally(() => this.start = false)
  },
  methods: {
    setSelectedOptionsInCookies(value) {
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      //Добавляем куки с временем жизни 1 день
      document.cookie = `${SELECTED_OPTIONS_COOKIE_NAME}=${JSON.stringify(value)}; expires=${date}`
    },
    setSelectedOptionsOfCookies() {
      const selected = this.getCookieByName(SELECTED_OPTIONS_COOKIE_NAME)
      this.selected = selected ? JSON.parse(selected) : ['event_date', 'guests_count', 'about'];
    },
    openModalEdit(id) {
      this.selectedMeetId = id
      this.$refs['modal-edit'].show()
    },
    getCookieByName(name)  {
      return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
      }, '')
    },
    addMeet(data) {
      this.$socket.emit('meeting:add', data)
      this.$refs['modal-add'].hide()
    },
    editMeet(data) {
      this.$socket.emit('meeting:edit', data)
      this.$refs['modal-edit'].hide()
    },
    removeMeet(id) {
      this.$socket.emit('meeting:remove', id)
    },
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

