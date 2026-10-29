// Town Hall Bridge - WebGL Ambient Infrastructure Mesh
// Clean, minimal fluid wireframe topography (pixel particles removed)

(function() {
  const container = document.getElementById('webgl-container');
  if (!container || typeof THREE === 'undefined') return;

  let scene, camera, renderer, linesMesh, gridPlane;
  let clock = new THREE.Clock();
  let width = window.innerWidth;
  let height = window.innerHeight;

  function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, -25, 45);
    camera.lookAt(0, 5, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    createTopographicGrid();
    createConduitWaves();

    window.addEventListener('resize', onWindowResize);
    
    animate();
  }

  // 1. Create Municipal Topographic Infrastructure Plane
  function createTopographicGrid() {
    const gridGeometry = new THREE.PlaneGeometry(120, 80, 50, 35);
    
    // Store original vertices for procedural fluid wave modulation
    const pos = gridGeometry.attributes.position;
    gridGeometry.userData = { originalZ: new Float32Array(pos.count) };
    for (let i = 0; i < pos.count; i++) {
      gridGeometry.userData.originalZ[i] = 0;
    }

    const isDark = document.body.classList.contains('dark-theme');
    const wireColor = isDark ? 0xdddddd : 0x1a1a1a;

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.08
    });

    gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
    gridPlane.rotation.x = -Math.PI / 3;
    gridPlane.position.set(0, -10, 0);
    scene.add(gridPlane);
  }

  // 2. Flowing Conduit Spline Lines (Water conduits, power lines, security vectors)
  function createConduitWaves() {
    const count = 5;
    const group = new THREE.Group();

    for (let c = 0; c < count; c++) {
      const pts = [];
      const zOffset = (c - 2) * 5;
      for (let i = 0; i < 7; i++) {
        pts.push(new THREE.Vector3(
          (i - 3) * 18,
          Math.sin(i * 0.8 + c) * 6 - 5,
          zOffset
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const points = curve.getPoints(50);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      
      const isDark = document.body.classList.contains('dark-theme');
      const mat = new THREE.LineBasicMaterial({
        color: isDark ? 0xaaaaaa : 0x222222,
        transparent: true,
        opacity: isDark ? 0.18 : 0.10
      });

      const line = new THREE.Line(lineGeom, mat);
      line.userData = { speed: 0.2 + c * 0.05, originalY: line.position.y };
      group.add(line);
    }

    linesMesh = group;
    linesMesh.rotation.x = -Math.PI / 4;
    scene.add(linesMesh);
  }

  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Update theme colors when user toggles dark/light mode
  window.updateWebGLTheme = function(isDark) {
    if (!renderer) return;
    const wireColor = isDark ? 0xdddddd : 0x1a1a1a;

    if (gridPlane && gridPlane.material) {
      gridPlane.material.color.setHex(wireColor);
      gridPlane.material.opacity = isDark ? 0.14 : 0.08;
    }
    if (linesMesh) {
      linesMesh.children.forEach(line => {
        line.material.color.setHex(isDark ? 0xaaaaaa : 0x222222);
        line.material.opacity = isDark ? 0.18 : 0.10;
      });
    }
  };

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Dynamic wave deformation on the municipal topographic plane
    if (gridPlane && gridPlane.geometry) {
      const pos = gridPlane.geometry.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        // Harmonic ripple simulation
        const z = Math.sin(u * 0.08 + elapsedTime * 1.2) * Math.cos(v * 0.08 + elapsedTime * 1.0) * 2.8
                + Math.sin((u + v) * 0.05 + elapsedTime * 0.8) * 1.5;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }

    // Conduit flow
    if (linesMesh) {
      linesMesh.children.forEach((line, idx) => {
        line.position.y = Math.sin(elapsedTime * line.userData.speed + idx) * 2;
        line.rotation.z = Math.cos(elapsedTime * 0.1 + idx) * 0.04;
      });
    }

    renderer.render(scene, camera);
  }

  // Self-initialize once DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
