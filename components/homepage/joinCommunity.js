import BouncingArrow from "../bouncingArrow";
import SocialNetworks from "../socialNetworks";

const JoinCommunity = ({color}) => {

    return(
        
        <div className="container text-center">
            
            <h2 className={"text-center " + color}>Join to official community</h2>
            
            <BouncingArrow color={color} />
            <SocialNetworks size="big" align={"center"} />

            {color == "green" ?
                <img className="bg" src={"/images/characters/universe_island_character_3.webp"} />
            :null}
            {color == "orange" ?
                <img className="bg house" src={"/images/characters/universe_island_character_house.webp"} />
            :null}

            <div className={"glow " + color}> </div>
        </div>
        
    )
}

export default JoinCommunity;