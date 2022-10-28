import * as React from 'react';
import {
    XYPlot,
    LineSeries,
  } from "react-vis";

export interface IStatsCardProps {
  color:string;
  data:object;
}

export default function StatsCard(props: IStatsCardProps) {
  return (
    <XYPlot width={320} height={170}>
    <LineSeries
      curve={"curveMonotoneX"}
      data={props.data}
      color={props.color}
      style={{ fill: "transparent" ,strokeWidth:"3"}}
    />
  </XYPlot>
  );
}
