import { Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';
import HarvardResult from './HarvardResult';
import logo from '../assets/harvardLogo.png';
import HarvardVideo from './HarvardVideo';
import HarvardName from './HarvardName';

const Navigation = () => {

    return (
        <>
            <HashRouter basename="/">
                <div className='provider'>
                    <NavLink to="/">
                        <div className='logo'>
                            <img src={logo} alt=''
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                        </div>
                    </NavLink>
                    <NavLink to="/" className='navlink'>

                        <div className='title'
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Harvard Art Museums
                        </div>
                    </NavLink>
                </div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/museum' element={<HarvardResult />} />
                    <Route path='/video' element={<HarvardVideo />} />
                    <Route path='/harvardResult/:personName' element={<HarvardName />} />
                </Routes>
                <div className='harvard'>
                    <div style={{ height: "200px" }}></div>
                    <div className='footer'>
                        ©® Harvard Art Museum
                        <br></br>
                        Developer: InTerVal
                    </div>
                </div>
            </HashRouter>
        </>
    )
}
export default Navigation;