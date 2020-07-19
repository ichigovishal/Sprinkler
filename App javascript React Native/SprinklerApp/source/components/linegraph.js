import React from "react";
import { StyleSheet, View, Dimensions} from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryZoomContainer, LineSegment } from "victory-native";
import _ from 'lodash/core';
import theme from '../components/theme';





class LineGraph extends React.Component {

  constructor(props) {
    super();
    this.entireDomain = this.getEntireDomain(props);
    this.state = {
      zoomedXDomain: this.entireDomain.x,
    };
  }

  getEntireDomain(props) {
    const { data } = props;
    return {
      y: [0, 6],
      x: [ data[0].time, _.last(data).time ]
    };
  }
  onDomainChange(domain) {
    this.setState({
      zoomedXDomain: domain.x,
    });
  }
  getData() {
    const { zoomedXDomain } = this.state;
    const { data } = this.props;
     return data.filter(
      // is d "between" the ends of the visible x-domain?
      (d) => (d.time >= zoomedXDomain[0] && d.time <= zoomedXDomain[1]));
  }

	render() {
    return (
      <View style={styles.container}>
        <VictoryChart
         theme={theme}
  containerComponent={
    <VictoryZoomContainer
    onZoomDomainChange={this.onDomainChange.bind(this)}
    minimumZoom={{x: 5, y: 0.1}}
    zoomDomain={ {x: [ this.props.data[0].time,  _.last(this.props.data).time], y: [0, 3] }}
    
     /> 
  }
>
  <VictoryLine 
  style={{
    data: { stroke: "#c43a31" },
    parent: { border: "1px solid #ccc"}
  }}
   data={this.getData()} x="time" y="moisture_reading"
    gridComponent={<LineSegment type={"grid"}/>}
   
    />
  </VictoryChart>
  </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    marginHorizontal: 10
  }
});

export  default LineGraph;

