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
      let w = this.$refs.tcAnimation.clientWidth
      let h = this.$refs.tcAnimation.clientHeight
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xCCCCCC))
      this.renderer.setSize(w, h)

      /* var axes = new THREE.AxesHelper(20)
       * this.scene.add(axes) */

      var cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
      })

      let nX = Math.ceil(3 / Math.cos(60 * Math.PI / 180.0))
      for (let y = -nX; y < nX; y++) {
        for (let x = -nX; x < nX; x++) {
          var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
          cube.position.x = x * 2 + 1
          cube.position.y = y * 2 + 1
          this.scene.add(cube)
          this.cubes.push({x: x, y: y, cube: cube})
        }
      }

      /* var spotLight = new THREE.SpotLight(0xffffff)
       * spotLight.position.set(0, 10, -20)
       * this.scene.add(spotLight) */

      var spotLight2 = new THREE.SpotLight(0xffffff)
      spotLight2.position.set(-10, -10, 100)
      this.scene.add(spotLight2)

      var directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(0, 3, 10)
      this.scene.add(directionalLight)

      this.camera.position.x = 0
      this.camera.position.y = 3
      this.camera.position.z = 10
      this.camera.lookAt({x: 0, y: 0, z: 0})

      this.$refs.tcAnimation.appendChild(this.renderer.domElement);

      requestAnimationFrame(this.renderScene)
    },
    renderScene() {
      this.nFrame++
      this.mode = this.nFrame % 240 > 120 ? 0 : 1

      for (let i = 0; i < this.cubes.length; i++) {
        this.cubes[i].cube.rotation.y += 0.00025 * i * (this.mode == 0 ? -1 : 1)
        this.cubes[i].cube.rotation.x += 0.00025 * i * (this.mode == 0 ? -1 : 1)
        this.cubes[i].cube.rotation.z += 0.00025 * i * (this.mode == 0 ? -1 : 2)
      }


      this.camera.lookAt(this.scene.position)
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.renderScene)
    },
    resized() {
      let w = this.$refs.tcAnimation.clientWidth
      let h = this.$refs.tcAnimation.clientHeight
      this.camera.aspect = w / h;
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
