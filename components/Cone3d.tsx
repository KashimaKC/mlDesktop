import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function Cone3d( props: any ) {
    const ref = useRef<Mesh>(null!)


    useFrame((state, delta) => ref.current.rotation.x += props.xRot);
    useFrame((state, delta) => ref.current.rotation.y += props.yRot);
    useFrame((state, delta) => ref.current.rotation.z += props.zRot);

    return (
        <mesh
        {...props}
            ref={ref}
            scale={1}
        >
            <coneGeometry args={[1, 3, 20]}/>
            <meshStandardMaterial
                wireframe={props.wireframe}
                color={props.color}
            />
        </mesh>
    )
}

export default Cone3d