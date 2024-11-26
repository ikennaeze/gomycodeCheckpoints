import React, { useRef, useState } from 'react'
import movies from './Movies'
import { Button, Card } from 'react-bootstrap'
import { Dialog, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const MovieList = () => {
    const [movieList, setMovieList] = useState([movies[0], movies[1], movies[2], movies[3]])

    const movieTitle = useRef(null)
    const movieDesc = useRef(null)
    const movieRating = useRef(null)
    const moviePosterURL = useRef(null)

    const addMovieToList = () => {
        
        setMovieList([...movieList, {
            title: movieTitle.current.value, 
            description: movieDesc.current.value,
            rating: movieRating.current.value,
            posterURL: moviePosterURL.current.value
            }])

        }
    
    const filterMovies = (movie) => {
        return (
            movie.title == movieTitle.current.value ||
            movie.rating == movieRating.current.value
        )
    }
    
    const filterMovieList = () => {
        setMovieList(movieList.filter(filterMovies))
        console.log(movieList.filter(filterMovies))
    }

  return (
    <>
    <div className="flex flex-row space-x-8 justify-center mt-10">
    {movieList.map(movie => (
    <Card key={movie.title} className='flex flex-col items-center p-4 bg-[#d4dcdc] w-[20%] '>
        <Card.Img src={movie.posterURL} className="w-48 h-48"></Card.Img>
            <Card.Body className='flex flex-col items-center'>
                <Card.Title className="font-['poppins'] font-bold pt-4"><h2>{movie.title}</h2></Card.Title>
                <Card.Text>
                    <div className="text-center font-['roboto'] pt-4 pb-4">
                        <p>{movie.description}</p>
                        <p style={{fontFamily: 'roboto'}}><b>RATING:&nbsp;&nbsp;</b>{movie.rating}</p>
                    </div>
                </Card.Text>
                <Button className="w-[60%] bg-slate-400 p-2">LEARN MORE</Button>
            </Card.Body>
    </Card>
    ))}
    </div>

    <Popover className='flex flex-col items-center mt-8'>
    <PopoverButton className="bg-slate-400 p-4 hover:bg-slate-300">ADD MOVIE</PopoverButton>
    <PopoverPanel>
    <div className="flex flex-col items-center">
        <input type="text" placeholder='Title...' className='border-2 border-gray-400 rounded-xl p-2.5 mt-3 focus:outline-none focus:border-gray-500' ref={movieTitle} />
        <br/>
        <input type="text" placeholder='Description...' className='border-2 border-gray-400 rounded-xl p-2.5 mt-3 focus:outline-none focus:border-gray-500' ref={movieDesc} />
        <br/>
        <input type="text" placeholder='Rating...' className='border-2 border-gray-400 rounded-xl p-2.5 mt-3 focus:outline-none focus:border-gray-500' ref={movieRating} />
        <br/>
        <input type="text" placeholder='Poster URL...' className='border-2 border-gray-400 rounded-xl p-2.5 mt-3 focus:outline-none focus:border-gray-500' ref={moviePosterURL} />
        <br/>
        <button className="bg-gray-300 p-3 mt-4 active:bg-green-300" onClick={addMovieToList}>ADD MOVIE TO LIST</button>
    </div>
    </PopoverPanel>
    </Popover>
    
    <Popover className='flex flex-col items-center mt-4'>
    <PopoverButton className="bg-slate-400 p-4 hover:bg-slate-300">FILTER MOVIE</PopoverButton>
    <PopoverPanel>
    <div className="flex flex-col items-center">
        <input type="text" placeholder='Title...' className='border-2 border-gray-400 rounded-xl p-2.5 mt-3 focus:outline-none focus:border-gray-500' ref={movieTitle} />
        <br/>
        <input type="text" placeholder='Rating...' className='border-2 border-gray-400 rounded-xl p-2.5 mt-3 focus:outline-none focus:border-gray-500' ref={movieRating} />
        <br/>
        <button className="bg-gray-300 p-3 mt-4 active:bg-green-300" onClick={filterMovieList}>FILTER MOVIE LIST</button>
    </div>
    </PopoverPanel>
    </Popover>

    <div>

    </div>
    </>
  )
}

export default MovieList