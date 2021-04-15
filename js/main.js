(() => {
  const clickAdv = document.getElementById('clickAdv');
  const contentsHeight = document.getElementById('adv-image').clientHeight;
  const contentsWidth = document.getElementById('adv-image').clientWidth;

  let element, scene, camera, renderer, controls;

  const init = () => {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, 1.80, 1, 1800);
    camera.position.set(0, 0, 0);
    scene.add(camera);

    const geometry = new THREE.SphereGeometry(5, 60, 40, -1.58);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load(
      "/Panorama/images/ikebukuro.jpg"
    );

    const material = new THREE.MeshBasicMaterial({ map: texture});

    sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(contentsWidth, contentsHeight);

    element = renderer.domElement;
    document.getElementById("adv-image").appendChild(element);
    renderer.render(scene, camera);

    let isAndroid = false;
    let isIOS = false;
    if (navigator.userAgent.indexOf("Android") != -1) {
      isAndroid = true;
    } else if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      isIOS = true;
    }
    if (isAndroid || isIOS) {
      window.addEventListener("deviceorientation", setOrientationControls, true);
    } else {
      setOrbitControls();
    }

    render();
  }

  const setOrientationControls = (e) => {
    if (!e.alpha) {
      return;
    }
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();
    window.removeEventListener("deviceorientation", setOrientationControls, true);
  }

  const setOrbitControls = () => {
    const htmlelm = document.getElementById("adv-image")
    controls = new THREE.OrbitControls(camera, htmlelm);
    controls.target.set(
      camera.position.x + 0.15,
      camera.position.y,
      camera.position.z
    );

    controls.enableDamping = true;

    controls.rotateSpeed = -0.07;
    controls.enableZoom = false;

    controls.maxPolarAngle = 2.60;
    controls.minPolarAngle = 0.50 ;
  }

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
  }

  window.addEventListener("load", init, false);

})();
