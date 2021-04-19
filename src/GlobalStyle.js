import {  createGlobalStyle } from 'styled-components';
import CamptonLight from './assets/fonts/campton_light.ttf';
import CamptonMedium from './assets/fonts/campton_medium.ttf';
import CamptonBold from './assets/fonts/campton_bold.ttf';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: CamptonLight;
    src: url(${CamptonLight});
  }
  @font-face {
    font-family: CamptonMedium;
    src: url(${CamptonMedium});
  }
  @font-face {
    font-family: CamptonBold;
    src: url(${CamptonBold});
  }
`

export default GlobalStyle;