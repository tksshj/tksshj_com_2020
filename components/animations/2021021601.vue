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
      cameraZ: 0
    }
  },
  methods: {
    initScene() {
      let w = this.$refs.tcAnimation.clientWidth
      let h = this.$refs.tcAnimation.clientHeight

      let nX = 5
      let nY = Math.ceil(5 / w * h)
      if (w < h) {
        nX = Math.ceil(5 / h * w)
        nY = 5
      }
      let fov = 60
      this.cameraZ = nY / Math.tan(30 * Math.PI / 180.0)

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(fov, w / h, 1, 100)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xFFFFFF))
      this.renderer.setSize(w, h)

      this.scene.fog = new THREE.Fog(0xffffFF, 8, 0.0001)

      /* var axes = new THREE.AxesHelper(10)
       * this.scene.add(axes) */

      var cubeGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0)
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
      })

      for (let y = -nY; y < nY; y++) {
        for (let x = -nX; x < nX; x++) {
          if (x % 2 == 0) {
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.x = x + 0.5
            cube.position.y = y + 0.5
            cube.position.z = 0 - 0.5
            this.scene.add(cube)
            this.cubes.push({x: x, y: y, cube: cube, direction: 1})
          }
        }
      }

      var directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(0, 3, 10)
      this.scene.add(directionalLight)

      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = this.cameraZ
      this.camera.lookAt({x: 0, y: 0, z: 0})

      this.$refs.tcAnimation.appendChild(this.renderer.domElement);

      requestAnimationFrame(this.renderScene)
    },
    renderScene() {
      for (let i = 0; i < this.cubes.length; i++) {
        this.cubes[i].cube.rotation.y += Math.PI * 0.0025
        this.cubes[i].cube.rotation.z += Math.PI * 0.0025
        if (this.cubes[i].direction == 1 && this.cameraZ - 2.0 < this.cubes[i].cube.position.z) {
          this.cubes[i].direction = -1
        } else if (this.cubes[i].direction == -1 && this.cubes[i].cube.position.z < -0.5) {
          this.cubes[i].direction = 1
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
