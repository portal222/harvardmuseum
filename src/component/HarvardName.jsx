import React, { useEffect, useState } from "react";
import axios from 'axios'
import Images from "./Images";
import Search from "./Search";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const HarvardName = () => {

    const [harvard, setHarvard] = useState([]);
    const [page, setPage] = useState(1);
    const [totalArt, setTotalArt] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const params = useParams()
    const personName = params.personName;

    useEffect(() => {
        getArticle(personName, page);
    }, [personName, page]);

    const getArticle = async (personName, page) => {
        const url = `https://api.harvardartmuseums.org/object?person="${personName}"&apikey=82a33bda-6f09-4cd2-9e11-1634f72585af&page=${page}`;

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

    const handleClick = (personName) => {
        const LinkTo = `/harvardResult/${personName}`;
        navigate(LinkTo);
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
                    <h2>{totalArt} results for name {personName}</h2>
                </div>
                <div className="result">
                    <Search />
                </div>
            </div>
            <div className="harvard">
                <hr></hr>
            </div>
            {harvard.map(har => (
                <>
                    <div key={har.id}
                        className="harvard">
                        <div className="harImg">
                            <Images har={har} />
                            <p className="title">
                                {har.title}
                            </p>
                            <div className="nameCulture">
                                <p className="name"
                                    onClick={() => {
                                        handleClick(har.people?.[0].name);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}>
                                    {har.people?.[0].name}
                                </p>
                                <div style={{ display: "flex" }}>
                                    {har.culture && (
                                        <p className="culture">
                                            {har.culture + " "}
                                        </p>
                                    )}
                                    {har.people?.[0].displaydate && (
                                        <p className="culture">
                                            {" (" + har.people?.[0].displaydate + ") "}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="harText">
                            {har.division && (
                                <h2>
                                    {har.division}
                                </h2>
                            )}
                            {har.department && (
                                <h2>
                                    {har.department}
                                </h2>
                            )}
                            {har.century && (
                                <h2>
                                    {har.century}
                                </h2>
                            )}
                            {har.dated && (
                                <h2>
                                    dated:  {" (" + har.dated + ")"}
                                </h2>
                            )}
                            {har.technique && (
                                <h2>
                                    {har.technique}
                                </h2>
                            )}
                            {har.medium && (
                                <h2>
                                    {har.medium}
                                </h2>
                            )}
                            {har.dimensions && (
                                <p>
                                    {har.dimensions}
                                </p>
                            )}
                            <div className="colorGrid">
                                {har.colors?.map((col, id) => (
                                    <div key={id}>
                                        <p style={{ backgroundColor: `${col.color}` }}
                                            className="color"
                                            onClick={() => {
                                                navigator.clipboard.writeText(col.color)
                                            }}>
                                        </p>
                                        <p>
                                            {col.hue}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {har.people?.[1]?.name && (
                                <p className="label">
                                    {har.people?.[1]?.role + " " + har.people?.[1]?.name + " (" +
                                        har.people?.[1]?.displaydate + ")"}
                                </p>
                            )}
                            {har.people?.[2]?.name && (
                                <p className="label">
                                    {har.people?.[2]?.role + " " + har.people?.[2]?.name + " (" +
                                        har.people?.[2]?.displaydate + ")"}
                                </p>
                            )}
                            {har.labeltext && (
                                <p className="label">
                                    {har.labeltext}
                                </p>
                            )}
                            {har.creditline && (

                                <p className="credit">
                                    {har.creditline}
                                </p>
                            )}
                        </div>
                    </div >
                    <div className="harvard">
                        <hr></hr>
                    </div>
                </>
            ))
            }
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
export default HarvardName;