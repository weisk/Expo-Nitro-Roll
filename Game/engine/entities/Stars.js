import { Platform } from 'react-native';

import GameObject from '../core/GameObject';
import Factory from '../Factory';
import randomRange from '../utils/randomRange';

class Stars extends GameObject {
  particles = [];
  loadAsync = async scene => {
    const particles = new THREE.Group();
    this.add(particles);
    const geometry = new THREE.TetrahedronBufferGeometry(
      12,
      Math.round(randomRange(0, 2)),
    );
    const material = Factory.shared.materials.red;

    const count = Platform.OS === 'android' ? 0 : 50;
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
      );
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      mesh.rotation.set(
        randomRange(0, Math.PI),
        randomRange(0, Math.PI),
        randomRange(0, Math.PI),
      );
      particles.add(mesh);
      this.particles.push(mesh);
    }

    this.y = 150;
    this.z = -600 * 1.1;

    await super.loadAsync(scene);
  };

  update = (delta, time) => {
    super.update(delta, time);
    this.rotation.z -= 0.01 * delta;
    this.rotation.x -= 0.05 * delta;
  };
}

export default Stars;
