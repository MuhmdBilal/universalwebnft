import { useEffect,useRef,useState } from "react";

const PageSidePanel = ({children,clName}) => {

    const ref = useRef();
    const panelRef = useRef();
    const [isFixed, SetIsFixed] = useState(false);
    const [isAbsolut, SetIsAbsolut] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll",OnScroll);
        return () => {
            window.removeEventListener("scroll",OnScroll);
        }

    },[isFixed,isAbsolut])

    const OnScroll = () => {

        if(window.scrollY > ref.current.offsetTop - 10 && !isFixed)
            SetIsFixed(true);

        if(window.scrollY <= ref.current.offsetTop - 10 && isFixed)
            SetIsFixed(false);

        if(panelRef.current.offsetHeight < ref.current.offsetHeight && ref.current.offsetHeight - (panelRef.current.offsetHeight - ref.current.offsetTop + 10) <= window.scrollY && !isAbsolut)
            SetIsAbsolut(true);

        if(ref.current.offsetHeight - (panelRef.current.offsetHeight - ref.current.offsetTop + 10) > window.scrollY && isAbsolut)
            SetIsAbsolut(false);
    }

    return(
        <div ref={ref} className={"relative d-flex justify-content-end" + (isFixed ? " h-100" : "")}>
            <div ref={panelRef} className={"page-side-panel text-center " + (clName ? clName : "") + (isAbsolut ? " absolute" : (isFixed ? " fixed" : ""))}>
                {children}
            </div>
        </div>
    )
}

export default PageSidePanel;