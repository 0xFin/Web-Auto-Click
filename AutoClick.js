const canvas = document.querySelector('canvas'); 

if (canvas) {
  let count = 0;
  const rect = canvas.getBoundingClientRect();

  const simulateClick = () => {
    const centerX = 200;  //点击的目标中心坐标，可修改
    const centerY = 200;  //点击的目标中心坐标，可修改
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
    console.log(`Click ${count + 1}: (${x.toFixed(2)}, ${y.toFixed(2)})`); 
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
