class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
    this._headers = {
      // 
      // authorization: 'bfc6d56e-7e9e-491a-a278-c2e6d08bdc0b',
      // 'Authorization': `Bearer ${this._getToken()}`,
      "Accept": "application/json",
      'Content-Type': 'application/json'
    };
  }

  _getToken = () => {
    localStorage.getItem('token');
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
    console.log('api get cards from server')
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponse);
  }

  // Отправка карточек на сервер

  setInitialCards(name, link) {
    const cardBody = {
      name: name,
      link: link
    }
    console.log('api set cards')
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(cardBody)
    })
      .then(this._checkResponse);
  }

  // Загрузка информации о пользователе с сервера

  getInfo() {
    console.log('api get all info of user from server')
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
    console.log('api set name and about of user')
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userInfoBody)
    })
      .then(this._checkResponse);
  }

  setAvatar(data) {
    const userAvatarBody = {
      avatar: data.avatar,
    }
    console.log('api set avatar of user')
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
      },
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  url: 'https://api.memesto.nomoredomains.icu',
  headers: {
    // authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    authorization: `Bearer ${localStorage.getItem('token')}`,
    // "Accept": "application/json",
    'Content-Type': 'application/json'
  }
});
