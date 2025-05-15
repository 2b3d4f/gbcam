export const vsSource: Promise<string> = fetch("./shaders/vs.glsl").then((r) =>
  r.text()
);
export const fsSource: Promise<string> = fetch("./shaders/fs.glsl").then((r) =>
  r.text()
);
export const echoFsSource: Promise<string> = fetch(
  "./shaders/echo.fs.glsl"
).then((r) => r.text());
export const passFsSource: Promise<string> = fetch(
  "./shaders/pass.fs.glsl"
).then((r) => r.text());

/**
 * Load shader sources: vs, fs, echo, pass
 */
export async function loadShaders(): Promise<{
  vsText: string;
  fsText: string;
  echoFsText: string;
  passFsText: string;
}> {
  const [vsText, fsText, echoFsText, passFsText] = await Promise.all([
    vsSource,
    fsSource,
    echoFsSource,
    passFsSource,
  ]);
  return { vsText, fsText, echoFsText, passFsText };
}

type RGB = [r: number, g: number, b: number];

interface Preset {
  id: string;
  name: string;
  colors: [RGB, RGB, RGB, RGB];
}

export interface Presets {
  default: string;
  presets: Preset[];
}

/**
 * Load presets JSON from /presets.json
 */
export async function loadPresets(): Promise<Presets> {
  const data: Presets = await fetch("/presets.json").then((r) => r.json());
  return data;
}
