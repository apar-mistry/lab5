import React, { useEffect, useState } from "react";
import "./ArticlesDisplay.css"; // Import the CSS file for custom styling
import { Pagination } from "react-bootstrap";

function ArticlesDisplay() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sortBy = sessionStorage.getItem("sortBy");
        const timePeriod = sessionStorage.getItem("timePeriod");

        if (!sortBy || !timePeriod) {
          setError("Invalid search parameters");
          return;
        }
        const url = `https://api.nytimes.com/svc/mostpopular/v2/${sortBy}/${timePeriod}.json?api-key=VXAoCintqQQCFSAG4qROBdOBFqMutYPN`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const numArticles = parseInt(sessionStorage.getItem("numArticles"), 10);
        const articlesData = data.results.slice(
          0,
          numArticles ? numArticles : data.results.length
        );
        setArticles(articlesData);
        setPageCount(Math.ceil(articlesData.length / itemsPerPage));
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = articles.slice(offset, offset + itemsPerPage);

  // if (error) return <p>Error: {error}</p>;
  if (!articles.length)
    return <p>No articles found or not enough parameters set.</p>;

  return (
    <div className="articles-container">
      <div className="articles-list">
        <div className="row">
          {currentItems.map((article, index) => (
            <div
              className="col-md-6 mb-3 d-flex align-items-stretch"
              key={article.id}
            >
              <div className="card article">
                <div className="row g-0">
                  <div className="col-md-4 position-relative">
                    <img
                      src={
                        article.media && article.media.length
                          ? article.media[0]["media-metadata"][2].url
                          : "path_to_default_image.jpg"
                      }
                      className="img-fluid rounded-start article-image"
                      alt="img"
                    ></img>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span>{offset + index + 1})</span> {article.title}
                      </h5>
                      <small className="text-muted">
                        {new Date(article.published_date)
                          .toISOString()
                          .split("T")[0]}
                      </small>
                      <p className="card-text">{article.abstract}</p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      <Pagination>
        {Array.from({ length: pageCount }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index === currentPage}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      </div>
    </div>

  );
}

export default ArticlesDisplay;
