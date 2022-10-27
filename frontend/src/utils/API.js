class Api {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получение карточек с сервера

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    })
      .then(this._checkResponse);
  }

  // Отправка карточек на сервер

  setInitialCards(data) {
    const cardBody = {
      name: data.name,
      link: data.link
    }
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(cardBody)
    })
      .then(this._checkResponse);
  }

  // Загрузка информации о пользователе с сервера

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  // Загрузка информации о пользователе на сервер

  setInfo(data) {
    const userInfoBody = {
      name: data.name,
      about: data.about,
    }
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfoBody)
    })
      .then(this._checkResponse);
  }

  setAvatar(data) {
    const userAvatarBody = {
      avatar: data.avatar,
    }
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userAvatarBody)
    })
      .then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  url: 'https://api.memesto.nomoredomains.icu',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
