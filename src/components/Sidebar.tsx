
import { useSelector, useDispatch } from 'react-redux'


import { SwaggerItem, setSelectedSwagger, RootState, removeSwagger } from '../features/swaggers/swaggerSlice'
import { useLocalStorage } from 'usehooks-ts';



export default function Sidebar() {
  const swaggers = useSelector((state: RootState) => state.swagger.swaggers)
  const [localSwaggers, setLocalSwaggers] = useLocalStorage<SwaggerItem[]>('swaggers', []);
  const dispatch = useDispatch();
  const select = (swaggerSelected: SwaggerItem) => {
    console.log('selected', swaggerSelected)
    dispatch(setSelectedSwagger(swaggerSelected))
  };

  const remove = (swaggerSelected: SwaggerItem) => {
    console.log('remove', swaggerSelected)
    dispatch(removeSwagger(swaggerSelected))
    setLocalSwaggers(localSwaggers.filter(swagger => swagger.id !== swaggerSelected.id));
  }

  return (
    <div className="sidebar">
      <ul>
        {swaggers.map((swagger: SwaggerItem) => (
          <li key={swagger.id} >
            <div onClick={() => select(swagger)}>{swagger.name}</div>
            <button onClick={() => remove(swagger)}>remove</button>
          </li>
        ))}
      </ul>
    </div >
  )
}
