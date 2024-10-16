import './App.scss'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ShowSwagger from './components/ShowSwagger'
import AddSwagger from './components/AddSwagger'

import { useLocalStorage } from 'usehooks-ts'
import { initSwaggers } from './features/swaggers/swaggerSlice'

import { useDispatch } from 'react-redux'

import { LOCAL_STORAGE_KEY } from './constants'

function App() {
  const [swaggers] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSwaggers(swaggers));
  }, [dispatch, swaggers])

  return (
    <>
      <header className='top-nav'>
        <h1>Swagger Saver</h1>
      </header>
      <main className="content">
        <div className='sidebar'>
          <AddSwagger />
          <Sidebar />
        </div >
        <div className='swagger-main'>
          <ShowSwagger />
        </div >
      </main>
      <footer>
        currently saving to local storage, key: {LOCAL_STORAGE_KEY}
      </footer>
    </>
  )
}

export default App
