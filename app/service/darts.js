import Cookies from 'js-cookie';
import "isomorphic-fetch";
import config from '../config/config';


export const endpoint = () => typeof window === 'undefined' ?  'http://localhost' : config.endpoints.darts;
export const login = async (username, password) => {
  const res = await fetch(`${endpoint()}/api/login`,
    {
      headers: {
        "Content-Type": "application/json",
      },
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
  const res = await fetch(`${endpoint()}/api/study`,
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

export const getUserGroupList = async(token = Cookies.get('token')) => {
  const ugList = await fetch(`${endpoint()}/api/group`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors",
    }
  );
  return ugList.ok && ugList.json();
}

export const addStudy = async (name, description, id, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/study`,
  {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      id
    }),
    credentials: 'include',
    method: "POST",
    mode: "cors",
  });
  return res.ok;
}

export const getStudy = async (id, token = Cookies.get('token'))  => {
  const res = await fetch(`${endpoint()}/api/study/${id}`,
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

export const addGroup = async (name, description, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group`,
  {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
    credentials: 'include',
    method: "POST",
    mode: "cors",
  });
  return res.ok;
}



export const uploadExp = async (id, name, label, headers, data) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint()}/api/study/${id}/experiment`,
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
  const res = await fetch(`${endpoint()}/api/study/${study_id}/experiement/${experimentid}`,
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
  const res = await fetch(`${endpoint()}/api/study/${id}/experiement/${expId}`,
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
  const res = await fetch(`${endpoint()}/api/study/${id}`,
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

export const deleteGroup = async (id) => {
  const token = Cookies.get('token');
  const res = await fetch(`${endpoint()}/api/group/${id}`,
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