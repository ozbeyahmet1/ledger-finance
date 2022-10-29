import * as React from 'react';
import Link from 'next/link';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div style={{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1>404</h1>
      <Link href="/"><h3 style={{textDecoration:"underline",cursor:"pointer"}}>Click for Homepage</h3></Link>
    </div>
  );
}
