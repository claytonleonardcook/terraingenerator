class Player {
    constructor(x = 0, y = 0, z = 0) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
        //this.camera.rotation.x = -1.5;

        this.x = x;
        this.y = y;
        this.z = z;
        this.theta = 0;

        this.xVel = 0;
        this.yVel = 0;
        this.zVel = 0;
        this.thetaVel = 0;

        this.forwardSpeed = 0.1;
        this.elivationSpeed = 0.05;
        this.rotationalSpeed = 0.05;

        window.addEventListener('keypress', (e) => {
            let key = e.key;
            if (key == 'a') {
                this.thetaVel = this.rotationalSpeed;
            }
            if (key == 'd') {
                this.thetaVel = -this.rotationalSpeed;
            }

            if (key == 'w') {
                this.xVel = Math.sin(this.theta) * -this.forwardSpeed;
                this.zVel = Math.cos(this.theta) * -this.forwardSpeed;
            }
            if (key == 's') {
                this.xVel = Math.sin(this.theta) * this.forwardSpeed;
                this.zVel = Math.cos(this.theta) * this.forwardSpeed;
            }

            if (key == 'q') {
                this.yVel = -this.elivationSpeed;
            }
            if (key == 'e') {
                this.yVel = this.elivationSpeed;
            }
        });
    }

    update() {
        if (!(this.xVel == 0 && this.yVel == 0 && this.zVel == 0 && this.thetaVel == 0)) {
            this.x += this.xVel;
            this.y += this.yVel;
            this.z += this.zVel;
            this.theta += this.thetaVel;

            this.xVel *= 0.97;
            this.yVel *= 0.97;
            this.zVel *= 0.97;
            this.thetaVel *= 0.97;

            if (this.xVel < 0.002 && this.xVel > -0.002) {
                this.xVel = 0;
            }
            if (this.yVel < 0.002 && this.yVel > -0.002) {
                this.yVel = 0;
            }
            if (this.zVel < 0.002 && this.zVel > -0.002) {
                this.zVel = 0;
            }
            if (this.thetaVel < 0.002 && this.thetaVel > -0.002) {
                this.thetaVel = 0;
            }
        }
        this.camera.position.x = this.x;
        this.camera.position.y = this.y;
        this.camera.position.z = this.z;
        this.camera.rotation.y = this.theta;
    }
}