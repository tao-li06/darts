import Cookies from 'js-cookie';
import "isomorphic-fetch";

export const endpoint = (process.env.NODE_ENV == "production" ? "http://ec2-18-218-250-252.us-east-2.compute.amazonaws.com" : "http://localhost" );

export const login = async (username, password) => {
  const res = await fetch(`${endpoint}/api/login`,
    {
      body: JSON.stringify({ username, password }),
      method: "POST",
      mode: "cors",
      credentials: 'include'
    });
  if (!res.ok) return null;
  const json = await res.json();
  return json && json.token;
}

export const getStudyList = async (token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint}/api/study`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors",
    });
  return res.ok && await res.json();
}

export const addStudy = async (name, description, label, token = Cookies.get('token')) => {
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

export const getStudy = async (id, token = Cookies.get('token'))  => {
  const res = await fetch(`${endpoint}/api/study/${id}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors"
    });
  if (!res.ok) return null;
  const json = await res.json();
  return res.ok && json;
}

export const uploadExp = async (id, name, label, headers, data) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/study/${id}/experiment`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        headers,
        label,
        data,
      }),
      credentials: 'include',
      method: "POST",
      mode: "cors",
    });
  return res.ok;
}

export const getExp = async (study_id, experimentid, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint}/api/study/${study_id}/experiement/${experimentid}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors"
    });
  if (!res.ok) return null;
  const json = await res.json();
  return res.ok && json;
}

export const deleteExp = async (id, expId) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint}/api/study/${id}/experiement/${expId}`,
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