import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import * as THREE from 'three';

/**
 * Load SVG and convert to extruded Three.js geometry.
 *
 * @param {string} svgURL - The URL of the SVG file.
 * @param {number} extrudeDepth - The depth of the extrusion.
 * @param scale
 * @return {Promise<BufferGeometry>} - A promise that resolves to the extruded geometry.
 */

export const svgToExtrudedGeometry = (svgURL, extrudeDepth, scale) => {
    return new Promise((resolve, reject) => {
        const loader = new SVGLoader();

        loader.load(svgURL, (data) => {
            const paths = data.paths;
            let geometries = [];
            for (let i = 0; i < paths.length; i++) {
                const shapes = paths[i].toShapes(true);
                const geometry = new THREE.ExtrudeGeometry(shapes, {
                    depth: extrudeDepth * (1.0 / scale),
                    bevelEnabled: false
                });
                geometries.push(geometry);
            }
            const result = BufferGeometryUtils.mergeGeometries(geometries)
            result.scale(scale, scale, scale)
            resolve(result);
        }, undefined, reject);
    });
}