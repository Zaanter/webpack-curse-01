import React, {useEffect, useState} from 'react'
import Instagram from '../assets/images/instagram.png'
import Twitter from '../assets/images/twitter.png'
import Github from '../assets/images/github.png'
import getData from '../utils/getData'
import {Circles} from 'react-loader-spinner'

const App = () => {
    
    const [data, setData] = useState(null)   
         
    useEffect(async() => {
        setData(await getData())
    },[])

    if(data){
        return (
            <div className="About">
                <div className="card">
                    <div className="card_details">
                        <div className="card_photo center circle">
                            <img src={data.picture.large} alt={data.name.first} />
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"  style={{background: [-800,439,577, 194]}} >
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                        </div>
                        <p className="card_title">Hi, My name is</p>
                        <p className="card_value">{data.name.first} {data.name.last}</p>
                    </div>
                    <div className="card_userdata">
                        <ul>
                            <li>{data.email}</li>
                            <li>{data.location.country}</li>
                        </ul>
                    </div>
                    <div className="card_social">
                        <a href="https://twitter.com/gndx">
                            <img src={Twitter} />
                        </a>
                        <a href="https://github.com/gndx">
                            <img src={Github} />
                        </a>
                        <a href="https://instagram.com/gndx">
                            <img src={Instagram} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="spinner">
                <Circles
                   type="Puff"
                   color="#00BFFF"
                   height={100}
                   width={100}
                   
                 />
            </div>
        )
    }
}

export default App;