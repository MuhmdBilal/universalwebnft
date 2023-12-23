import Slider from "react-slick";

const InTheNews = ({hData}) => {

    const settings = {
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        dots:true,
        autoplay: true,
        arrows:false,
        responsive: [
            {
                breakpoint: 1359,
                settings: {
                  slidesToShow: 4
                }
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 949,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1
              }
            },
        ]
    };

    return(
        
        <div className="container">
            <h2 className="yellow text-center">In the news</h2>
            
              <Slider {...settings}>
                  {hData.allNews.map((item,index) => (
                      <div key={index} className="item">
                        <a target="_blank" href={item.url} key={index}>
                            <img className="news" alt={item.title} src={"/api/news/stredni_" + item.photo} />
                            <h3>{item.title}</h3>
                            <span dangerouslySetInnerHTML={{__html:item.text}}></span>
                        </a>
                      </div>
                  ))}
              </Slider>
           
            <div className="glow yellow"></div>
        </div>
    )
}

export default InTheNews;