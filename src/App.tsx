import './App.scss'
import Sidebar from './components/Sidebar'
import ShowSwagger from './components/ShowSwagger'
import AddSwagger from './components/AddSwagger'

import { useLocalStorage } from 'usehooks-ts'
import { initSwaggers } from './features/swaggers/swaggerSlice'

import { useDispatch } from 'react-redux'



function App() {

  const [swaggers] = useLocalStorage('swaggers', []);

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
