import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';


export class Sketch
{
    constructor()
    {
        this.canvas = document.querySelector('canvas.webgl');
        this.sizes = {
            width: this.canvas.parentNode.clientWidth,
            height: this.canvas.parentNode.clientHeight
        }

        this.gui = new dat.GUI();
        this.clock = new THREE.Clock();

        this.loader = new GLTFLoader();
        this.scene = this.createScene();
        this.renderer = this.createRenderer(this.canvas, this.sizes);
        this.camera = this.createCamera(this.sizes);
        this.scene.add(this.camera);

        this.setupLights(this.scene);
        this.setInteractionEvents();
        
        this.loadModel();

        this.render();
    }

    loadModel()
    {
        this.loader.load( 'tree.glb', ( gltf ) => {
            this.tree = gltf.scene;
            this.tree.rotation.z = .2
            this.tree.rotation.y = 3
        
            this.scene.add(this.tree);
            
            
            const rotationFolder = this.gui.addFolder('rotation')
            rotationFolder.add(this.tree.rotation, 'x').min(-20).max(20).step(0.01);
            rotationFolder.add(this.tree.rotation, 'y').min(-20).max(20).step(0.01);
            rotationFolder.add(this.tree.rotation, 'z').min(-20).max(20).step(0.01);
        
            const positionFolder = this.gui.addFolder('position');
            positionFolder.add(this.tree.position, 'x').min(-20).max(20).step(0.01);
            positionFolder.add(this.tree.position, 'y').min(-20).max(20).step(0.01);
            positionFolder.add(this.tree.position, 'z').min(-20).max(20).step(0.01);
        
        }, undefined, function ( error ) {
            console.error( error );
        });

        this.render();
    }



    render()
    {
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update objects
    
        // Render
        this.renderer.render(this.scene, this.camera);
    
        // Call render again on the next frame
        window.requestAnimationFrame(this.render.bind(this));
        
    }

    setInteractionEvents()
    {
        window.addEventListener('resize', () =>
        {
            // Update sizes
            this.sizes.width = this.canvas.parentNode.clientWidth;
            this.sizes.height = this.canvas.parentNode.clientHeight;

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // Update materialText.uniforms.viewport
            this.materialText.uniforms.u_viewport = { type: 'v2', value: new THREE.Vector2(this.sizes.width, this.sizes.height) }
            
            

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        window.addEventListener('mousemove', (event) => 
        {
            this.mouse = {
                x: event.clientX/this.sizes.width,
                y: event.clientY/this.sizes.height
            }

        });
    }

    
    createScene()
    {
        let scene = new THREE.Scene();
        return scene;
    }

    createRenderer(canvas, sizes)
    {
        let renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        return renderer;
    }

    createCamera(sizes)
    {
        let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.x = 0;
        camera.position.y = 9;
        camera.position.z = 16;

        
        const cameraFolder = this.gui.addFolder('camera');
        cameraFolder.add(camera.position, 'y').min(-20).max(20).step(0.01);
        cameraFolder.add(camera.position, 'x').min(-20).max(20).step(0.01);
        cameraFolder.add(camera.position, 'z').min(0).max(50).step(0.01);

        return camera;
    }

    setupLights(scene)
    {
        this.pointLight = new THREE.PointLight(0xffffff, 8);
        this.pointLight.position.x = 2;
        this.pointLight.position.y = 3;
        this.pointLight.position.z = 4;
        scene.add(this.pointLight);

        
        const light = this.gui.addFolder('light 1');
        light.add(this.pointLight.position, 'x').min(-20).max(20).step(0.01);
        light.add(this.pointLight.position, 'y').min(-20).max(20).step(0.01);
        light.add(this.pointLight.position, 'z').min(-20).max(20).step(0.01);
        light.add(this.pointLight, 'intensity').min(0).max(20).step(0.01);

        const pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1);
        scene.add(pointLightHelper);

        /*this.pointLight2 = new THREE.PointLight(0xffffff, 3);
        this.pointLight2.position.x = -0.8;
        this.pointLight2.position.y = -1.3;
        this.pointLight2.position.z = 4.4;
        scene.add(this.pointLight2);

        
        const light2 = this.gui.addFolder('light 2');
        light2.add(this.pointLight2.position, 'x').min(-20).max(20).step(0.01);
        light2.add(this.pointLight2.position, 'y').min(-20).max(20).step(0.01);
        light2.add(this.pointLight2.position, 'z').min(-20).max(20).step(0.01);
        light2.add(this.pointLight2, 'intensity').min(0).max(20).step(0.01);

        const pointLightHelper2 = new THREE.PointLightHelper(this.pointLight2, 1);
        this.scene.add(pointLightHelper2);

        this.pointLight3 = new THREE.PointLight(0xffffff, 1);
        this.pointLight2.position.x = 0;
        this.pointLight2.position.y = -2.2;
        this.pointLight2.position.z = 8;
        scene.add(this.pointLight3);

        
        const light3 = this.gui.addFolder('light 3');
        light3.add(this.pointLight3.position, 'x').min(-20).max(20).step(0.01);
        light3.add(this.pointLight3.position, 'y').min(-20).max(20).step(0.01);
        light3.add(this.pointLight3.position, 'z').min(-20).max(20).step(0.01);
        light3.add(this.pointLight3, 'intensity').min(0).max(20).step(0.01);

        const pointLightHelper3 = new THREE.PointLightHelper(this.pointLight3, 1);
        scene.add(pointLightHelper3);*/
    }

}

new Sketch();