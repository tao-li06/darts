import Cookies from 'js-cookie';

export const endpoint = (process.env.NODE_ENV == "production" ? "http://ec2-18-218-250-252.us-east-2.compute.amazonaws.com" : "http://localhost" );

export const login = async (username, password) => {
  const res = await fetch(`${endpoint}/api/login`,
    {
      body: JSON.stringify({ username, password }),
      method: "POST",
      mode: "cors",
      credentials: 'include'
    });
  const json = await res.json();
  return res.ok && json && json.token;
}

export const getExpList = async (drugName) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/experiment`,
    {
      headers: {
        Authorization: token
      },
      credentials: 'include',
      method: "GET",
      mode: "cors",
      drugName: drugName,
    });
  const json = await res.json();
  return res.ok && json;
}

export const getStudyList = async () => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/study`,
    {
      headers: {
        Authorization: token
      },
      credentials: 'include',
      method: "GET",
      mode: "cors",
    });
  const json = await res.json();
  return res.ok && json;
}

export const uploadStudy = async (name, description, label) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/study`,
  {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      label,
    }),
    credentials: 'include',
    method: "POST",
    mode: "cors",
  });
  return res.ok;
}

export const uploadExp = async (name, headers, data) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/experiment`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        headers,
        data,
      }),
      credentials: 'include',
      method: "POST",
      mode: "cors",
    });
  return res.ok;
}

export const getExp = async (experimentid) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/experiment/${experimentid}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors"
    });
  const json = await res.json();
  return res.ok && json;
}

export const deleteExp = async (id) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/experiment/${id}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "DELETE",
      mode: "cors"
    });
  return res.ok;
}

export const deleteStudy = async (id) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/study/${id}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "DELETE",
      mode: "cors"
    });
  return res.ok;
}