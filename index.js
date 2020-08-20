const autocompleteconfig={
  renderOption(movie){
    const imgsrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return  `
    <img src="${imgsrc}"/>
    <h1>${movie.Title}</h1> (${movie.Year})
     `},
    
  inputvalue(movie){
      return movie.Title;
    },
  async fetch (search){
      const res=await axios.get("http://www.omdbapi.com/",{
        params:{
          apikey:'cb4ad64a',
          s:search
        }
      });
      if(res.data.Error){
        return [];
      }
      return (res.data.Search) 
    }
}

autocomplete({
  ...autocompleteconfig,
  root:document.querySelector('#left-autocomplete'),
  onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie,document.querySelector('#left-summary'),'left');
  }
});
autocomplete({
  ...autocompleteconfig,
  root:document.querySelector('#right-autocomplete'),
  onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie,document.querySelector('#right-summary'),'right');
  }
});

/*on cicking any movie anchor*/
let left;
let right;
const onMovieSelect = async (movie,summary,side) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "cb4ad64a",
      i: movie.imdbID,
    },
  });
  summary.innerHTML=movietempate(res.data);
  if(side==="left"){
    left=res.data
  }
  else{
    right=res.data
  }
  if(left&&right){
    runcomp();
  }
};
/*---------------- */
/*run comparision*/
const runcomp=()=>{
  const leftsts=document.querySelectorAll('#left-summary .notification')
  const rightsts=document.querySelectorAll('#right-summary .notification')
  leftsts.forEach((lsts,index)=>{
    const rsts=rightsts[index]
    const lval=lsts.dataset.value;
    const rval=rsts.dataset.value;
    lsts.classList.remove('is-primary')
    rsts.classList.remove('is-primary')
    if(rval>lval){
      rsts.classList.add('is-success')
      lsts.classList.add('is-danger')
      r=r+1;
    }
    else{  
      lsts.classList.add('is-success')
      rsts.classList.add('is-danger')
      l=l+1;
    }
  });
}
/*------------*/

/*movie template returning after click*/
const movietempate = (moviedetail) => {
  const dollar=parseInt(moviedetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
  const meta=parseInt(moviedetail.Metascore);
  const imdbrating=parseFloat(moviedetail.imdbRating);
  const awards=moviedetail.Awards.split(' ').reduce((prev,word)=>{
    const value=parseInt(word);
    if(isNaN(value)){
      return prev;
    }
    else{
      return prev+value;
    }
  },0);
  return `
  <article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${moviedetail.Poster}"></img>
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h1>${moviedetail.Title}</h1>
      <h4>${moviedetail.Genre}</h4>
      <p>${moviedetail.Plot}</p>
    </div>
  </div>
</article>;
<article data-value="${dollar} " class="notification is-primary">
<p class="title">${moviedetail.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>
<article data-value="${meta} " class="notification is-primary">
<p class="title">${moviedetail.Metascore}</p>
<p class="subtitle">Meta score</p>
</article>
<article data-value=" ${imdbrating}" class="notification is-primary">
<p class="title">${moviedetail.imdbRating}</p>
<p class="subtitle">IMDB</p>
</article>
<article data-value="${awards} " class="notification is-primary">
<p class="title">${moviedetail.Awards}</p>
<p class="subtitle">Awards</p>
</article>
`;
};
/*---------------- */




