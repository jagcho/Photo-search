import React, { useEffect, useState } from 'react'
import axios from 'axios';


function SearchPhotos() {
  let count = 1;
  const [query, setQuery] = useState("");
  const clientId = "d_ke_MmkSzl2FTU_b9xH2Z4H9ewPtemSqT0vVDqByN8"
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1)

  const searchPhotos = async (e) => {
    e.preventDefault();
    const url = `https://api.unsplash.com/search/photos?page=1&query=` + query + "&client_id=" + clientId;
    axios.get(url)
      .then((response) => {
        console.log(response)
        setResult((prev) => [...prev, ...response.data.results]);
      })
  };

  const sarchPhotos = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=` + query + "&client_id=" + clientId;
    axios.get(url)
      .then((response) => {
        console.log(response)
        setResult((prev) => [...prev, ...response.data.results]);
      })
  };

  useEffect(()=>{
    sarchPhotos()
  },[page])

  const handleInfiniteScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight) {
        setPage((prev) => prev + 1);
        sarchPhotos()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [])


  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      {result.map((query) => (
        <img src={query.urls.small} />
      ))}
    </>
  )
}

export default SearchPhotos