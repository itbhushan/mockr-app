// Test HuggingFace API directly
// Using native fetch (Node 18+)

async function testHuggingFaceAPI() {
  // Get token from environment variable
  const apiToken = process.env.HUGGINGFACE_API_TOKEN;

  if (!apiToken) {
    console.error('❌ HUGGINGFACE_API_TOKEN environment variable not set');
    return null;
  }

  const optimizedPrompt = `(((R.K. Laxman editorial cartoon style))), (((black and white line art))), (((single panel newspaper comic))),
  ((Common Man character with round spectacles and checkered shirt standing shocked on left side)),
  ((Opposition leader and Government official shaking hands behind desk)),
  ((banner above them displaying "SAME FAILED POLICY!")),
  ((election posters in background)),
  government office setting, political meeting room, simple clean lines, minimalist background,
  high contrast black and white illustration, professional editorial cartoon quality`;

  try {
    console.log('🌐 Making request to Hugging Face API...');
    console.log('📝 Prompt:', optimizedPrompt.substring(0, 200) + '...');

    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: optimizedPrompt,
          parameters: {
            negative_prompt: "realistic photo, photorealistic, real people, photography, colored, colors, gradients, anime style, complex backgrounds, blurry, low quality",
            num_inference_steps: 50,
            guidance_scale: 9.5,
            width: 1024,
            height: 576
          }
        }),
      }
    );

    console.log('📡 API Response status:', response.status);
    console.log('📡 API Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Hugging Face API error:', response.status, errorText);
      return null;
    }

    console.log('✅ Success! Image generated.');
    return true;

  } catch (error) {
    console.error('❌ Error calling Hugging Face API:', error);
    return null;
  }
}

testHuggingFaceAPI().then(result => {
  if (result) {
    console.log('🎉 HuggingFace API is working!');
  } else {
    console.log('💔 HuggingFace API failed');
  }
});