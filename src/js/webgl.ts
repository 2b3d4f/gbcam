/**
 * Initialize WebGL2 context
 */
export function initGL(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) throw new Error("WebGL2 unsupported");
  return gl;
}

/**
 * Compile a shader
 */
export function compileShader(
  gl: WebGL2RenderingContext,
  src: string,
  type: GLenum
) {
  const sh = gl.createShader(type);
  if (!sh) {
    throw new Error("Unable to create shader");
  }

  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(sh);
    console.log(info);
    throw new Error("Shader Compile failed");
  }
  return sh;
}

/**
 * Create program from VS and FS source
 */
export function createProgram(
  gl: WebGL2RenderingContext,
  vsText: string,
  fsText: string
) {
  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl, vsText, gl.VERTEX_SHADER));
  gl.attachShader(program, compileShader(gl, fsText, gl.FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    throw new Error("Program link failed");
  }
  return program;
}

/**
 * Create an FBO with attached RGBA texture
 */
export function createFBO(
  gl: WebGL2RenderingContext,
  width: number,
  height: number
) {
  const fbo = gl.createFramebuffer();
  const tex = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0
  );
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fbo, tex };
}
