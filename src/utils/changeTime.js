export default function(time){
    let seconds = parseInt((time/1000)%60);
    let minutes = parseInt((time/1000)/60);
    let res="";
    if(minutes<10){
        res = res.concat("0")
    }
    res=res.concat(minutes);
    res=res.concat(":")
    if(seconds<10){
        res = res.concat("0")
    }
    res=res.concat(seconds);
    return res;
}