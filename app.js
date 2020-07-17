var scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
const cl = new ChunkLoader(8, 10, 0.5);
noise.seed(Math.random());
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const p = new Player(0, 1, 0);

setInterval(()=> {
  cl.loadChunks(p.x, p.z);
  cl.addChunks();
  cl.cleanChunks();
  console.log(`${cl.chunks.length} chunks active`)
},1000)

const loop = () => {
  requestAnimationFrame(loop);
  p.update();
  renderer.render(scene, p.camera);
};

loop();