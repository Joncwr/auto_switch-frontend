import React from 'react'
import Lottie from 'react-lottie';

export default class LottieControl extends React.Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require('./home.json'),
    };

    return <div>
      <Lottie options={defaultOptions}/>
    </div>
  }
}
