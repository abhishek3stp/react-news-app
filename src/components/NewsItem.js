import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date } = props;

    return (
        <div className="my-3">
            <div className="card">
                <img src={imageUrl ? imageUrl : 'https://autosdutriomphe.fr/wp-content/uploads/2018/04/default-image.png'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="test-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
