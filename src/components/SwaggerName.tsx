import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, SwaggerItem, updateSwagger } from "../features/swaggers/swaggerSlice";


import { useLocalStorage } from 'usehooks-ts'

import { LOCAL_STORAGE_KEY } from '../constants'

export default function SwaggerName() {
  const swagger = useSelector((state: RootState) => state.swagger.selectedSwagger);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(swagger ? swagger.name : '');
  const dispatch = useDispatch();
  const [swaggers, setLocalSwaggers] = useLocalStorage<SwaggerItem[]>(LOCAL_STORAGE_KEY, []);
  const enableEdit = () => {
    setIsEditing(true);
  }

  const disableEdit = () => {
    setIsEditing(false);
  }

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (swagger) {

      dispatch(updateSwagger({
        ...swagger,
        name
      }))
      const updatedSwaggers = swaggers.map(s => {
        if (s.id === swagger?.id) {
          return {
            ...s,
            name
          }
        }
        return s;
      });
      setLocalSwaggers(updatedSwaggers);

      disableEdit();
    }

  }

  if (isEditing) {
    return (
      <>
        <form onSubmit={save}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type="submit">save</button>
        </form>
      </>
    )
  }
  return (
    <h2 onDoubleClick={enableEdit}>{name}</h2>
  )
}
