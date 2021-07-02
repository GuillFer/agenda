import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'https://my-json-server.typicode.com/GuillFer/agenda/',
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents (page) {
    return apiClient.get(`/events?_limit=4&_page=${page}`)
  },
  getEvent (id) {
    return apiClient.get(`/events/${id}`)
  },
  postEvent (event) {
    return apiClient.post('/events/', event)
  },
  deleteEvent (id) {
    return apiClient.delete(`/events/${id}`)
  }
}
