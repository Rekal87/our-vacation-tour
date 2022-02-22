import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // when component loads, fetchtours is loaded after using useEffect
  const fetchTours = async () => {
    setIsLoading(true);

    try {
      // trying to fetch the api from url
      const response = await fetch(url);
      // converts the response to json
      const tours = await response.json();
      // sets the conditional rendering to false
      setIsLoading(false);
      // sets the data from the fetch into the statement
      setTours(tours);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // keeping a empty dependancy array to keep the useEffect from running more
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <>
        <main>
          <Loading />
        </main>
      </>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <>
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    </>
  );
}

export default App;
