import { useState } from "react";
import { useDispatch } from "react-redux";

import { SwaggerItem, updateSwagger } from "../features/swaggers/swaggerSlice";


import { useLocalStorage } from 'usehooks-ts'

import { LOCAL_STORAGE_KEY } from '../constants'

export default function SwaggerName(swagger: SwaggerItem) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(swagger.name);
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
    dispatch(updateSwagger({
      ...swagger,
      name
    }))
    const updatedSwaggers = swaggers.map(s => {
      if (s.id === swagger.id) {
        return {
          ...s,
          name
        }
      }
      return s;
    });
    setLocalSwaggers(updatedSwaggers);

    setIsEditing(false);
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
            onBlur={disableEdit} />
          <button type="submit">save</button>
        </form>
      </>
    )
  }
  return (
    <h2 onDoubleClick={enableEdit}>{swagger.name}</h2>
  )
}
