var scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
const cl = new ChunkLoader(2, 50, 0.05);
noise.seed(Math.random());
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const p = new Player(0, 1, 0);

setInterval(()=> {
  cl.loadChunks(p.x, p.z);
  cl.cleanChunks();
  cl.addChunks();
  console.clear()
  cl.debug(p.x,p.z);
  console.log(`${cl.chunks.length} chunks active`)
},500)

const loop = () => {
  requestAnimationFrame(loop);
  p.update();
  renderer.render(scene, p.camera);
};

loop();