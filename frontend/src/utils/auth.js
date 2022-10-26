export const BASE_URL = 'https://api.memesto.nomoredomains.icu';

const checkResponse = (res) => {
  if (res.ok) {
    console.log(res)
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ password, email }) => {
  console.log({ password, email })
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then(checkResponse)
  // .then((res) => {
  //   console.log(res)
  //   if (res.token) {
  //     console.log(res.token)
  //     localStorage.setItem('token', res.token);
  //     return res;
  //   }
  // })
};

export const authorize = ({ password, email }) => {
  console.log({ password, email })
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    redirect: "manual",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(checkResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
      }
    })

};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    redirect: "manual",
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse)
    .then(data => data)
}
