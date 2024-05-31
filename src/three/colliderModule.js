import {Octree} from 'three/examples/jsm/math/Octree'
import {OctreeHelper} from 'three/examples/jsm/helpers/OctreeHelper'
import { Capsule } from 'three/examples/jsm/math/Capsule'
import * as THREE from 'three'
class Colider{
    constructor(scene,camera){
        console.log(scene)
        this.scene = scene
        this.camera=camera
        this.camera.position.set(0,170,0)
        this.camera.rotation.order = 'YXZ';
        this.GRAVITY = 9.8
        this.NUM_SPHERES = 100;
        this.SPHERE_RADIUS = 0.2;
        this.STEPS_PER_FRAME = 5;
        this.worldOctree = new Octree();

        this.worldOctree.fromGraphNode(scene.children[19]);

        this.playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);
        this.playerCollider.translate(new THREE.Vector3(0,70,0))
        console.log(this.playerCollider)
        this.playerVelocity = new THREE.Vector3(0,0,0);
        this.playerDirection = new THREE.Vector3(0,0,0);
        this.playerOnFloor=false
        this.keyStates={}
        this.clock = new THREE.Clock();
        document.addEventListener( 'keydown', ( event ) => {

            this.keyStates[ event.code ] = true;

        } );

        document.addEventListener( 'keyup', ( event ) => {

            this.keyStates[ event.code ] = false;

        } );
        let container = document.getElementById("three-container")
        container.addEventListener( 'mousedown', () => {

            document.body.requestPointerLock();


        } );
        document.body.addEventListener( 'mousemove', ( event ) => {

            if ( document.pointerLockElement === document.body ) {

                this.camera.rotation.y -= event.movementX / 500;
                this.camera.rotation.x -= event.movementY / 500;

            }

        } );


    }
    playerCollisions(){
        const result = this.worldOctree.capsuleIntersect( this.playerCollider );

				this.playerOnFloor = false;

				if ( result ) {

					this.playerOnFloor = result.normal.y > 0;

					if ( ! this.playerOnFloor ) {

						this.playerVelocity.addScaledVector( result.normal, - result.normal.dot( this.playerVelocity ) );

					}

					this.playerCollider.translate( result.normal.multiplyScalar( result.depth ) );

				}
    }
    updatePlayer( deltaTime ) {

        let damping = Math.exp( - 4 * deltaTime ) - 1;

        if ( ! this.playerOnFloor ) {

            this.playerVelocity.y -= this.GRAVITY * deltaTime;

            // small air resistance
            damping *= 0.1;

        }

        this.playerVelocity.addScaledVector( this.playerVelocity, damping );

        const deltaPosition = this.playerVelocity.clone().multiplyScalar( deltaTime );
        this.playerCollider.translate( deltaPosition );
      
        this.playerCollisions();

        this.camera.position.copy( this.playerCollider.end );

    }
    getForwardVector() {

        this.camera.getWorldDirection( this.playerDirection );
        this.playerDirection.y = 0;
        this.playerDirection.normalize();

        return this.playerDirection;

    }
    getSideVector() {

        this.camera.getWorldDirection( this.playerDirection );
        this.playerDirection.y = 0;
        this.playerDirection.normalize();
        this.playerDirection.cross( this.camera.up );

        return this.playerDirection;

    }
    teleportPlayerIfOob() {

        if ( this.camera.position.y <= -5) {

            this.playerCollider.start.set( 0, 0.35, 0 );
            this.playerCollider.end.set( 0, 1, 0 );
            this.playerCollider.radius = 0.35;
            this.playerCollider.translate(new THREE.Vector3(0,70,0))
            this.camera.position.copy( this.playerCollider.end );
            this.camera.rotation.set( 0, 0, 0 );

        }

    }
    controls( deltaTime ) {
   
        // gives a bit of air control
        const speedDelta = deltaTime * ( this.playerOnFloor ? 25 : 8 );

        if ( this.keyStates[ 'KeyW' ] ) {

            this.playerVelocity.add( this.getForwardVector().multiplyScalar( speedDelta ) );
          
        }

        if ( this.keyStates[ 'KeyS' ] ) {

            this.playerVelocity.add( this.getForwardVector().multiplyScalar( - speedDelta ) );

        }

        if ( this.keyStates[ 'KeyA' ] ) {

            this.playerVelocity.add( this.getSideVector().multiplyScalar( - speedDelta ) );

        }

        if ( this.keyStates[ 'KeyD' ] ) {

            this.playerVelocity.add( this.getSideVector().multiplyScalar( speedDelta ) );

        }

        if ( this.playerOnFloor ) {

            if ( this.keyStates[ 'Space' ] ) {

               this. playerVelocity.y = 15;

            }

        }

    }
    update(){
 
        if(!this) return
       
        const deltaTime = Math.min( 0.05, this.clock.getDelta() ) / this.STEPS_PER_FRAME;

        // we look for collisions in substeps to mitigate the risk of
        // an object traversing another too quickly for detection.

        for ( let i = 0; i < this.STEPS_PER_FRAME; i ++ ) {

            this.controls( deltaTime );

            this.updatePlayer( deltaTime );



            this.teleportPlayerIfOob();

        }
        
    }

}
export default Colider