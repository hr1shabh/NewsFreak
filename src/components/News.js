import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {


    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitilize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        
        this.state = {
            articles : [],
            loading : false,
            loading : true,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitilize(this.props.category)} - NewsFreak`
    }

    async componentDidMount(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize }`;
        this.setState({loading : true})
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json()
        console.log(parsedData);
        console.log("this inside");
        this.setState({articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading : false
        });
        this.props.setProgress(100);
    }
    
    // handleNextClick = async () =>{
    //     this.props.setProgress(10);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize }`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     this.props.setProgress(50);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({articles : parsedData.articles,
    //     page : this.state.page+1,
    //     loading : false
    //     });      
    //     this.props.setProgress(100);
    // }

    // handlePrevClick = async () =>{
    //     this.props.setProgress(10);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pageSize }`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     this.props.setProgress(50);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({articles : parsedData.articles,
    //     page : this.state.page-1,
    //     loading : false
    //     });   
    //     this.props.setProgress(100);
    // }
    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        console.log("Hello");
        let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize }`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles : this.state.articles.concat(parsedData.articles),
        totalResults : parsedData.totalResults,
        });
      };


   // console.log(this.props.apiKey);
    render() {
        return (
            <>
            <h1 className='text-center'>NewsFreak Top {this.capitilize(this.props.category)} HeadLines</h1>
            {this.state.loading && <Spinner/>}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className='container' >
            <div className='row'>
            {this.state.articles.map((element) => {
               // console.log(this.state.articles)
                return <div className='col-md-4' key = {element.url}>
                <NewsItem author = {element.author} date = {element.publishedAt} title = {element.title} description = {element.description} imageUrl = {element.urlToImage} Url = {element.url} source = {element.source.name} />   
                </div>
            })}
            </div>
            </div>
            </InfiniteScroll>


            {/* <div className='container d-flex justify-content-between'>
            <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick }> &larr; Previous</button>
            <button type='button' disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
            </>
        )
    }
}

export default News
