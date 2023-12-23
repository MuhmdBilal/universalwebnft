import Slider from "react-slick";

const GameFeatures = () => {

    const features = [
        {
          title: "Augmented Reality",
          description: "Bring home your favourite characters and see them in action with accessories of your choice.",
          image: "augment_reality.webp",
        },
        {
          title: "NFT Gallery",
          description: "Our characters walks you through your NFT Collections in the in-game gallery.",
          image: "nft_gallery.webp",
        },
        {
          title: "NFT market",
          description: "Market Place allows users to sell and purchase in-game accessories & NFTs of their choice.",
          image: "nft_market.webp",
        },
        {
          title: "Animated TV Series",
          description: "Know more about the Maps and Characters in our Animated series. Enjoy the story; live the game.",
          image: "animated_tv_series.webp",
        },
        {
          title: "1 vs 1 FreeToPlay",
          description: "FreeToPlay and play to earn 1 vs 1 story driven shooting game.",
          image: "1vs1_free_to_play.webp",
        },
        {
          title: "Rewards and AirDrops",
          description: "Get rewarded for every win as well as time spend on the game.",
          image: "rewards_and_air_drops.webp",
        },
    ];

    const settings = {
        infinite: true,
        slidesToShow: 3,
        swipeToSlide: true,
        dots:true,
        autoplay: true,
        arrows:false,
        responsive: [
            {
                breakpoint: 1159,
                settings: {
                  slidesToShow: 2
                }
            },
            {
              breakpoint: 766,
              settings: {
                slidesToShow: 1
              }
          },
        ]
    };

    return(
        
        <div className="container">
            <div className="panel">
                <h2 className="orange text-center">Game features</h2>
                <div className="row">
                    <div className="col-9 col-xxs-12">

                        <Slider {...settings}>
                            {features.map((item,index) => (
                                <div key={index} className="item">
                                    <img alt={item.title} src={"/images/features/" + item.image} />
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </Slider>

                    </div>
                    <div className="col-3 col-xxs-12 relative">
                        <img className="bg" alt="Game features" src="/images/characters/universe_island_character_4.webp" />
                        <div className="glow orange"></div>
                    </div>
                </div>
            </div>
        </div>
    )

} 

export default GameFeatures;