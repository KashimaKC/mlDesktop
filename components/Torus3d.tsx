import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function Torus3d( props: any ) {
    const ref = useRef<Mesh>(null!)

    const [hovered, hover] = useState(false);

    useFrame((state, delta) => ref.current.rotation.x += props.xRot);
    useFrame((state, delta) => ref.current.rotation.y += props.yRot);
    useFrame((state, delta) => ref.current.rotation.z += props.zRot);

    return (
        <mesh
        {...props}
            ref={ref}
            scale={0.2}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >
            <torusGeometry args={[10, 2, props.polyCount, props.polyCount]}/>
            <meshStandardMaterial
                wireframe={props.wireframe}
                color={props.color}
            />
        </mesh>
    )
}

export default Torus3d