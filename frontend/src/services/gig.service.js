// *************Using server****************************************

import { httpService } from './http.service.js'

const ENDPOINT = 'gig'

async function query(filterBy) {
  let gigs = await httpService.get(ENDPOINT, filterBy)
  return gigs
}

async function getUserGigs({ userId }) {
  let gigs = await httpService.get(ENDPOINT)
  const userGigs = []
  gigs.find((gig) => {
    if (gig.owner._id === userId) {
      userGigs.push(gig)
    }
  })
  return userGigs
}

async function getGigById(gigId) {
  return await httpService.get(`${ENDPOINT}/${gigId}`)
}

async function removeGig(gigId) {
  return await httpService.delete(`${ENDPOINT}/${gigId}`)
}

async function saveGig(gig) {
  const gigToSave = JSON.parse(JSON.stringify(gig))
  if (gigToSave._id) {
    return await httpService.put(`${ENDPOINT}/${gigToSave._id}`, gigToSave)
  } else {
    if (!gigToSave.name) gigToSave.name = 'Unknown'
    return await httpService.post(ENDPOINT, gigToSave)
  }
}

// async function addReview(gigId, review) {
//     return await httpService.post(`${ENDPOINT}/${gigId}/review`, review);
// }

function getEmptyGig() {
  var emptyGig = {
    name: '',
    price: 0,
    type: null,
    inStock: true,
    reviews: [],
  }
  return emptyGig
}

export const gigService = {
  query,
  getGigById,
  getEmptyGig,
  removeGig,
  saveGig,
  getUserGigs,
}
