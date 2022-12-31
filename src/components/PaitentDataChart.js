import {  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classes from '../css/PaitentDataChart.module.css';

const PaitentDataChart = () => {

    const data = [
        {
          name: 'Jan',
          uv: 400,
          pv: 240,
          amt: 2400,
        },
        {
          name: 'Feb',
          uv: 300,
          pv: 139,
          amt: 2210,
        },
        {
          name: 'Mar',
          uv: 200,
          pv: 980,
          amt: 2290,
        },
        {
          name: 'Apr',
          uv: 278,
          pv: 390,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 189,
          pv: 440,
          amt: 2181,
        },
        {
          name: 'Jun',
          uv: 239,
          pv: 380,
          amt: 2500,
        },
        {
          name: 'Jul',
          uv: 409,
          pv: 400,
          amt: 2100,
        },
        {
          name: 'Aug',
          uv: 344,
          pv: 360,
          amt: 2100,
        },
        {
          name: 'Sep',
          uv: 349,
          pv: 340,
          amt: 2100,
        },
        {
          name: 'Oct',
          uv: 329,
          pv: 400,
          amt: 2100,
        },
        {
          name: 'Nav',
          uv: 359,
          pv: 390,
          amt: 2100,
        },
        {
          name: 'Dec',
          uv: 389,
          pv: 410,
          amt: 2100,
        },
      ];
      // get all years object and make list

    const generateObjectOfYears = () => {
        var max = new Date().getFullYear();
        var min = max-10 ;
        var years= []

        for( var i=max ; i>=min ; i--){
            years.push(i);
        }
        return years;
    }
    const Years =  generateObjectOfYears();
    console.log(Years)
    return (  
        <div className={classes.chart}>
            <div className={classes.chartTitle}>
                <h4>Patient Status</h4>
                <select className={classes.selectYr}>
                   { Years.map((yr) => {
                       return <option key={yr} className={classes.optionYr}>{yr}</option> 
                   }
                  )}
               
                </select>

            </div>
            <div className={classes.chart_container}>
                <ResponsiveContainer width='100%' aspect={3} >
          <AreaChart data={data} >
            <defs>
                <linearGradient id="color" x1='0' y1='0' x2='0' y2='1'>
                    <stop  offset="0%" stopColor='#005BE7' stopOpacity={0.6}/>
                    <stop  offset="85%" stopColor='#005BE7' stopOpacity={0.04}/>

                </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} strokeDasharray="5 5" version='#005BE7'/>
    
            <XAxis dataKey="name"  axisLine={false} tickLine={false} tickCount={12} tick={{fill: '#BCBCBC'}}/>
            <YAxis  axisLine={false} tickLine={false} tickCount={5} tick={{fill: '#BCBCBC'}} domain={[0,1000]}ticks={[200,400,600,800,1000]}/>
            <Tooltip />
          
            <Area type="monotone" dataKey="pv" stroke="#005BE7" strokeWidth={3} fill="url(#color)" />
            <Area type="monotone" dataKey="uv" stroke="#82CEEF" strokeWidth={3} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
            </div>
            <div className={classes.chartScale}>
                <div className={`${classes.chartScale} ${classes.space}`}>
                    <div className={classes.darkblueBox}></div>
                    <p>Recovered</p>    
                </div>
                <div className={`${classes.chartScale} ${classes.space}`}>
                    <div className={classes.blueBox}></div>
                    <p>Death</p>    
                </div>
            </div>
             
        </div>

    );
}
 
export default PaitentDataChart;