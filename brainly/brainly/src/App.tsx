import './App.css'
import { Dashboard } from './components/Dashboard';
import { SignIn } from './components/SignIn';
import { Route , Routes ,BrowserRouter } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { SharedPage } from './components/SharedPage';
import { useState } from 'react';

function App() {  
  
      const [tweets , setTweets] = useState(true);
      const [ytvideos , setytvideos] = useState(true);

  return <div >
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/dashboard' element={<Dashboard ytvideos={ytvideos} tweets={tweets} setTweets={setTweets} setytvideos={setytvideos}  />}/>
        <Route path='/brain/:shareId' element={<SharedPage ytvideos={ytvideos} tweets={tweets} setTweets={setTweets} setytvideos={setytvideos} />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
