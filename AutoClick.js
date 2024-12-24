//网页控制台实现鼠标自动点击效果

const canvas = document.querySelector('canvas'); 
//使用 document.querySelector('canvas') 方法获取页面中的 <canvas> 元素。如果页面中存在 <canvas> 元素，变量 canvas 将引用该元素。如果不存在，canvas 将为 null。

if (canvas) {
  let count = 0;
  const rect = canvas.getBoundingClientRect();
//检查 canvas 是否有效；count 记录已经模拟的点击次数。初始值为 0; rect 获取 <canvas> 元素的边界信息，返回一个包含位置和尺寸的对象。

  const simulateClick = () => {
    const centerX = 200;
    const centerY = 200;
    //点击的目标中心坐标，可修改。
    const x = centerX + (Math.random() - 0.5) * 60;
    const y = centerY + (Math.random() - 0.5) * 60;
    //随机偏移：生成一个介于-0.5到0.5的随机数。乘以60后，生成一个偏移范围在-30到30之间的随机值。实际点击位置会在目标中心坐标周围的一个60×60像素的正方形范围内随机变化。

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y,
    });
    //创建点击事件。
    //bubbles：设置为 true，表示事件会冒泡。
    //cancelable：设置为 true，表示事件可以被取消。
    //clientX 和 clientY：点击事件的屏幕位置，结合 rect.left 和 rect.top 确保点击位置相对于整个窗口正确计算。

    canvas.dispatchEvent(event);
    //使用 dispatchEvent 方法将这个模拟的点击事件派发到 <canvas> 元素上
    console.log(`Click ${count + 1}: (${x.toFixed(2)}, ${y.toFixed(2)})`); 
    //在控制台输出当前点击的序号和具体位置
    count++;

    if (count < 100000) {
      setTimeout(simulateClick, 200);
    } else {
      console.log('Clicking completed!');
    }
  };
  //控制点击次数和频率（可修改总次数和频率间隔）
  //如果点击次数未达到100,000次，使用 setTimeout 延迟 200 毫秒后再次调用 simulateClick。如果达到100,000次，输出完成信息并停止点击。

  simulateClick();
} else {
  console.error('Canvas not found.');
}
//如果 canvas 为 null，输出错误信息 "Canvas not found."
