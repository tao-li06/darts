export const getProteinInfo = async (id) => {
  const res = await fetch(`https://www.ebi.ac.uk/proteins/api/proteins/${id}`,
    { headers: { "Accept": "application/json" }}
  );
  const json = await res.json();
  return json;
}

