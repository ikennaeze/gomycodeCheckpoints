import React from 'react'
import movies from '../Movies'

let moviePageArray = [{}]
const makeMoviePages = () => {
    let i = 0;
    while(i < movies.length){
        moviePageArray[i] = (
            <>
                <div>
                    <a href='/' className="absolute left-0 top-4 text-[16pt] hover:underline hover:text-gray-400 font-['poppins']"><span class="material-symbols-outlined align-middle">arrow_back_ios</span>Home</a>
                    <h1 className="text-center text-[40pt] font-bold font-['poppins']">{movies[i].title}</h1>
                    <p className="text-center text-[20pt] font-['roboto']">{movies[i].description}</p>
                    <p className="text-center text-[30pt] mt-20 font-['roboto']">TRAILER:</p>
                    <div className="flex justify-center"><iframe width="560" height="315" src={movies[i].tralierEmbed} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
                </div>
            </>
        )
        i++
    }
}

 makeMoviePages()


export default moviePageArray