import GlCommon from '../../gl_common.js'


export default class GlBackground {


  constructor(glContext) {
    this.gl = glContext
    this.program = null
    this.attrPosition = null
    this.attrUv = null
    this.positionBuffer = null
    this.uvBuffer = null
    this.unifTexture = null
    this.unifSize = null
    this.unifWindowSize = null
  }


  setup() {
    this.setupShaders()
    this.setupBuffers()
  }


  setupShaders() {
    let vertexShaderSource = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 varyUv;

      void main(void) {
        gl_Position = vec4(position, 1.0, 1.0);
        varyUv = uv;
      }
    `
    let fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D texture;
      uniform float size;
      uniform vec2 windowSize;
      varying vec2 varyUv;


      const float redScale   = 0.298912;
      const float greenScale = 0.586611;
      const float blueScale  = 0.114478;
      const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

      void main(void){
        float x = gl_FragCoord.x / 2048.0;
        float y = gl_FragCoord.y / 2048.0;
        vec4 smpColor = texture2D(texture, varyUv);
        float grayColor = dot(smpColor.rgb, monochromeScale) + x + y;
        gl_FragColor = vec4(vec3(grayColor), 1.0);
      }
    `

    // vec2 uv = floor(varyUv * size) / size;


    this.program = GlCommon.setupProgram(this.gl, vertexShaderSource, fragmentShaderSource)
    if (!this.program) {
      console.log('Faild to setup shaders')
      return
    }
    this.gl.useProgram(this.program)
    this.attrPosition = this.gl.getAttribLocation(this.program, 'position')
    this.attrUv = this.gl.getAttribLocation(this.program, 'uv')
    this.unifTexture = this.gl.getUniformLocation(this.program, 'texture');
    this.unifSize = this.gl.getUniformLocation(this.program, 'size');
    this.unifWindowSize = this.gl.getUniformLocation(this.program, 'windowSize');
  }


  setupBuffers() {
    let vertices = [ -1.0,  1.0,
                      1.0,  1.0,
                     -1.0, -1.0,
                      1.0, -1.0 ]
    this.positionBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW)

    let uv = [ 0.0, 1.0,
               1.0, 1.0,
               0.0, 0.0,
               1.0, 0.0 ]
    this.uvBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(uv), this.gl.STATIC_DRAW)
  }


  draw(texture, size, windowSize) {
    this.gl.useProgram(this.program)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    this.gl.vertexAttribPointer(this.attrPosition, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(this.attrPosition)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer)
    this.gl.vertexAttribPointer(this.attrUv, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(this.attrUv)

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
    this.gl.uniform1i(this.unifTexture, texture)

    this.gl.uniform1f(this.unifSize, size)
    this.gl.uniform2f(this.unifWindowSize, windowSize.width, windowSize.height)

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)

    this.gl.useProgram(null)
  }


}
