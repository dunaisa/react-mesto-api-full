class Api {
  constructor({ url, token }) {
    this._url = url;
    // this._token = token;
    this._headers = {
      // 
      // authorization: 'bfc6d56e-7e9e-491a-a278-c2e6d08bdc0b',
      // 'Authorization': `Bearer ${this._getToken()}`,
      "Accept": "application/json",
      'Content-Type': 'application/json'
    };
    console.log(this._headers)
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
    return fetch(`${this._url}/cards`, {
      redirect: "manual",
      headers: {
        'Authorization': `Bearer ${this._getToken()}`,
      }
    })
      .then(this._checkResponse);
  }

  // Отправка карточек на сервер

  async setInitialCards(name, link) {
    const cardBody = {
      name: name,
      link: link
    }
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      mode: 'no-cors',
      headers: this._headers,
      body: JSON.stringify(cardBody)
    });
    return this._checkResponse(res);
  }

  // Загрузка информации о пользователе с сервера

  async getInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      redirect: "manual",
      headers: {
        'Authorization': `Bearer ${this._getToken()}`,
      },
    });
    return this._checkResponse(res);
  }

  // Загрузка информации о пользователе на сервер

  setInfo(data) {
    const userInfoBody = {
      name: data.name,
      about: data.about,
    }
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      redirect: "manual",
      headers: this._headers,
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
      redirect: "manual",
      headers: this._headers,
      body: JSON.stringify(userAvatarBody)
    })
      .then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      redirect: "manual",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      redirect: "manual",
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
