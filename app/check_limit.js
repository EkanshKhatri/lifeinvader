async function testLimit() {
  const token = process.env.VITE_GROQ_TOKEN;
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{role: 'user', content: 'test'}],
      max_tokens: 10
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
testLimit();
