import React, { useEffect, useState } from 'react';

function ArticlesDisplay() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sortBy = sessionStorage.getItem('sortBy');
                const timePeriod = sessionStorage.getItem('timePeriod');
                const numArticles = parseInt(sessionStorage.getItem('numArticles'), 10);

                if (!sortBy || !timePeriod || !numArticles) {
                    setError("Invalid search parameters");
                    return;
                }
                const url = `https://api.nytimes.com/svc/mostpopular/v2/${sortBy}/${timePeriod}.json?api-key=VXAoCintqQQCFSAG4qROBdOBFqMutYPN`;
                console.log(url)
                const response = await fetch(url);
                console.log(response)
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setArticles(data.results.slice(0, numArticles));
                console.log(data.results.slice(0, numArticles))
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!articles.length) return <p>No articles found or not enough parameters set.</p>;

    return (
       <div>
        {articles.map((article, index) => (
         <li className="card mb-3 article">
                <div className="row g-0">
                    <div className="col-md-2 position-relative">
                        <img src="article.media && article.media.length > 0 && article.media[0]['media-metadata'] && article.media[0]['media-metadata'].length > 0 ? article.media[0]['media-metadata'][0].url : '' " className="img-fluid rounded-start article-image" alt="Article Image"></img>
              </div>
              <div className="col-md-10">
                <div className="card-body">
                  <h5 className="card-title"><span>{index + 1})</span> {article.title}</h5>
                  <p className="card-text">${article.abstract}</p>
                  <small className="text-muted">${new Date(article.published_date).toISOString().split('T')[0]}</small>
                </div>
              </div>
            </div>
          </li>
        ))}
        </div>
    );
}

export default ArticlesDisplay;
