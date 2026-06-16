async function getModels() {
  const token = process.env.VITE_GROQ_TOKEN;
  const res = await fetch('https://api.groq.com/openai/v1/models', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  console.log(data.data.map(m => m.id).join(', '));
}
getModels();
