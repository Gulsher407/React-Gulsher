import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';

export default function NewsBoard({ category }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container-fluid">
            <h2 className='text-center'>Latest <span className=' bg-danger badge'>News</span></h2>     
             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {articles.map((news, index) => (
                    <div key={index} className="col">
                        <NewsItems
                            title={news.title}
                            description={news.description}
                            src={news.urlToImage}
                            url={news.url}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
