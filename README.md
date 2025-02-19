# Prompticorn 🦄

Example prompt that is probably good enough for an image:

```
A blue, ancient dragon knitting a red scarf with a cross stitch pattern, sitting cross legged in a lush forest. The light strikes at the golden hour of sunrise with birds starting to rise.
```

```
A majestic emerald-green dragon with golden highlights sits comfortably in a cozy, lantern-lit cavern, carefully knitting a delicate sky-blue scarf with oversized wooden needles. Its glowing amber eyes focus intently on the stitches, tongue slightly sticking out in concentration, while shelves of colorful yarn, a steaming teapot, and a pile of completed scarves surround it. The cavern’s warm glow contrasts with the snowy mountain landscape visible through an opening, where flakes drift gently down. A playful baby dragon tugs at a loose strand of yarn, gazing up curiously as the elder dragon, both fierce and gentle, knits with remarkable precision, embodying warmth and patience amidst the detailed textures of stone, fabric, and scales.
```

## Techstack

This is a [nextjs](https://nextjs.org/) project using app router and Vercels [ai sdk](https://sdk.vercel.ai/docs/introduction). For UI components we use [shadcn/ui](https://ui.shadcn.com/docs).

# Interesting places in the code

- Check if Prompt from user is an image prompt: [Check if Image Prompt](app\api\chat\checkIfImagePrompt.ts)
- LLM logic without any framework: [backend route](app\api\chat\route.ts)
- Look at a backend response to see markers.
- Parse chat messages on the frontend: [Bot Chat Message](app\chat\[chatId]\BotChatMessage.tsx)
