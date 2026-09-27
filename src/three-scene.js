/**
 * 3D SCROLLYTELLING ENGINE — Three.js
 * Alexis Deniel Caga Portfolio
 * 
 * Manages 3D camera choreography, particle field, interactive meshes,
 * and lighting transitions synchronized to page scroll.
 */

class Portfolio3DScene {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.canvas || typeof THREE === 'undefined') {
      console.warn('Three.js or canvas element not available.');
      return;
    }

    this.coordDisplay = document.getElementById('heroCoord');
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    
    // Mouse state
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Performance settings
    this.isHighPerf = true;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene & Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 8);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x09090b, 1);

    // 4. Lights
    this.setupLights();

    // 5. 3D Objects & Environments
    this.createParticleUniverse();
    this.createHeroGeometry();
    this.createSectionWaypoints();

    // 6. Event Listeners
    this.bindEvents();

    // 7. Render Loop
    this.animate();
  }

  setupLights() {
    // Ambient Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    // Key Point Light (Follows Camera / Orange Signal)
    this.keyLight = new THREE.PointLight(0xff5a36, 2.5, 30);
    this.keyLight.position.set(2, 3, 5);
    this.scene.add(this.keyLight);

    // Secondary Accent Light (Amber / Cyan)
    this.fillLight = new THREE.PointLight(0xffd23f, 1.8, 30);
    this.fillLight.position.set(-3, -2, 4);
    this.scene.add(this.fillLight);

    // Directional Rim Light
    this.rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    this.rimLight.position.set(0, 10, -5);
    this.scene.add(this.rimLight);
  }

  createParticleUniverse() {
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0xff5a36); // Signal orange
    const color2 = new THREE.Color(0xffd23f); // Amber
    const color3 = new THREE.Color(0x38bdf8); // Cyan
    const color4 = new THREE.Color(0xffffff); // White star

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across deep vertical cylinder
      positions[i3] = (Math.random() - 0.5) * 35;
      positions[i3 + 1] = (Math.random() - 0.5) * 60 - 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Color variation
      const r = Math.random();
      let chosenColor = color4;
      if (r < 0.35) chosenColor = color1;
      else if (r < 0.6) chosenColor = color2;
      else if (r < 0.8) chosenColor = color3;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createHeroGeometry() {
    this.heroGroup = new THREE.Group();

    // 1. Central Wireframe Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(1.4, 0.35, 100, 16, 2, 3);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xff5a36,
      wireframe: true,
      emissive: 0x331008,
      roughness: 0.2,
      metalness: 0.9
    });
    this.torusKnot = new THREE.Mesh(torusGeo, torusMat);
    this.heroGroup.add(this.torusKnot);

    // 2. Outer Orbital Ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffd23f, wireframe: true });
    this.orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.orbitRing1.rotation.x = Math.PI / 3;
    this.heroGroup.add(this.orbitRing1);

    // 3. Outer Orbital Ring 2
    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    this.orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.orbitRing2.rotation.y = Math.PI / 4;
    this.heroGroup.add(this.orbitRing2);

    this.heroGroup.position.set(0, 0, 0);
    this.scene.add(this.heroGroup);
  }

  createSectionWaypoints() {
    // Floating 3D Geometric Landmarks along the scroll path
    this.waypointsGroup = new THREE.Group();

    // Waypoint 1: Story Prism (Y = -6)
    const prismGeo = new THREE.OctahedronGeometry(1.2, 0);
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0xffd23f,
      wireframe: true,
      metalness: 0.8
    });
    this.storyPrism = new THREE.Mesh(prismGeo, prismMat);
    this.storyPrism.position.set(-3.5, -6, 0);
    this.waypointsGroup.add(this.storyPrism);

    // Waypoint 2: Arts Gallery Orbit (Y = -12)
    const galleryGroup = new THREE.Group();
    const frameGeo = new THREE.BoxGeometry(2.2, 1.4, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xff5a36,
      wireframe: true,
      roughness: 0.3
    });
    for (let i = 0; i < 4; i++) {
      const frame = new THREE.Mesh(frameGeo, frameMat);
      const angle = (i / 4) * Math.PI * 2;
      frame.position.set(Math.cos(angle) * 3, Math.sin(angle) * 0.8, Math.sin(angle) * 2);
      frame.rotation.y = angle + Math.PI / 2;
      galleryGroup.add(frame);
    }
    galleryGroup.position.set(0, -12, 0);
    this.galleryOrbit = galleryGroup;
    this.waypointsGroup.add(this.galleryOrbit);

    // Waypoint 3: Design Matrix Lattice (Y = -18)
    const icosaGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      roughness: 0.1
    });
    this.designIcosa = new THREE.Mesh(icosaGeo, icosaMat);
    this.designIcosa.position.set(3, -18, 0);
    this.waypointsGroup.add(this.designIcosa);

    // Waypoint 4: Film Reel Ring Tunnel (Y = -24)
    const tunnelGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const ringGeo = new THREE.TorusGeometry(2.5, 0.04, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xff5a36 : 0xffd23f,
        wireframe: true
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0, -i * 1.5);
      tunnelGroup.add(ring);
    }
    tunnelGroup.position.set(0, -24, 0);
    this.filmTunnel = tunnelGroup;
    this.waypointsGroup.add(this.filmTunnel);

    // Waypoint 5: Tech Universe Core (Y = -30)
    const sphereGeo = new THREE.SphereGeometry(1.8, 24, 24);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      wireframe: true,
      metalness: 0.9
    });
    this.techCore = new THREE.Mesh(sphereGeo, sphereMat);
    this.techCore.position.set(0, -30, 0);
    this.waypointsGroup.add(this.techCore);

    this.scene.add(this.waypointsGroup);
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  updateCameraPath(progress) {
    // Smooth spline interpolation for camera through 3D storytelling world
    // Total vertical travel distance: Y from 0 down to -32
    const currentY = -progress * 32;
    
    // Curved X-wave navigation
    const targetX = Math.sin(progress * Math.PI * 3) * 2.8 + (this.mouseX * 0.8);
    
    // Z-depth modulation (closer in video and arts, panoramic at hero & skills)
    const targetZ = 8 - Math.sin(progress * Math.PI * 2) * 2.5 + (this.mouseY * 0.5);

    // Smooth inertia camera movement
    this.camera.position.x += (targetX - this.camera.position.x) * 0.06;
    this.camera.position.y += (currentY - this.camera.position.y) * 0.06;
    this.camera.position.z += (targetZ - this.camera.position.z) * 0.06;

    // Camera lookAt point moves slightly ahead
    const lookAtY = this.camera.position.y - 1.2;
    this.cameraTarget.set(0, lookAtY, 0);
    this.camera.lookAt(this.cameraTarget);

    // Dynamic light positioning
    if (this.keyLight) {
      this.keyLight.position.set(
        this.camera.position.x + 2,
        this.camera.position.y + 2,
        this.camera.position.z - 2
      );
    }
    if (this.fillLight) {
      this.fillLight.position.set(
        this.camera.position.x - 2,
        this.camera.position.y - 2,
        this.camera.position.z - 2
      );
    }

    // Update coordinate HUD text if in viewport
    if (this.coordDisplay && progress < 0.15) {
      this.coordDisplay.textContent = `POS: X: ${this.camera.position.x.toFixed(2)} | Y: ${this.camera.position.y.toFixed(2)} | Z: ${this.camera.position.z.toFixed(2)}`;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Lerp scroll and mouse
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Update Camera
    this.updateCameraPath(this.scrollProgress);

    // Rotate Hero Geometry
    if (this.torusKnot) {
      this.torusKnot.rotation.x = elapsedTime * 0.4;
      this.torusKnot.rotation.y = elapsedTime * 0.6;
    }
    if (this.orbitRing1) {
      this.orbitRing1.rotation.z = elapsedTime * 0.3;
    }
    if (this.orbitRing2) {
      this.orbitRing2.rotation.x = -elapsedTime * 0.25;
    }

    // Rotate Waypoints
    if (this.storyPrism) {
      this.storyPrism.rotation.x = elapsedTime * 0.5;
      this.storyPrism.rotation.y = elapsedTime * 0.8;
    }
    if (this.galleryOrbit) {
      this.galleryOrbit.rotation.y = elapsedTime * 0.3;
    }
    if (this.designIcosa) {
      this.designIcosa.rotation.y = elapsedTime * 0.4;
      this.designIcosa.rotation.z = elapsedTime * 0.2;
    }
    if (this.filmTunnel) {
      this.filmTunnel.rotation.z = elapsedTime * 0.2;
    }
    if (this.techCore) {
      this.techCore.rotation.y = elapsedTime * 0.35;
    }

    // Drift particles subtly
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.03;
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  setPerformanceMode(isHigh) {
    this.isHighPerf = isHigh;
    if (this.renderer) {
      this.renderer.setPixelRatio(isHigh ? Math.min(window.devicePixelRatio, 2) : 1);
    }
  }
}

// Instantiate globally on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.portfolioScene = new Portfolio3DScene();
});
