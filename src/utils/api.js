import {API_URL} from "../config";

class API {
    fetchBooks = (bookshelfId) => {
        return fetch(`${API_URL}/bookshelf?bookshelfId=${bookshelfId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => resp.json())
    }

    removeBook = (shelfId, volumeId) => {
        return fetch(`${API_URL}/volume/remove`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({shelfId, volumeId})
      })
    }

    addToShelf = (shelfId, volumeId) => {
        fetch(`${API_URL}/volume/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({shelfId, volumeId})
        })
    }

    fetchReviews = (volumeId, userId, callback) => {
        return fetch(`${API_URL}/reviews?volumeId=${volumeId}&userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => resp.json())
          .then(data => {console.log(data); callback(data)})
          .catch(err => console.log(err))
    }

    fetchMyReviews = (userId, callback) => {
      return fetch(`${API_URL}/myreviews?userId=${userId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(res => res.json())
      .then(reviews => callback(reviews))
      .catch(err => console.error(err))
    }

    deleteReview = (reviewId) => {
      return fetch(`${API_URL}/review`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({reviewId})
      })
    }


}

const instance = new API();

export default instance;