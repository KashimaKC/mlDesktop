import { FC, useState } from "react";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent";
import { dialog } from "../styles/shapecard"
import { SiNextdotjs, SiRust, SiTauri, SiTypescript, SiWebgl, SiThreedotjs } from "react-icons/si"

export interface DialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

const InfoPage = (props: DialogProps) => {

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Technology Info:</DialogTitle>
            <DialogContent>
                <div style={dialog.technologyList as React.CSSProperties}>
                    <section style={dialog.technologyListItem}> 
                        <SiNextdotjs fontSize={40} style={{marginRight: 20}} /> 
                        <div style={{alignSelf: 'center'}}>Next.js: A React JS Framework for Full-Stack Applications</div>  
                    </section>
                    <section style={dialog.technologyListItem}> 
                        <SiTauri fontSize={40} style={{marginRight: 20}} />
                        <div style={{alignSelf: 'center'}}>Tauri: A toolkit for developing applications for desktop platforms</div>
                    </section>
                    <section style={dialog.technologyListItem}> 
                        <SiRust fontSize={40} style={{marginRight: 20}} />
                        <div style={{alignSelf: 'center'}}>Rust: Used with Tauri to handle backend and systems level operations</div>
                    </section>
                    <section style={dialog.technologyListItem}> 
                        <SiTypescript fontSize={40} style={{marginRight: 20}} /> 
                        <div style={{alignSelf: 'center'}}>Typescript: Javascript superset for creating consistent code</div>  
                    </section>
                    <section style={dialog.technologyListItem}> 
                        <SiWebgl fontSize={40} style={{marginRight: 20}} /> 
                        <div style={{alignSelf: 'center'}}>WebGL: Graphics library for creating 3D shapes</div>  
                    </section>
                    <section style={dialog.technologyListItem}> 
                        <SiThreedotjs fontSize={40} style={{marginRight: 20}} /> 
                        <div style={{alignSelf: 'center'}}>Three.js: Toolkit for interacting with WebGL in React applications</div>  
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InfoPage