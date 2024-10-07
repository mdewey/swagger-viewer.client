
import { useSelector, useDispatch } from 'react-redux'


import { SwaggerItem, setSelectedSwagger, RootState } from '../features/swaggers/swaggerSlice'

export default function Sidebar() {
  const swaggers = useSelector((state: RootState) => state.swagger.swaggers)
  const dispatch = useDispatch();
  const select = (swaggerSelected: SwaggerItem) => {
    console.log('selected', swaggerSelected)
    dispatch(setSelectedSwagger(swaggerSelected))
  };

  return (
    <div className="sidebar">
      <ul>
        {swaggers.map((swagger: SwaggerItem) => (
          <li key={swagger.id} onClick={() => select(swagger)}>
            {swagger.name}
          </li>
        ))}
      </ul>
    </div >
  )
}
