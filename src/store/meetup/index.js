import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [{
      imageUrl: 'https://media.timeout.com/images/103678916/image.jpg',
      id: '1',
      date: new Date(),
      title: 'Meetup in New York',
      location: 'New York'
    }, {
      imageUrl: 'https://www.st-christophers.co.uk/__data/assets/image/0005/441644/iStock-604371970.jpg',
      id: '2',
      date: new Date(),
      title: 'Meetup in Paris',
      location: 'Paris'
    }]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()

          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              date: obj[key].date,
              imageUrl: obj[key].imageUrl,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }

      firebase.database().ref('meetups').push(meetup)
        .then(({ key }) => {
          meetup.id = key
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref(`meetups/${key}.${ext}`).put(payload.image)
        })
        .then(({ metadata }) => {
          meetup.imageUrl = metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(meetup.id).update({
            imageUrl: meetup.imageUrl
          })
        })
        .then(() => {
          commit('createMeetup', meetup)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((ma, mb) => {
        return ma.date > mb.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
