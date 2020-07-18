class Chunk {
    constructor(size = 1, scale = 1, x = 0, z = 0) {
        this.geometry = new THREE.Geometry();
        this.size = size;
        this.scale = scale;
        this.x = x;
        this.z = z;
    }

    createVertices() {
        for (let x = 0; x <= this.size; x++) {
            for (let z = 0; z <= this.size; z++) {
                let chunkX = (this.size * this.scale * this.x),
                    chunkZ = (this.size * this.scale * this.z);

                let globalX = x + (this.x * this.size),
                    globalZ = z + (this.z * this.size);

                this.geometry.vertices.push(new THREE.Vector3((x * this.scale) + chunkX, noise.simplex2(globalX / 50, globalZ / 50) * 2, (z * this.scale) + chunkZ));
            }
        }
    }

    createFaces() {
        for (let i = 0; i < this.geometry.vertices.length; i++) {
            if (i == (this.size * this.size) + this.size) {
                break;
            } else {
                if (i % (this.size + 1) == this.size) {
                    continue;
                }
                let square = [
                    i, i + 1,
                    i + this.size + 1, i + this.size + 2
                ]
                this.geometry.faces.push(new THREE.Face3(
                    square[0],
                    square[1],
                    square[3]
                ));
                this.geometry.faces.push(new THREE.Face3(
                    square[0],
                    square[3],
                    square[2]
                ));
            }
        }
    }

    createMesh() {
        this.createVertices();
        this.createFaces();
        this.geometry.computeBoundingBox();
    }

    sameChunk(chunk) {
        return ((this.x === chunk.x) && (this.z === chunk.z));
    }

    
}

class ChunkLoader {
    constructor(renderDistance, chunkSize, chunkScale) {
        this.renderDistance = renderDistance;
        this.chunkSize = chunkSize;
        this.chunkScale = chunkScale;
        this.chunks = [];
    }

    chunkExists(searchChunk) {
        for(let i = 0; i < this.chunks.length; i++) {
            if(searchChunk.sameChunk(this.chunks[i])) {
                return true;
            }
        }
        return false;
    }

    meshExists(searchMesh) {
        for(let i = 0; i < scene.children.length; i++) {
            if((searchMesh.x === scene.children[i].x) && (searchMesh.z === scene.children[i].z)) {
                return true;
            }
        }
        return false;
    }

    loadChunks(playerX, playerZ) {
        let currentChunkX = Math.floor(playerX/this.chunkSize),
            currentChunkZ = Math.floor(playerZ/this.chunkSize);

        for (let x = currentChunkX - this.renderDistance; x < currentChunkX + this.renderDistance; x++) {
            for (let z = currentChunkZ - this.renderDistance; z < currentChunkZ + this.renderDistance; z++) {
                if (!(this.chunkExists(new Chunk(this.chunkSize, this.chunkScale, x, z)))) {
                    this.chunks.push(new Chunk(this.chunkSize, this.chunkScale, x, z));
                }
            }
        }
    }

    cleanChunks(playerX, playerZ) {
        while(this.chunks.length > (this.renderDistance*this.renderDistance)*6) {
            this.chunks.splice(0,1);
            scene.children.splice(0,1);
        }
    }

    addChunks() {
        this.chunks.forEach((chunk) => {
            chunk.createMesh();

            let mesh = new THREE.Mesh(chunk.geometry, new THREE.MeshBasicMaterial({
                color: `rgb(${Math.abs(chunk.x*50%255)}, ${Math.abs(chunk.z*50%255)}, ${100})`,
                wireframe: true
            }));

            mesh.x = chunk.x;
            mesh.z = chunk.z;

            if(!this.meshExists(mesh)) {
                scene.add(mesh);
            }
        });
    }

    debug(playerX,playerZ) {
        console.log(Math.floor(playerX/this.chunkSize),Math.floor(playerZ/this.chunkSize), " ~ ", Math.floor(playerX), Math.floor(playerZ))
    }
}