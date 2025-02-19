export const imagePromptRecognition = (
  message: string
) => `Below you will be presented with an input from the user. Your job is to classify whether this is an image prompt or not. 

An image prompt describes an image to be created by an image generation ai. An image prompt should mention content, style and more about the image. An image prompt might be very simple and just mention a subject.
Generally err on the side of recognicing the users input as an image prompt.

If the users input below is an image prompt, reply with {isImagePrompt: true}
If the users input below is not an image prompt, reply with {isImagePrompt: false}

Only ever respond in json.

Here are a couplde of examples:
- "A yellow cat" {isImagePrompt: true}
- "A yellow cat with a red hat" {isImagePrompt: true}
- "Make it brighter" {isImagePrompt: false}

Users Input:
${message}`
