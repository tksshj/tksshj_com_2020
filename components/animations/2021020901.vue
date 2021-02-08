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
      nFrame: 0,
      dx: 0.05,
      dy: 0.05,
      dz: 0.05,
    }
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xCCCCCC))
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      let sphereGeometry = new THREE.SphereGeometry(20, 20, 20)
      let sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true
      })
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.castShadow = true
      sphere.position.x = 2
      sphere.position.y = 4
      sphere.position.z = 2
      this.scene.add(sphere)

      this.camera.position.x = -30
      this.camera.position.y = 50
      this.camera.position.z = 100
      this.camera.lookAt(this.scene.position)

      this.$refs.tcAnimation.appendChild(this.renderer.domElement);

      requestAnimationFrame(this.renderScene)
    },
    renderScene() {
      this.camera.position.x = Math.min(50, Math.max(10, this.camera.position.x + this.dx))
      this.camera.position.y = Math.min(50, Math.max(10, this.camera.position.y + this.dy))
      this.camera.position.z = Math.min(50, Math.max(10, this.camera.position.z + this.dz))
      this.camera.lookAt(this.scene.position)

      this.nFrame += 1
      if (this.nFrame % 30 == 0) {
        this.dx = (Math.random() < 0.5 ? -1.0 : 1.0) * Math.random() * 0.5
        this.dy = (Math.random() < 0.5 ? -1.0 : 1.0) * Math.random() * 0.5
        this.dz = (Math.random() < 0.5 ? -1.0 : 1.0) * Math.random() * 0.5
      }

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.renderScene)
    }
  },
  mounted() {
    this.initScene()
  }
}
</script>

<style scoped lang="scss">
.tc-animation {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
