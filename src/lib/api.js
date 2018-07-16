exports.postNewMash = (token, data) => {
  return fetch('https://damp-journey-26965.herokuapp.com/api/mash/newmash', {
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
  return fetch(`https://damp-journey-26965.herokuapp.com/api/mash/continuemash/${id}`, {
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
  return fetch(`https://damp-journey-26965.herokuapp.com/api/user`, {
    headers: {"Authorisation": `Bearer ${token}`}
  })
  .then(res => {
    return res.json();
  })
};

exports.getAllMashes = () => {
  return fetch('https://damp-journey-26965.herokuapp.com/api/mash/all')
  .then(res => {
    return res.json();
  })
};

exports.getContinueMash = (token) => {
  return fetch('https://damp-journey-26965.herokuapp.com/api/mash/continuemash', {
    headers: {"Authorisation": `Bearer ${token}`}
  })
}

exports.userSignIn = (username, password) => {
  return fetch(`https://damp-journey-26965.herokuapp.com/api/user/signin`,{
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: {"Content-type": "application/json"}
  })
};

exports.userSignUp = (username, password) => {
  return fetch(`https://damp-journey-26965.herokuapp.com/api/user/signup`,{
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: {"Content-type": "application/json"}
  })
};