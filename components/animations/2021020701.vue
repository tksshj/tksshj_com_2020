<template>
  <div ref="tcAnimation" class="tc-animation" />
</template>

<script>
import * as THREE from 'three'

export default {
  mounted() {
    let w = this.$refs.tcAnimation.clientWidth
    let h = this.$refs.tcAnimation.clientHeight
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    let renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0xF0F0F0))
    renderer.setSize(w, h)

    /* var axes = new THREE.AxesHelper(10)
     * scene.add(axes) */

    let planeGeometry = new THREE.PlaneGeometry(60, 20)
    var planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xE0E0E0
    })
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    scene.add(plane)

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    let cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xBBBBBB,
      wireframe: true
    })
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0
    scene.add(cube)

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    let sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x777777,
      wireframe: true
    })
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2
    scene.add(sphere)

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    this.$refs.tcAnimation.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }
}
</script>

<style scoped lang="scss">
.tc-animation {
  width: 100%;
  height: 100%;
}
</style>
