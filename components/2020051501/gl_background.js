import GlCommon from '../gl_common.js'


export default class GlBackground {


  constructor(glContext) {
    this.gl = glContext
    this.program = null
    this.attrPosition = null
    this.attrUv = null
    this.positionBuffer = null
    this.uvBuffer = null
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
      varying vec2 varyUv;

      void main(void) {
        gl_FragColor = vec4(1.0 - varyUv.x * 0.5, 1.0 - varyUv.x * 0.5, 1.0 - varyUv.x * 0.5, 1.0);
      }
    `
    this.program = GlCommon.setupProgram(this.gl, vertexShaderSource, fragmentShaderSource)
    if (!this.program) {
      console.log('Faild to setup shaders')
      return
    }
    this.gl.useProgram(this.program)
    this.attrPosition = this.gl.getAttribLocation(this.program, 'position')
    this.attrUv = this.gl.getAttribLocation(this.program, 'uv')
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


  draw() {
    console.log('draw')
    this.gl.useProgram(this.program)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    this.gl.vertexAttribPointer(this.attrPosition, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(this.attrPosition)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer)
    this.gl.vertexAttribPointer(this.attrUv, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(this.attrUv)

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)

    this.gl.useProgram(null)
  }


}
