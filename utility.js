
/*debounce*/
const debounce =(func,delay=1000)=>{
    let timeid;
    return (...arg)=>{
      if(timeid){
        clearTimeout(timeid);
      }
      timeid=setTimeout(() => {
        func.apply(null,arg);
      }, delay);
    }
  }
  /*---------------------*/