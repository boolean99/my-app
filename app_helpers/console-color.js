//import CLStyle from 'ansi-styles';

export function consoleError(msg, state) {
  if(state === 'wrong') {
    console.log(msg);
    //console.log(`${CLStyle.color.ansi256.rgb(255,255,255)}${CLStyle.bgColor.ansi256.rgb(204,70,120)}${msg}${CLStyle.bgColor.close}${CLStyle.color.close}`);
    
  }else {
    console.log(msg);
    //console.log(`${CLStyle.color.ansi256.rgb(255,255,255)}${CLStyle.bgColor.ansi256.rgb(70,137,204)}${msg}${CLStyle.bgColor.close}${CLStyle.color.close}`);
    
  }
}
