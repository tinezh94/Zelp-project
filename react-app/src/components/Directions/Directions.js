/*global google*/
import { GoogleMap, useLoadScript, Marker, useJsApiLoader, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { loadKey } from '../../store/map';
import './directions.css';

const Directions = ({ businesses, apiKey }) => {
    const { businessId } = useParams();
    
    const [ isLoaded, setIsLoad ] = useState(false);
    // const [ map, setMap ] = useState(/**@type google.maps.Map */(null))
    const [ directionsRes, setDirectionsRes ] = useState(null);
    const [ distance, setDistance ] = useState('');
    const [ duration, setDuration ] = useState('');
    const [ currLat, setCurrLat ] = useState('');
    const [ currLng, setCurrLng ] = useState('');
    const [ showMenu, setShowMenu ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ instruction, setInstruction ] = useState([]);

    const originRef = useRef();
    // const destinationRef = useRef(); 

    const bizArr = businesses ? Object.values(businesses) : null;
    const business = bizArr?.filter(biz => {
        return biz.id === Number(businessId);
    });
    const biz = business[0];

    const center = {
        lat: parseFloat(biz?.latitude),
        lng: parseFloat(biz?.longitude)
    }

    // console.log('center', center)
    const mapRef = useRef();
    const onLoad = useCallback(map => (mapRef.current = map), [])

    useEffect(() => {
        if (apiKey && biz) {
            setIsLoad(true);
        }
    }, [apiKey, biz]);

    // let stepsArray = [];
    // Get directions with any starting point 
    async function getDirections() {
        // console.log('inside function')
        if (originRef.current.value === '') {
            return;
        }
        
        const directionService = new google.maps.DirectionsService();
        const res = await directionService.route({
            origin: originRef.current.value,
            destination: {
                lat: parseFloat(biz?.latitude),
                lng: parseFloat(biz?.longitude)
            },
            // destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        
        setDirectionsRes(res);
        setDistance(res.routes[0].legs[0].distance.text);
        setDuration(res.routes[0].legs[0].duration.text);
        originRef.current.value = '';
    }
    
    console.log('res', directionsRes)
    // Show direction instructions
    let stepsArray = [];
    const showSteps = () => {
        const route = directionsRes?.routes[0].legs[0];
        // console.log(route?.steps);

        for (let i = 0; i < route?.steps.length; i++) {
            let step = route.steps[i].instructions;
            let mile = route.steps[i].distance.text;
            let stepMile = [step, mile];
            stepsArray.push(stepMile);
        }
        console.log('stepsaRRAY', stepsArray);
        setInstruction(stepsArray)
        return stepsArray;
    }
    // console.log(instruction);

    async function getAndShow() {
        await getDirections()
        .then(showSteps())
        .then(closeMenu())
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrLat(position.coords.latitude);
            setCurrLng(position.coords.longitude);
            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);
        })
    },[]);

    // console.log('lat, lng', currLat, currLng)

    // Dropdown menu for current location
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        if (!showMenu) return;
        
        // if (value) setShowMenu(false);
    
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu, value])

    // Direction from current location 
    async function directionFromCurr() {
        const directionService = new google.maps.DirectionsService();
        const res = await directionService.route({
            origin: {
                lat: parseFloat(currLat),
                lng: parseFloat(currLng)
            },
            destination: {
                lat: parseFloat(biz?.latitude),
                lng: parseFloat(biz?.longitude)
            },
            travelMode: google.maps.TravelMode.DRIVING
        })

        setDirectionsRes(res);
        setDistance(res.routes[0].legs[0].distance.text);
        setDuration(res.routes[0].legs[0].duration.text)
    }
    
    if (!isLoaded) {
        return <h1>Loading...</h1>;
    };

    // document.getElementById('get-directions')?.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     // getDirections().showSteps;
    //     showSteps();
    // })

    return (
        <div>
            {isLoaded && (
                <div className='google-map-container'>
                    <GoogleMap
                        mapContainerStyle={{width: 1000, height: 625, position: 'absolute', top: '2em', left: '17em', border: '1px solid #cccaca', borderRadius: '3px'}}
                        zoom={12}
                        center={center}
                        apiKey={apiKey}
                        onLoad={onLoad}
                        options={{
                            mapTypeControl: false,
                        }}
                        >
                        <Marker position={center}></Marker>
                        {directionsRes && <DirectionsRenderer directions={directionsRes} /> }
                    </GoogleMap>
                </div>
            )}
            <div className='directions-container'>  
                <div className='directions-box'>
                    <h3 className='get-direction-h3'>Get Directions</h3>
                        <h5 className='start-from'>Start from</h5>
                        <Autocomplete
                            selectProps={{
                                value: value,
                                onChange: setValue
                            }}
                        >
                            <div>
                                <i className="fa-solid fa-location-dot" style={{color: '#0073bb', position: 'absolute', top: '4.5em', left:'1.5em'}}></i>
                                <input
                                    className='origin-input'
                                    placeholder='Origin'
                                    type='text'
                                    ref={originRef}
                                    onClick={() => openMenu()}
                                    id='origin'
                                    // value={value}
                                    // onChange={(e) => setValue(e.target.value)}
                                >
                                </input>
                            </div>
                        </Autocomplete>
                        {showMenu && (
                            <div className='current-location-div'>
                                <p className='curr-location' onClick={directionFromCurr}>
                                    <i className="fa-solid fa-location-arrow" style={{color: '#0073bb', paddingRight: '5px', paddingBottom: '0', borderBottom: 'none'}}></i>
                                    Current Location
                                </p>
                            </div>
                        )}
                        <div className='directions-biz-info-div'>
                            <NavLink to={`/businesses/${biz.id}`} className='directions-biz-name'>
                                <i className="fa-solid fa-location-dot" style={{color: '#d32323', paddingRight: '5px'}}></i>
                                {biz?.name}</NavLink>
                            <p className='directions-biz-address'>{biz?.address}, {biz?.city}, {biz?.state} {biz?.zipcode}</p>
                        </div>
                        <div className='directions-btn-div'>
                            <button className='directions-btn' id='get-directions' onClick={() => {getAndShow()}}>Get directions</button>
                        </div>
                    <div>
                        {instruction.length > 0 && (
                            <div>
                                <h4 className='driving-directions'>Driving Directions</h4>
                                <div className='distance-duration-div'>
                                    <p>{distance}.</p>
                                    <p className='about-duration'>About {duration}</p>
                                </div>
                                <div className='driving-instructions-div'>
                                    {instruction.map((step, idx) => (
                                        <div className='single-direction'>
                                            <p dangerouslySetInnerHTML={{__html: step[0]}} className='driving-instruction'></p>
                                            <p dangerouslySetInnerHTML={{__html: step[1]}} className='driving-mile' ></p>
                                        </div>
                                    ))}
                                </div>
                                <div className='direction-destination-div'>
                                    <p>
                                        <i className="fa-solid fa-map-pin"></i>
                                        {biz.address}, {biz.city}, {biz.state} {biz.zipcode} USA
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Directions;