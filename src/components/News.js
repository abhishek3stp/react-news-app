import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        handlePervClick();
        handleNextClick();
    }, []);

    const handlePervClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page - 1}&pageSize=${props.pageSize}`;
        setPage(page - 1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    const handleNextClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
    }

    return (
        <div className="container my-3">
            <h2 style={{ marginTop: '75px' }} >{capitalize(props.category)} Headlines</h2>
            {loading && <Spinner />}

            <div className="row">
                {!loading && articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                    </div>
                })}
            </div>

            <div className="d-flex justify-content-between my-5">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePervClick}>&#8249; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &#8250;</button>
            </div>
        </div >
    )
}

export default News;
