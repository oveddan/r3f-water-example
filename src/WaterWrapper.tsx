import { extend, Object3DNode } from '@react-three/fiber'
import { BufferGeometry } from "three";
import { Water2Options } from "three-stdlib";
import {Water} from 'three/examples/jsm/objects/Water2';

extend({Water});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'water': Object3DNode<Water, typeof Water>;
    }
  }
}

const WaterWrapper = ({geometry, options}:{
  geometry: BufferGeometry,
  options: Water2Options
}) => {


  <>
   <water>
     <planeBufferGeometry args={[10,10]} />
   </water>
  </>
}

export default WaterWrapper;