import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function Question() {
  const userId = useSelector((state: RootState) => state.main.userId)

  return (
    <div>
      <h1>Daily question for User: #{userId}</h1>
    </div>
  )
}