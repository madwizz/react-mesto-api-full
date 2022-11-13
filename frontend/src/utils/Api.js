class Api {
  constructor({ host, headers }) {
    this._host = host;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    this._cards = fetch(`${this._host}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
    return this._cards;
  }

  getUserInfo() {
    this._userInfo = fetch(`${this._host}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._setUserInfo = fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then(this._handleResponse);
    return this._setUserInfo;
  }

  setUserAvatar(userInfo) {
    this._avatar = fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    }).then(this._handleResponse);
    return this._avatar;
  }

  addLike(data) {
    this._like = fetch(`${this._host}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
    return this._like;
  }

  removeLike(data) {
    this._removeLike = fetch(`${this._host}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
    return this._removeLike;
  }

  newCard(cardInfo) {
    this._newCard = fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardInfo),
    }).then(this._handleResponse);
    return this._newCard;
  }

  removeCard(id) {
    this._removeCard = fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
    return this._removeCard;
  }

  changeLikeCardStatus(id, isLiked) {
    this._changeLikeCardStatus = fetch(`${this._host}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then(this._handleResponse);
    return this._changeLikeCardStatus;
  }
}

export const api = new Api({
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "e64a8138-ccc5-4160-a623-3eaa2a1e9520",
    "content-type": "application/json",
  },
});
