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
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
    }).then(this._handleResponse);
    return this._cards;
  }

  getUserInfo() {
    this._userInfo = fetch(`${this._host}/users/me`, {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
    }).then(this._handleResponse);
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._setUserInfo = fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
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
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    }).then(this._handleResponse);
    return this._avatar;
  }

  addLike(data) {
    this._like = fetch(`${this._host}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
    }).then(this._handleResponse);
    return this._like;
  }

  removeLike(data) {
    this._removeLike = fetch(`${this._host}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
    }).then(this._handleResponse);
    return this._removeLike;
  }

  newCard(cardInfo) {
    this._newCard = fetch(`${this._host}/cards`, {
      method: "POST",
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
      body: JSON.stringify(cardInfo),
    }).then(this._handleResponse);
    return this._newCard;
  }

  removeCard(id) {
    this._removeCard = fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
    }).then(this._handleResponse);
    return this._removeCard;
  }

  changeLikeCardStatus(id, isLiked) {
    this._changeLikeCardStatus = fetch(`${this._host}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
    }).then(this._handleResponse);
    return this._changeLikeCardStatus;
  }
}

export const api = new Api({
  host: "https://madwizz-backend.nomoredomains.icu",
  headers: {
    "content-type": "application/json",
    // authorization: `Bearer ${localStorage.getItem('token')}`,
    // {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers},
  },
});
