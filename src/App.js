import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query, useQuery } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://ion-movies.herokuapp.com/",
});

const NOW_QUERY = gql`
  query {
    nowPlaying {
      count
      page
      movies {
        id
        title
        original_title
        original_language
        overview
        video
        poster_path
        backdrop_path
        popularity
        adult
        vote_count
        vote_average
        release_date
      }
    }
  }
`;

const DETAIL_QUERY = gql`
  query {
    details(movieId: 337401) {
      id
      title
      original_title
      original_language
      overview
      video
      poster_path
      backdrop_path
      popularity
      adult
      vote_count
      vote_average
      release_date
    }
  }
`;

function App() {
  const { data } = useQuery({ query: NOW_QUERY });
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  }, []);

  return (
    <ApolloProvider client={client}>
      <header>
        <h1>The Movies</h1>
      </header>

      {/* {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))} */}

      <Query query={NOW_QUERY}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return "Loading...";
          if (error) return "Error";
          console.log(data.nowPlaying.movies);
          return (
            <>
              <div className="movie-container">
                {data.nowPlaying.movies.map((item) => (
                  <Movie key={item.id} {...item} />
                ))}
              </div>
              <button
                onClick={() => {
                  const { endCursor } = data.nowPlaying.page;

                  fetchMore({
                    variable: { after: endCursor },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      fetchMoreResult.nowPlaying.movies = [
                        ...prevResult.nowPlaying.movies,
                        ...fetchMoreResult.nowPlaying.movies,
                      ];
                      return fetchMoreResult;
                    },
                  });
                }}
              >
                More
              </button>
            </>
          );
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;
