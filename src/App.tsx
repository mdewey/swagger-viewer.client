import './App.scss'
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
  dispatch(initSwaggers(swaggers));

  return (
    <>
      <h1>Swagger Saver</h1>
      <Sidebar />
      <AddSwagger />
      <ShowSwagger />
    </>
  )
}

export default App
