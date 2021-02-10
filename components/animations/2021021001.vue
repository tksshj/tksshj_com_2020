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
      cube: null
    }
  },
  methods: {
    initScene() {
      let w = this.$refs.tcAnimation.clientWidth
      let h = this.$refs.tcAnimation.clientHeight
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xCCCCCC))
      this.renderer.setSize(w, h)

      var cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
      })
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      this.cube.position.x = 0
      this.cube.position.y = 0
      this.cube.position.z = 0
      this.scene.add(this.cube)

      var spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(0, 10, -20)
      this.scene.add(spotLight)

      var spotLight2 = new THREE.SpotLight(0xffffff)
      spotLight2.position.set(0, 15, 20)
      this.scene.add(spotLight2)

      var directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(20, 5, -10)
      this.scene.add(directionalLight)

      this.camera.position.x = 10
      this.camera.position.y = 10
      this.camera.position.z = -20
      this.camera.lookAt({x: 0, y: 0, z: 0})

      this.$refs.tcAnimation.appendChild(this.renderer.domElement);

      requestAnimationFrame(this.renderScene)
    },
    renderScene() {
      this.cube.rotation.y += 0.01
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
