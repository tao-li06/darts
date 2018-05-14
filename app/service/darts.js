const endpoint = process.env.NODE_ENV == "production" ? "http://tao-li.mynetgear.com" : "http://localhost";

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

export const getExpList = async (token) => {
  const res = await fetch(`${endpoint}/api/experiment`,
    {
      headers: {
        Authorization: token
      },
      credentials: 'include',
      method: "GET",
      mode: "cors"
    });
  const json = await res.json();
  return res.ok && json;
}

export const uploadExp = async (token, name, headers, data) => {
  const res = await fetch(`${endpoint}/api/experiment`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        headers,
        data
      }),
      credentials: 'include',
      method: "POST",
      mode: "cors"
    });
  return res.ok;
}

export const getExp = async (token, id) => {
  const res = await fetch(`${endpoint}/api/experiment/${id}`,
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