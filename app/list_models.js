const token = 'AQ.Ab8RN6K-9mh8dgGLJYGAYivfM0TJB5zGFOpCsAfYg9BgSCGw6A';

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${token}`);
    const data = await res.json();
    console.log(data.models.map(m => m.name));
  } catch (err) {
    console.error(err);
  }
}
listModels();
