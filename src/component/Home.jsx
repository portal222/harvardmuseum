import React from "react";
import Search from "./Search";
import museum from "../assets/museum.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();


    const clickVideo = () => {
        const LinkTo = `/video`;
        navigate(LinkTo);
    }

    return (
        <>
            <div className="harvard">
                <img src={museum} alt=" " className="homeImg"/>
            </div>
            <div className="harvard">
                <div className="welcome">
                    WELCOME <br></br>
                    The museums has about 250,000 items.
                    You can search by author, or by work title. For a more precise search use quotation marks. You can also use an asterisk * after or before a few letters for things you're not sure how to spell.
                    <br></br>
                    <br></br>     <Search />
                    <br>
                    </br>
                    Each image has a color palette, which you can copy to the clipboard by clicking on it.
                    <br></br>
                    Harvard Art Museums also have their own videos, made in-house.
                    <br></br>
                    <br></br>
                    <p className="button"
                        onClick={() => {
                            clickVideo();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        video
                    </p>
                </div>
            </div>



        </>
    )

}
export default Home;