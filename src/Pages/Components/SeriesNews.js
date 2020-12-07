import React, {useState, useEffect} from 'react';
import NewsCards from '../../Components/NewsCards';
import axios from 'axios';
import he from 'he';

function SeriesNews(props) {    
    const [news, setNews] = useState([{},{},{},{}]);
    const [loaded, setLoaded] = useState(false);

    async function getNews() {
        
            axios.get('https://www.bdcrictime.com/wp-json/wp/v2/search?search='+props.series+'&_embed')
            .then((res)=> {  
                setNews(res.data);
                setLoaded(true);
            })
        
    }

    useEffect(() => {
        if(props.series) {
            getNews()
        }
    }, [props.series]);

    console.log(news);


    return (
        <>
            <div className="news-widget">
                {news[0] ? <>
                    <div className="row">
                    {news.map((news, index) =>
                        index < 3 ? 
                        <div key={index} className="col-lg-4 col-md-6">
                            <NewsCards format="boxed-down" headline={loaded ? news.title : null} /*thumbnail={loaded ? news._embedded['wp:featuredmedia'][0].source_url : null}*/ leadText={loaded ? news._embedded.self[0].acf.lead_text ? news._embedded.self[0].acf.lead_text : he.decode(news._embedded.self[0].excerpt.rendered.replace(/(<([^>]+)>)/gi, "")) : null} id={news.id} slug={news.slug}/>
                        </div>
                        : null
                    )}
                    </div>
                    {news.map((news, index) =>
                        index > 2 ?
                        <NewsCards key={index} format="boxed-side" headline={loaded ? news.title : null} /*thumbnail={loaded ? news._embedded['wp:featuredmedia'][0].source_url : null}*/ leadText={loaded ? news._embedded.self[0].acf.lead_text ? news._embedded.self[0].acf.lead_text : he.decode(news._embedded.self[0].excerpt.rendered.replace(/(<([^>]+)>)/gi, "")) : null} id={news.id} slug={news.slug}/>
                        : null
                    )}
                </> : <div style={{fontWeight:'bold', fontSize:'30px', color:'#cccccc', textAlign:'center', padding:'100px'}}>NO NEWS IN THIS CATEGORY</div>}
                {/* <div className="seemore-btn-inner">
                <Link to="" className="ld-more-btn">Load More</Link>
                </div> */}
            </div>
            
            {/* <div className="news-widget pb-0">
                <div className="title">
                    <div className="left">
                    <h6>Related News</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="row">
                        {news.map((news, index) =>
                        index > 1 ?
                            <NewsCards key={index} format="small-down" headline={loaded ? news.title.rendered : null} thumbnail={loaded ? news._embedded['wp:featuredmedia'][0].source_url : null} id={news.id} slug={news.slug} published={news.date}/>
                        : null)}
                    </div>
                    </div>
                </div>
            </div> */}

        </>
    );
}

export default SeriesNews;
