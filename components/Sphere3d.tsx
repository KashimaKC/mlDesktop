import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function Sphere3d( props: any ) {
    const ref = useRef<Mesh>(null!)

    useFrame((state, delta) => ref.current.rotation.x += 0.005);

    return (
        <mesh
        {...props}
            ref={ref}
            scale={1.5}
        >
            <sphereGeometry args={[1, 32]}/>
            <meshStandardMaterial
                wireframe={props.wireframe}
                color={props.color}
            />
        </mesh>
    )
}

export default Sphere3d