import React, {Component} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const style = {
    height: 800
};

class DemoScene extends Component {
    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref
    };

    addCustomSceneObjects = () => {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
        return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}

export default DemoScene;


// import React, { Component } from 'react';
// import * as THREE from 'three';
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import MODEL from './chesterlow.OBJ';
//
// import * as OBJLoader from 'three-obj-loader';
//
//
// class ThreeScene extends Component{
//
//     componentDidMount(){
//         const width = this.mount.clientWidth
//         const height = this.mount.clientHeight    //ADD SCENE
//         this.scene = new THREE.Scene()    //ADD CAMERA
//         this.camera = new THREE.PerspectiveCamera(
//             75,
//             width / height,
//             0.1,
//             1000
//         )
//         this.camera.position.z = 4
//         //ADD RENDERER
//         this.renderer = new THREE.WebGLRenderer({ antialias: true })
//         this.renderer.setClearColor('#000000')
//         this.renderer.setSize(width, height)
//         this.mount.appendChild(this.renderer.domElement)
//
//         // ADD CUBE
//         const geometry = new THREE.BoxGeometry(1, 1, 1)
//         const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
//
//         this.cube = new THREE.Mesh(geometry, material)
//         this.scene.add(this.cube)
//         loader.setPath('src/');
//         loader.load('chesterLow', function(object) {
//             object.position.y -= 60;
//             this.scene.add(this.object);
//         });
//
//         this.start()
//     }
//
//     componentWillUnmount(){
//         this.stop()
//         this.mount.removeChild(this.renderer.domElement)
//     }
//
//     start = () => {
//         if (!this.frameId) {
//             this.frameId = requestAnimationFrame(this.animate)
//         }
//     }
//
//     stop = () => {
//         cancelAnimationFrame(this.frameId)
//     }
//
//     animate = () => {
//         this.cube.rotation.x += 0.01
//         this.cube.rotation.y += 0.01
//
//         this.renderScene()
//         this.frameId = window.requestAnimationFrame(this.animate)
//     }
//
//     renderScene = () => {
//         this.renderer.render(this.scene, this.camera)
//     }
//
//     render(){
//         return(
//             <div
//                 style={{ width: '600px', height: '600px' }}
//                 ref={(mount) => { this.mount = mount }}
//             />
//         )
//     }
// }
//
// export default ThreeScene