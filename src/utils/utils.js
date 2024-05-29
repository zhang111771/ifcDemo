import * as THREE from "three"
import gsap from "gsap"

export function getMouseXY(event,container){

    let mouse=new THREE.Vector3()
    //当非全屏展示时需要纠正位置
    const style=window.getComputedStyle(container)
  
    mouse.x=((event.clientX-parseInt(style.left))/container.clientWidth)*2-1
    mouse.y=1-((event.clientY-parseInt(style.top))/container.clientHeight)*2
    return mouse
}
//节流
export function throttled(fn, delay) {
  
    let timer = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
         
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            timer = setTimeout(fn, remaining);
          
        }
    }
}
// 防抖
export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = [...arguments];
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        const callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
      }
      else {
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait);
      }
    }
  }
  
  
export function randomNumGsap(obj,num=100){
    let randomNum=Math.floor(Math.random()*num)
    gsap.to(obj,{
        value:randomNum,
        duration:1,
        onUpdate:()=>{
            obj.value=Math.floor(obj.value)
        }
    })
}
export function getAngle({ x: x1, y: y1 }, { x: x2, y: y2 }){
  const dot = x1 * x2 + y1 * y2
  const det = x1 * y2 - y1 * x2
  const angle = Math.atan2(det, dot) / Math.PI * 180
  return Math.round(angle + 360) % 360
}
// const angle = getAngle({
//   x: x1 - x3,
//   y: y1 - y3,
// }, {
//   x: x2 - x3,
//   y: y2 - y3,
// });