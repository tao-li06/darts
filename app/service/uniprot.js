export const getProteinInfo = async (ids) => {
  return await Promise.all(ids.split(';').map(async (id) => {
    const res = await fetch(`https://www.ebi.ac.uk/proteins/api/proteins/${id.trim()}`,
      { headers: { "Accept": "application/json" }}
    );
    const json = await res.json();
    return json;
  }));
}

