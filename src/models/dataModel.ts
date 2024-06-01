import { useState } from "react";

export default ()=> {
  const [data, setData] = useState<readonly any[]>([]);
  return { data,setData };
};