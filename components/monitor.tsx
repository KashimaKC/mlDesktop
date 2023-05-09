import { FC, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import * as THREE from 'three';
import { render } from "react-dom";

const Monitor:FC = () => {

    const [cpuInfo, setCpuInfo] = useState<number>(0)

    const startMonitorService = async () => {
        let currentUsage: number = await invoke("get_cpu", {run: true})
        console.log(currentUsage)
    }

    const killMonitorService = async () => {
        await invoke("get_cpu", {run: false})
    }

    return (
        <div>
            <button onClick={startMonitorService}>start monitor service</button>
            <button onClick={killMonitorService}>kill monitor service</button>
            HW Monitor:
            <p>CPU: {cpuInfo}</p>
        </div>
    )
}

export default Monitor