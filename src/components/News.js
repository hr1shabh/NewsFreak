import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // document.title = `${this.capitilize(props.category)} - NewsFreak`

    const capitilize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
       props.setProgress(10);
        let url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
       props.setProgress(50);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
       props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        console.log("Hello");
        let url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
      //  setPage(page+1)
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };


   // console.log(props.apiKey);

        return (
            <>
            <h1 className='text-center' style={{margin: '35px 0px', marginTop : '90px'}}>NewsFreak Top {capitilize(props.category)} HeadLines</h1>
            {loading && <Spinner/>}
         <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className='container' >
            <div className='row'>
            {articles.map((element) => {
               // console.log(this.state.articles)
                return <div className='col-md-4' key = {element.url}>
                <NewsItem author = {element.author} date = {element.publishedAt} title = {element.title} description = {element.description} imageUrl = {element.urlToImage} Url = {element.url} source = {element.source.name} />   
                </div>
            })}
            </div>
            </div>
            </InfiniteScroll>

            </>
        )
    }

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News