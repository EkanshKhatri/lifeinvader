import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.VITE_HF_TOKEN);

async function test() {
  try {
    const res = await hf.chatCompletion({
      model: 'meta-llama/Llama-3.3-70B-Instruct',
      messages: [{ role: 'user', content: 'Say exactly: Hello world' }],
      max_tokens: 20
    });
    console.log(res.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}
test();
