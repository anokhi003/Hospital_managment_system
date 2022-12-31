import classes from '../../css/PageLoader.module.css'

const PageLoader = () => {
    return ( 
        <div className={classes.heartbeatloader}>
        <svg className={classes.svgdraw} width="100%" height="100%" viewBox="0 0 150 400" xmlns="http://www.w3.org/2000/svg" >
            <path className="path" d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0" fill="transparent" strokeWidth="4" stroke="black"/>
        </svg>
        <div className={classes.innercircle}></div>
        <div className={classes.outercircle}></div>
    </div>
     );
}
 
export default PageLoader;