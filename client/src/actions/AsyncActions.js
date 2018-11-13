import * as actions from './Actions'
import axios from 'axios'

export const fetchPeople = (page = 0, per_page = 25) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/people?page=${page}&per_page=${per_page}`)
      return dispatch(actions.receivePeopleSuccess(response.data, page))
    } catch (err) {
      return dispatch(actions.receivePeopleFailure(err))
    }
  }
}