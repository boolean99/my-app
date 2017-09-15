// 색상 조절 객체

const colorAdjust = {
  r: '',
  g: '',
  b: '',
  rgb(hexCode) {
    // hexCode라는 인자로 받은 헥사코드값을 RGB 값으로 변환해 현 객체의 r, g, b 프로퍼티에 저장한다
    let source = hexCode.slice(1);

    this.r = parseInt(source.substring(0, 2), 16);
    this.g = parseInt(source.substring(2, 4), 16);
    this.b = parseInt(source.substring(4), 16);
  },
  hexToRgb(hexCode, opacity = null) {
    // 전달받은 헥사코드값과 알파값을 rgba 형식으로 반환한다
    this.rgb(hexCode);

    if(opacity !== null) {
      if(opacity < 1) {
        console.log('d');
        return `rgba(${this.r},${this.g},${this.b},${opacity})`;
      }else {
        return `rgba(${this.r},${this.g},${this.b}, 1)`;
      }
    }else {
      return `rgb(${this.r},${this.g},${this.b})`;
    }
  },
  lighter (hexCode, opacity) {
    // 색상을 밝게 만들어준다
    this.rgb(hexCode);
    let returnValue;
    this.r += opacity;

    if (this.r > 255) this.r = 255;
    if (this.r < 0) this.r = 0;
    this.g += opacity;
    if (this.g > 255) this.g = 255;
    if (this.g < 0) this.g = 0;
    this.b += opacity;
    if (this.b > 255) this.b = 255;
    if (this.b < 0) this.b = 0;
    returnValue = this.b.toString(16);
    if (returnValue.length < 2) returnValue = "0" + returnValue;
    returnValue = this.g.toString(16) + returnValue;
    if (returnValue.length < 4) returnValue = "0" + returnValue;
    returnValue = this.r.toString(16) + returnValue;
    if (returnValue.length < 6) returnValue = "0" + returnValue;

    return "#" + returnValue;
  },
  darken (hexCode, opacity) {
    // 색상을 어둡게 만들어준다
    this.rgb(hexCode);

    return this.lighter(hexCode, opacity * -1);
  }
};

export default colorAdjust;