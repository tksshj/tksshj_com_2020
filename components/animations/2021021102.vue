<template>
  <div ref="tcAnimation" class="tc-animation" />
</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      cubes: [],
      nFrame: 0,
      mode: 0
    }
  },
  methods: {
    initScene() {
      console.log('initScene')

      let w = this.$refs.tcAnimation.clientWidth
      let h = this.$refs.tcAnimation.clientHeight

      let nX = 5
      let nY = 5 / w * h
      if (w < h) {
        nX = 5 / h * w
        nY = 5
      }
      let fov = 60
      let cameraZ = nY / Math.tan(30 * Math.PI / 180.0)

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(fov, w / h, 1, 100)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xFFFFFF))
      this.renderer.setSize(w, h)

      this.scene.fog = new THREE.Fog(0xffffFF, 8, 0.0001)

      /* var axes = new THREE.AxesHelper(10)
       * this.scene.add(axes) */

      var cubeGeometry = new THREE.BoxGeometry(0.98, 0.98, 0.98)
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
      })

      for (let y = -nY; y < nY; y++) {
        for (let x = -nX; x < nX; x++) {
          var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
          cube.position.x = x + 0.5
          cube.position.y = y + 0.5
          cube.position.z = 0 - 0.5
          this.scene.add(cube)
          this.cubes.push({x: 0, y: 0, cube: cube})
        }
      }

      var directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(0, 3, 10)
      this.scene.add(directionalLight)

      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = cameraZ
      this.camera.lookAt({x: 0, y: 0, z: 0})

      this.$refs.tcAnimation.appendChild(this.renderer.domElement);

      requestAnimationFrame(this.renderScene)
    },
    renderScene() {
      this.nFrame++
      this.mode = this.nFrame % 240 < 120 ? 0 : 1

      if (this.mode == 0) {
        for (let i = 0; i < this.cubes.length; i++) {
          if (i % 2 == 0) {
            this.cubes[i].cube.rotation.y += Math.PI * 0.005
            this.cubes[i].cube.rotation.x += Math.PI * 0.005
            this.cubes[i].cube.rotation.z += Math.PI * 0.005
          }
        }
      } else {
        for (let i = 0; i < this.cubes.length; i++) {
          if (i % 2 == 1) {
            this.cubes[i].cube.rotation.y += Math.PI * 0.005
            this.cubes[i].cube.rotation.x += Math.PI * 0.005
            this.cubes[i].cube.rotation.z += Math.PI * 0.005
          }
        }
      }

      this.camera.lookAt(this.scene.position)
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.renderScene)
    },
    resized() {
      let w = this.$refs.tcAnimation.clientWidth
      let h = this.$refs.tcAnimation.clientHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
    }
  },
  mounted() {
    this.initScene()
    window.addEventListener('resize', this.resized, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resized)
  }
}
</script>

<style scoped lang="scss">
.tc-animation {
  width: 100%;
  height: 100%;
}
</style>
