import { FC, ReactHTMLElement, useEffect, useState, } from "react";
import { invoke } from '@tauri-apps/api/tauri';
import { sendNotification, requestPermission, isPermissionGranted } from '@tauri-apps/api/notification';
import { Canvas } from "@react-three/fiber";
import Cylinder3d from "@/components/Cylinder3d";
import Torus3d from "@/components/Torus3d";
import Cone3d from "@/components/Cone3d";
import { shapecard, homepage } from "@/styles/shapecard";
import { Slider, Box, Button, IconButton } from "@mui/material";
import { FaPlay, FaPause, FaReply, FaInfo } from "react-icons/fa";
import Dialog from "@/components/Dialog";

// checks to see if we are executing in client context
// if in client context we can interact with the rust backend, cannot in server context
const isClient = typeof window !== 'undefined'

const Home:FC = () => {

  const [state, setState] = useState<boolean>(false);
  // defaults to the red since the first button should be the stop since it plays by default
  const [playpause, setPlayPause] = useState<string[]>(['#FF0000', 'Stop'])
  const [shapeColor, setShapeColor] = useState<String>('orange');
  const [sliderValX, setSliderValX] = useState<number>(10);
  const [sliderValY, setSliderValY] = useState<number>(10);
  const [sliderValZ, setSliderValZ] = useState<number>(10);

  const [rotValX, setRotValX] = useState<number>(0.005);
  const [rotValY, setRotValY] = useState<number>(0);
  const [rotValZ, setRotValZ] = useState<number>(0);

  const [polyVal, setPolyVal] = useState<number>(25);
  const [lightIntensity, setLightIntensity] = useState<number>(1);

  const [open, setOpen] = useState<boolean>(false);


  // invokes the rust backend to flip the state, not necessary but fun
  const invokeState = async () => {
    const result: boolean = await invoke("change_state", {state: state})
    setState(result)

    if (result == true) {
      setRotValX(0);
      setRotValY(0);
      setRotValZ(0);
      //green
      setPlayPause(['#00FFCA', 'play'])
    } else {
      setRotValX(0.005);
      setPlayPause(['#FF0000', 'stop'])
    }
  }

  const resetDefaults = () => {
    setShapeColor('orange');
    setSliderValX(10);
    setSliderValY(10);
    setSliderValZ(10);
    setRotValX(0.005);
    setRotValY(0);
    setRotValZ(0);
    setPolyVal(25);
    setLightIntensity(1);
  }

  {/* changes the values of each of the sliders, assigns a new value */}
  const sliderChangeX = (event: Event, newValue: number | number[]) => {
    setSliderValX(newValue as number);
  }

  const sliderChangeY = (event: Event, newValue: number | number[]) => {
    setSliderValY(newValue as number);
  }

  const sliderChangeZ = (event: Event, newValue: number | number[]) => {
    setSliderValZ(newValue as number);
  }

  const sliderChangeRotX = (event: Event, newValue: number | number[]) => {
    setRotValX(newValue as number);
  }

  const sliderChangeRotY = (event: Event, newValue: number | number[]) => {
    setRotValY(newValue as number);
  }

  const sliderChangeRotZ = (event: Event, newValue: number | number[]) => {
    setRotValZ(newValue as number);
  }

  const sliderChangePolygonCount = (event: Event, newValue: number | number[]) => {
    setPolyVal(newValue as number);
  }

  const sliderChangeLightIntensity = (event: Event, newValue: number | number[]) => {
    setLightIntensity(newValue as number);
  }

  const closeInfo = () => {
    setOpen(false);
  }

  const openInfo = () => {
    setOpen(true);
  }

  return (
    <div style={homepage.homeContainer as React.CSSProperties}>
      {/* container for point adjustment sliders */}
      <div style={homepage.sliderContainer}>
        <Box sx={{ width: 300, marginLeft: 10, marginBottom: 1 }}>
          <p>Adjust point light X</p>
          <Slider 
            onChange={sliderChangeX}
            value={sliderValX}
            aria-label="Light Direction"
            defaultValue={10}
            step={1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 300, marginLeft: 10 }}>
          <p>Adjust point light Y</p>
          <Slider 
            onChange={sliderChangeY}
            value={sliderValY}
            aria-label="Light Direction"
            defaultValue={10}
            step={1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 300, marginLeft: 10 }}>
          <p>Adjust point light Z</p>
          <Slider 
            onChange={sliderChangeZ}
            value={sliderValZ}
            aria-label="Light Direction"
            defaultValue={10}
            step={1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
      {/* container for rotation sliders */}
      <div style={homepage.sliderContainer}>
        <Box sx={{ width: 300, marginLeft: 10, marginBottom: 1 }}>
          <p>Adjust Rotation X</p>
          <Slider 
            onChange={sliderChangeRotX}
            value={rotValX}
            aria-label="Light Direction"
            defaultValue={0.005}
            step={0.005}
            min={0}
            max={0.01}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 300, marginLeft: 10 }}>
          <p>Adjust Rotation Y</p>
          <Slider 
            onChange={sliderChangeRotY}
            value={rotValY}
            aria-label="Light Direction"
            defaultValue={10}
            step={0.005}
            min={0}
            max={0.01}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 300, marginLeft: 10 }}>
          <p>Adjust Rotation Z</p>
          <Slider 
            onChange={sliderChangeRotZ}
            value={rotValZ}
            aria-label="Light Direction"
            defaultValue={10}
            step={0.005}
            min={0}
            max={0.01}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
      {/* container for shapes */}
      <div style={homepage.shapesBlock as React.CSSProperties}>

        <section style={shapecard.sectionContainer}>
          <Canvas>
            <pointLight position={[sliderValX, sliderValY, sliderValZ]} intensity={lightIntensity} />
            <Cylinder3d 
              position={[0, 0, 0]} 
              xRot={rotValX} 
              yRot={rotValY} 
              zRot={rotValZ} 
              color={shapeColor}
              polyCount={polyVal}
            />
          </Canvas>
        </section>

        <section style={shapecard.sectionContainer}>
          <Canvas>
            <pointLight position={[sliderValX, sliderValY, sliderValZ]} intensity={lightIntensity} />
            <Cone3d 
              position={[0, 0, 0]} 
              xRot={rotValX} 
              yRot={rotValY} 
              zRot={rotValZ} 
              color={shapeColor} 
              polyCount={polyVal}
            />
          </Canvas>
        </section>

        <section style={shapecard.sectionContainer}>
          <Canvas>
            <pointLight position={[sliderValX, sliderValY, sliderValZ]} intensity={lightIntensity} />
            <Torus3d 
              position={[0, 0, 0]} 
              xRot={rotValX} 
              yRot={rotValY} 
              zRot={rotValZ} 
              color={shapeColor} 
              polyCount={polyVal}
            />
          </Canvas>
        </section>

        <section style={shapecard.colorContainer as React.CSSProperties}>
          {/* color selection buttons */}
          <section style={{display: 'flex', flexDirection: 'column'}}>
            {/* consider changing this to a js map later */}
            <Button 
              variant="contained" 
              component="label" 
              onClick={() => setShapeColor('#541690')} 
              style={shapecard.colorSelector('#541690') as React.CSSProperties}
            />
            <Button 
              variant="contained" 
              component="label" 
              onClick={() => setShapeColor('#FF4949')} 
              style={shapecard.colorSelector('#FF4949') as React.CSSProperties}
            />
            <Button 
              variant="contained" 
              component="label" 
              onClick={() => setShapeColor('#FFCD38')} 
              style={shapecard.colorSelector('#FFCD38') as React.CSSProperties}
            />
            <Button 
              variant="contained" 
              component="label" 
              onClick={() => setShapeColor('#C70A80')} 
              style={shapecard.colorSelector('#C70A80') as React.CSSProperties}
            />
            <Button 
              variant="contained" 
              component="label" 
              onClick={() => setShapeColor('#247881')} 
              style={shapecard.colorSelector('#247881') as React.CSSProperties}
            />
          </section>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <IconButton  
                component="label" 
                onClick={() => invokeState()} 
                style={shapecard.colorSelector(playpause[0]) as React.CSSProperties}
            >
              { 
                playpause[0] == '#00FFCA' ? 
                <FaPlay color="black" fontSize={20} /> : <FaPause color="black" fontSize={20} />
              }
            </IconButton>
            <IconButton  
                component="label" 
                onClick={() => resetDefaults()} 
                style={shapecard.colorSelector('white') as React.CSSProperties}
            >
              <FaReply color="black" fontSize={20} />
            </IconButton>
          </div>
        </section>
      </div>

      {/* polygon adjustment slider */}
      <div style={homepage.sliderContainer}>
        <Box sx={{ width: 300, marginLeft: 10 }}>
          <p>Adjust Polygon Count</p>
          <Slider 
            onChange={sliderChangePolygonCount}
            value={polyVal}
            aria-label="Polygon Count"
            defaultValue={25}
            step={1}
            min={3}
            max={25}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 300, marginLeft: 10 }}>
          <p>Adjust Light Intensity</p>
          <Slider 
            onChange={sliderChangeLightIntensity}
            value={lightIntensity}
            aria-label="Polygon Count"
            defaultValue={1}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>

      {/* footer content */}
      <footer style={homepage.footer as React.CSSProperties}>
        <section style={homepage.footerContent(false)}>Created By: Joshua Maraun</section>
        <section style={homepage.footerContent(true)}>Here are the technologies I used:</section>
        <section style={homepage.footerContent(false)}>
          <IconButton  
            component="label" 
            onClick={() => openInfo()} 
            style={{margin: 0, padding: 0}}
          >
            <FaInfo style={homepage.footerInfoButton} />
          </IconButton>
        </section>

        <Dialog open={open} onClose={closeInfo} />

      </footer>

    </div>
  )
}

export default Home