import { useSession } from 'next-auth/react';
import * as React from 'react';
import Sidebar from '../sidebar'
export interface IAppProps {
    children:React.ReactNode;
    selected:string;
}

export default function App (props: IAppProps) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = React.useState()

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  return (
    <div>
        <Sidebar selected={props.selected}/>
        {session && props.children}
    </div>
  );
}
