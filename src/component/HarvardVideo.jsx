import React, { useEffect, useState } from "react";
import Search from "./Search";
import Loader from "./Loader";
import axios from 'axios'

const HarvardVideo = () => {
    const [harvard, setHarvard] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [totalArt, setTotalArt] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticle(page);
    }, [page]);

    const getArticle = async (page) => {
        const url = `https://api.harvardartmuseums.org/video?apikey=82a33bda-6f09-4cd2-9e11-1634f72585af&page=${page}`;

        try {
            const response = await axios.get(url);
            const data = response
            setIsLoading(false);
            setHarvard(data.data.records);
            setTotalArt(data.data.info.totalrecords);

        } catch (err) {
            setError(err);
        }
    }

    const totalPages = Math.ceil(totalArt / 10);

    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <div className="harvard">
                <div className="result">
                    <h2>videos produced by and associated with the Harvard Art Museums</h2>
                </div>
                <div className="result">
                    <Search />
                </div>
            </div>
            <div className="harvard">
                <hr></hr>
            </div>
            {harvard.map(har => {
                const url = har.primaryurl;
                const videoId = url.split("/").pop();
                return (
                    <>
                        <div key={har.id}
                            className="harvard">
                            <div className="description">
                                <h2 >
                                    {har.description}
                                </h2>
                                <p>
                                    last update {har.lastupdate}
                                </p>
                            </div>
                            <div className="video">
                                <iframe
                                    className="videoIf"
                                    src={`https://player.vimeo.com/video/${videoId}`}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <div className="harvard">
                            <hr></hr>
                        </div>
                    </>
                )
            })}
            <div className="artNum">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div className={page === i + 1 ? 'numbAct' : 'numb'}
                        key={i + 1}
                        onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </>
    )
}
export default HarvardVideo;