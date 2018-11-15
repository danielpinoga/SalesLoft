import * as actions from './Actions'
import axios from 'axios'

export const fetchPeople = (page = 0, pageSize = 25) => {
  return async (dispatch, getState) => {
    const paginatedPeopleObject = getState().peopleInfo.allPeopleByPageSize

    if (paginatedPeopleObject[pageSize] && paginatedPeopleObject[pageSize][page]) {
      return dispatch(actions.setCurrentPeople(page, pageSize))
    }

    try {
      const response = await axios.get(`/api/people?page=${page}&per_page=${pageSize}`)
      return dispatch(actions.receivePeopleSuccess(response.data, page, pageSize))
    } catch (err) {
      return dispatch(actions.receivePeopleFailure(err))
    }
  }
}