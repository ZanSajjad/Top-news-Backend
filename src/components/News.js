import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";


export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const apikey = process.env.REACT_APP_NEWS_API;

  // Use useCallback to memoize the updateNews function

  const updateNews = useCallback(async () => {
    const url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&apiKey=${apikey}&page=${page}&pageSize=${props.pagesize}`;
    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      if (parsedData.status === "ok") {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setError(null);
      } else {
        setError("API request failed: " + parsedData.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  }, [page, props.category, props.pagesize, apikey]); // Add dependencies

  useEffect(() => {
    updateNews();
    window.scrollTo(0, 0);
  }, [updateNews]);

  const handleNext = () => {
    if (page < Math.ceil(totalResults / props.pagesize)) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };



  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{ marginTop: "4rem" }}>
        News Top-Headlines
      </h1>
      {loading && <Spinner />}

      <div className="row">
        {error ? (
          <div className="col-12 text-center text-danger">{error}</div>
        ) : (
          articles.map((element) => (
            <div className="col-lg-4 col-md-6" key={element.url}>
              <NewsItem 
                title={element.title ? element.title : "undefined"}
                description={element.description}
                img={element.urlToImage}
                imgUrl={element.url}
                posted={element.publishedAt}
                source={element.source.name}
                mode={props.mode}
              />
            </div>
          ))
        )}
      </div>

      {!loading && !error && (
        <div className="d-flex justify-content-between w-100 fw-bold my-5 container " >
          <button
            className="btn btn-lg btn-primary p-2 font-xl"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-lg btn-primary px-3"
            onClick={handleNext}
            disabled={page >= Math.ceil(totalResults / props.pagesize)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
