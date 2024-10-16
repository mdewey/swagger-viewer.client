
import { useSelector, useDispatch } from 'react-redux'


import { SwaggerItem, setSelectedSwagger, RootState, removeSwagger } from '../features/swaggers/swaggerSlice'
import { useLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_KEY } from '../constants';
import DownloadSwagger from "./DownloadSwagger";

import { MdCancel } from "react-icons/md";

import '../styles/swagger-list.scss'
export default function Sidebar() {
  const { swaggers, selectedSwagger } = useSelector((state: RootState) => state.swagger)
  const [localSwaggers, setLocalSwaggers] = useLocalStorage<SwaggerItem[]>(LOCAL_STORAGE_KEY, []);
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

  if (swaggers.length === 0) {
    return <h2>No swaggers</h2>
  }

  console.log('swaggers', swaggers)
  return (
    <div className="swagger-list">
      <ul>
        {[...swaggers]
          .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }).map((swagger: SwaggerItem) => (
            <li key={swagger.id} className={`swagger-item ${(swagger.id === selectedSwagger?.id) && 'selected'}`} onClick={() => select(swagger)}>
              <div>{swagger.name}</div>
              <div className="button-drawer">
                <DownloadSwagger {...swagger} />
                <button onClick={() => remove(swagger)} className="remove-button"><MdCancel /></button>
              </div>
            </li>
          ))}
      </ul>
    </div >
  )
}
