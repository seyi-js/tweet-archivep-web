import React, { useState } from 'react'
import './App.css';
import axios from 'axios';
const App = () => {

  const [state, setState] = useState({
    noTweet: false,
    tweets: [],
    skip: 0,
    limit: 100,
    search: 'tolu'
  });


  const onClick = async () => {
    try {

      const { search, skip, limit } = state
      const response = await axios.get(`https://endsars-archive.herokuapp.com/tweet/all?limit=${limit}&&skip=${skip}&&search=${search}`);

      if(response.data.length){
        setState({ ...state, tweets: response.data, noTweet:false });
      }else{
        setState({ ...state, tweets: [], noTweet:true });
      }

      

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="home-page">
      <form>
        <div>
          <label>From(skip how many tweets ?)</label>
          <input onChange={(e) => setState({...state,skip:e.target.value})} defaultValue={state.skip}  type='number' min='0' />
        </div>
        <div>
          <label>Limit(how many tweets should i return ?)</label>
          <input onChange={(e) => setState({...state,limit:e.target.value})} defaultValue={state.limit} type='number' min='0' />
        </div>
        <div>
          <label>Keyword(search keyword)</label>
          <input onChange={(e) => setState({...state,search:e.target.value})} defaultValue={state.search} type='text' />
        </div>

        <p className="note">NOTE: if you are using the search functionality, the service will make use of your skip and limit input. i.e you need to look for "tolu" ? and your skip value is "100" with limit of "200" the service will skip the first 100 tweets and query for the next 200 tweets then check for your keyword in the 200 and then return matching records of tweets containing the keyword and/or username containing the keyword. The DB contains over 200k tweets and trust me, you don't want to pull all at once. You can tho :) </p>

      </form>
      <p className="pull-data" onClick={()=> onClick()}>Pull Data</p>




      <div className="tweets">

        {state.tweets?.map((tweet, i) => (
          <div className="inner" key={i}>
            <h1> @{tweet.user}</h1>
            <h3>{tweet.tweet_text}</h3>

            {tweet.media_files?.map((file, i) => (
              <div className="media-files" key={i}>
                <a href={file.twitter_url}>file-{i}</a>
              </div>
            ))}

            <p>{tweet.tweet_create_time}</p>
          </div>
        ))}


      </div>

      {state.noTweet ? <div className="no-tweet-found">

        <p>No tweet or user related to the keyword was found.</p>

      </div> : null}
    </div>
  )
}

export default App
