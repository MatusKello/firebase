import { projectFirestore } from './firebase/config';
import { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  //useState for form
  const [movieTitle, setMovieTitle] = useState('');
  const [movieAge, setMovieAge] = useState(null);
  const [movieTime, setMovieTime] = useState(null);

  useEffect(() => {
    const unsubscribe = projectFirestore.collection('movies').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No films to show');
          setData([]);
        } else {
          let result = [];
          snapshot.docs.forEach((oneMovie) => {
            result.push({ id: oneMovie.id, ...oneMovie.data() });
          });
          setData(result);
          setError('');
        }
      },
      (err) => {
        setError(err.message);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const deleteMovie = (id) => {
    projectFirestore.collection('movies').doc(id).delete();
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const newMovie = { title: movieTitle, minage: movieAge, time: movieTime };
    try {
      await projectFirestore.collection('movies').add(newMovie);
      setMovieTitle('');
      setMovieAge('');
      setMovieTime('');
    } catch (err) {
      setError('Film was not added' + err.message);
    }
  };

  return (
    <div className='all-movies'>
      <form className='form' onSubmit={submitForm}>
        <input
          className='input'
          value={movieTitle}
          type='text'
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder='Name of the film'
        />
        <input
          className='input'
          value={movieAge}
          type='number'
          onChange={(e) => setMovieAge(e.target.value)}
          placeholder='Minimum age'
          min='0'
        />
        <input
          className='input'
          value={movieTime}
          type='number'
          onChange={(e) => setMovieTime(e.target.value)}
          placeholder='Lenght'
          min='0'
        />
        <input type='submit' value='Add' />
      </form>
      {error && <p>{error}</p>}
      {data.map((oneMovie) => {
        const { id, title, time, minage } = oneMovie;
        return (
          <div className='one-movie' key={id}>
            <p>
              {title}, {time} minutes, {minage}+
            </p>
            <button
              onClick={() => {
                deleteMovie(id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
