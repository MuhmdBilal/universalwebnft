const BouncingArrow = ({color}) => {
   
    const stroke = color === "green" ? "rgb(0,227,124)" : "rgb(222,167,19)";

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width="500"
            height="500"
            style={{ width: "100px", height: "100px" }}>
            <defs>
                <clipPath id="__lottie_element_21">
                <rect width="500" height="500" x="0" y="0"></rect>
                </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_21)">
                <g transform="matrix(1,0,0,1,117.40400695800781,222.62989807128906)" opacity="1">
                <g opacity="1" transform="matrix(1,0,0,1,132.5959930419922,101.95500183105469)">
                    <path
                    className="bounce-animate"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                    stroke={stroke}
                    strokeOpacity="1"
                    strokeWidth="30"
                    d=" M57.59600067138672,-26.954999923706055 C57.59600067138672,-26.954999923706055 -0.0010000000474974513,26.954999923706055 -0.0010000000474974513,26.954999923706055 C-0.0010000000474974513,26.954999923706055 -57.59700012207031,-26.954999923706055 -57.59700012207031,-26.954999923706055"></path>
                </g>
                </g>
                <g transform="matrix(1,0,0,1,177.40399169921875,211.26499938964844)" opacity="0.8">
                <g opacity="1" transform="matrix(1,0,0,1,72.59600067138672,41.95500183105469)">
                    <path
                    className="bounce-animate"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                    stroke={stroke}
                    strokeOpacity="1"
                    strokeWidth="30"
                    d=" M57.59600067138672,-26.954999923706055 C57.59600067138672,-26.954999923706055 -0.0010000000474974513,26.954999923706055 -0.0010000000474974513,26.954999923706055 C-0.0010000000474974513,26.954999923706055 -57.59700012207031,-26.954999923706055 -57.59700012207031,-26.954999923706055"></path>
                </g>
                </g>
                <g transform="matrix(1,0,0,1,177.40399169921875,140.77423095703125)" opacity="0.5">
                <g opacity="1" transform="matrix(1,0,0,1,72.59600067138672,41.95500183105469)">
                    <path
                    className="bounce-animate"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                    stroke={stroke}
                    strokeOpacity="1"
                    strokeWidth="30"
                    d=" M57.59600067138672,-26.95599937438965 C57.59600067138672,-26.95599937438965 -0.0010000000474974513,26.95599937438965 -0.0010000000474974513,26.95599937438965 C-0.0010000000474974513,26.95599937438965 -57.59700012207031,-26.95599937438965 -57.59700012207031,-26.95599937438965"></path>
                </g>
                </g>
            </g>
        </svg>

    );
    
}

export default BouncingArrow;