class Meetings {
    constructor() {
        this.meetings = [
            {
                id: 1,
                title: "Card 1",
                event_date: "2022-09-01",
                guests_count: 14,
                about: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
            },
            {
                id: 2,
                title: "Card 2",
                event_date: "2022-09-02",
                guests_count: 12,
                about: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
            },
            {
                id: 3,
                title: "Card 3",
                event_date: "2022-09-04",
                guests_count: 4,
                about: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
            },
            {
                id: 4,
                title: "Card 4",
                event_date: "2022-09-06",
                guests_count: 1,
                about: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
            },
        ]
    }

    add(meet) {
        this.meetings.push(meet)
    }

    edit(meet) {
        let editableMeet = this.getById(meet.id)
        Object.keys(editableMeet ?? {}).map(item => {
            if (item !== 'id') {
                editableMeet[item] = meet[item]
            }
        })
    }

    getAll() {
        return this.meetings
    }

    getById(id) {
        return this.meetings.find(u => u.id === id)
    }

    remove(id) {
        const meet = this.getById(id)
        if (meet) {
            this.meetings = this.meetings.filter(u => u.id !== meet.id)
        }
        return meet
    }
}

module.exports = function() {
    return new Meetings()
}
