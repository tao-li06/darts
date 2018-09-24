import Cookies from 'js-cookie';
import "isomorphic-fetch";
import config from '../config/config';


export const endpoint = () => typeof window === 'undefined' ?  'http://darts-sci.com/' : config.endpoints.darts;
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
  return json;
}

export const getUserGroupList = async(token = Cookies.get('token')) => {
  const ugList = await fetch(`${endpoint()}/api/groups`,
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

export const getGroupInfo = async(gID, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${gID}`,
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
  if(!res.ok) return null;
    const json = await res.json();
    return res.ok && json;
}

export const addGroup = async (name, description, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/groups`,
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

export const deleteUserGroup = async (id, token = Cookies.get('token')) => {
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

export const getUsersOfGroup = async(id, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${id}/users`,
    {
      headers : {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method:"GET",
      mode: "cors"
    });
    if(!res.ok) return null;
    const json = await res.json();
    return res.ok && json;
}

export const addUserToGroup = async(id, name, setAsAdmin, token = Cookies.get('token')) => {
  const is_admin = setAsAdmin.toString();
  const res = await fetch(`${endpoint()}/api/group/${id}/users`,
    {
      headers : {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        is_admin,
      }),
      credentials: 'include',
      method:"POST",
      mode: "cors"
    });
  return res.ok;
}

export const deleteUserFromGroup = async(id, name, token = Cookies.get('token')) => {
  const is_admin = "false";
  const res = await fetch(`${endpoint()}/api/group/${id}/users`,
    {
      headers : {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        is_admin,
      }),
      credentials: 'include',
      method:"DELETE",
      mode: "cors"
    });
  return res.ok;
}

export const getStudyList = async (group_id, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${group_id}/studies`,
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

export const addStudy = async (name, description, groupid, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${groupid}/studies`,
  {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      groupid
    }),
    credentials: 'include',
    method: "POST",
    mode: "cors",
  });
  return res.ok;
}
//return a list of study
export const getStudyInfo = async (group_id, study_id, token = Cookies.get('token'))  => {
  const res = await fetch(`${endpoint()}/api/group/${group_id}/study/${study_id}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors"
    });
  if (!res.ok) {
    return null;
  }
  
  const json = await res.json();
  return res.ok && json;
}

export const deleteStudy = async (group_id, study_id, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${group_id}/study/${study_id}`,
  {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    credentials: 'include',
    method: "DELETE",
    mode: "cors"
  });
  return res.ok;
}

export const uploadExp = async (groupid, name, label, headers, description, data, studyid, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${groupid}/study/${studyid}/experiments`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        headers: JSON.stringify(headers),
        label,
        description,
        data: JSON.stringify(data),
        studyid,
      }),
      credentials: 'include',
      method: "POST",
      mode: "cors",
    });
  return res.ok;
}

export const getExp = async (group_id, study_id, experimentid, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${group_id}/study/${study_id}/experiment/${experimentid}`,
    {
      headers: {
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: 'include',
      method: "GET",
      mode: "cors"
    });
  if(!res.ok) return null;
  const json = await res.json();
  return res.ok && json;
}

export const deleteExp = async (gid, sid, expId, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/group/${gid}/study/${sid}/experiment/${expId}`,
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

export const canUseUsername = async (name, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/username/${name}`,
    {
      headers:{
        Authorization: token,
        "Accept": "application/json",
      },
      credentials: "include",
      method: "GET",
      mode:"cors"
    });
    if(res.ok) return true;
    else return false;
}

export const addUser = async (name, password, email, description) => {
  const is_admin = "false";
  const res = await fetch(`${endpoint()}/api/users`,
  {
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
      email,
      description,
      is_admin,
    }),
    credentials: "include",
    method:"POST",
    mode:"cors"
  });
  if(res.ok) return true;
  else return false;
}  

export const updateUser = async(id, name, password, email, description, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/user/${id}`,
  {
    headers:{
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      password,
      email,
      description,
      is_admin: false
    }),
    credentials: "include",
    method: "POST",
    mode: "cors"

  });
  return res.ok;
}

export const deleteUser = async(id, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/user/${id}`,
  {
    headers:{
      Authorization: token,
      "Accept": "application/json",
    },
    credentials: "include",
    method: "DELETE",
    mode: "cors"

  });
  return res.ok;
}

export const getUser = async(id, token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/user/${id}`,
  {
    headers:{
      Authorization: token,
      "Accept" : "application/json",
    },
    credentials: "include",
    method: "GET",
    mode: "cors"
  });
  if(!res.ok) return null;
  const json = await res.json();
  return res.ok && json;
}

export const getLoggedInfo = async(token = Cookies.get('token')) => {
  const res = await fetch(`${endpoint()}/api/users`,
    {
      headers: {
        Authorization: token,
        "Accept" : "application/json",
      },
      credentials: "include",
      method: "GET",
      mode: "cors"
    });
    return res.ok && await res.json;
}
