import React, { useContext,useEffect,useState } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {


    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input,newChat } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini 2.0</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Welcome!</span></p>
                            <p>How can I assist you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => onSent('What are the co-ordinates of New York City?')}>
                                <p>What are the co-ordinates of New York City?</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent('Generate a speecn on AI.')}>
                                <p>Generate a speech on AI.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent('What is muscle hypertrophy?')}>
                                <p>What is muscle hypertrophy?</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent('What is Linux and why is it used?')}>
                                <p>What is Linux and why is it used?</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>

                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Ask me anything...' />
                        <div>
                            <img src={assets.plus_icon} onClick={() => newChat()} alt="" />
                            {input ?
                                <img onClick={() => onSent()} src={assets.send_icon} className='send' alt="" />
                                : null
                            }
                        </div>
                    </div>
                    <p className='bottom-info'>Gemini may display inaccurate info so double-check its responses.<br/>Developed by <a href='https://sakshamverma.netlify.app' > <b>Saksham Verma</b></a> .</p>
                </div>
            </div>
        </div>
    )
}

export default Main