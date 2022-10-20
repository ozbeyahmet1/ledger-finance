import * as React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    LineMarkSeries,
  } from "react-vis";

export interface IAppProps {
  color:string;
}

export default function App (props: IAppProps) {
    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 5 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 4 },
        { x: 9, y: 7 },
      ];
  return (
    <XYPlot width={320} height={170}>
    <LineSeries
      curve={"curveMonotoneX"}
      data={data}
    //   color={color}
      style={{ fill: "transparent" ,strokeWidth:"3"}}
    />
  </XYPlot>
  );
}
