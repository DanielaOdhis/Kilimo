import React from 'react';
import twig from './twig.png';
import { Link } from 'react-router-dom';

export default function Landing(){

    return(
        <div className="handing-container">
            <header>
                <div className='logo'>Kilimo</div>
            </header>
            <main className='drop-container'>
            <div>
                    <div className="twig">
                        <img src={twig} alt="twig" />
                    </div>
                </div>
                <div className="drop">
                    <h1 >Cultivating Connections, Growing Communities </h1>
                    <p>Discover the power of agriculture to bring people together and build thriving communities.</p>
                    <button><Link to={`/login`} className="link">LOG IN</Link></button>
                    <button><Link to={`/signup`} className="link">SIGN UP</Link></button>
                </div>
            </main>
        </div>
    )
}