import React, {useState, useEffect} from 'react';
import {View,} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
const CircularProfile = ({ percentage,color }) => {
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    const radius = 20; // Adjust the radius for a circle that fits within a 95x95 square
    const circumference = 2 * Math.PI * radius;
    const dashoffset = (1 - clampedPercentage / 100) * circumference;
  
    return (
      <View  style={{zIndex:2}}>
        <Svg height="48" width="48">
          {/* Background Circle */}
          <Circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#000000"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Percentage Circle */}
          <Circle
            cx="24"
            cy="24"
            r={radius}
            stroke={color}
            strokeWidth="8" 
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashoffset}
            fill="transparent"
            transform="rotate(270 24 24)"
          />
        </Svg>
        {/* <Text style={{ textAlign: 'center', marginTop: -65, fontSize: 18 }}>
          {`${clampedPercentage}%`}
        </Text> */}
      </View>
    );
  };
  export default CircularProfile