const rootURL = 'https://damp-journey-26965.herokuapp.com'

exports.postNewMash = (token, data) => {
  return fetch(`${rootURL}/api/mash/newmash`, {
    method: 'POST',
    headers: {
      "Authorisation": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({imageData: data})
  })
  .then(res => {
    return res.json();
  })
};

exports.postContinueMash = (id, token, data, phase) => {
  return fetch(`${rootURL}/api/mash/continuemash/${id}`, {
    method: 'POST',
    headers: {
      "Authorisation": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageData: data,
      currPhase: phase
    })
  })
  .then(res => {
    return res.json();
  })
};

exports.getUser = (token) => {
  return fetch(`${rootURL}/api/user`, {
    headers: {"Authorisation": `Bearer ${token}`}
  })
  .then(res => {
    return res.json();
  })
};

exports.getAllMashes = () => {
  return fetch(`${rootURL}/api/mash/all`)
  .then(res => {
    return res.json();
  })
};

exports.getContinueMash = (token) => {
  return fetch(`${rootURL}/api/mash/continuemash`, {
    headers: {"Authorisation": `Bearer ${token}`}
  })
}

exports.userSignIn = (username, password) => {
  return fetch(`${rootURL}/api/user/signin`,{
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: {"Content-type": "application/json"}
  })
};

exports.userSignUp = (username, password) => {
  return fetch(`${rootURL}/api/user/signup`,{
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: {"Content-type": "application/json"}
  })
};