const token = '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';

async function testHF() {
  const t0 = Date.now();
  console.log("Fetching HF...");
  try {
    const res = await fetch('https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3-8B-Instruct',
        messages: [
          { role: 'system', content: 'You format text perfectly.' },
          { role: 'user', content: 'Format: selling a house' }
        ],
        max_tokens: 150,
        temperature: 0.1
      })
    });

    console.log(`Status: ${res.status} ${res.statusText}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
  console.log(`Time: ${Date.now() - t0}ms`);
}

testHF();
