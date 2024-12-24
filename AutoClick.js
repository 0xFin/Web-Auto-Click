//方法1
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


//---------------------------------------------------------------------------------------------------------------------

//方法2
function randomCenterClick() {
    // 获取屏幕尺寸
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;

    // 计算中心80%区域的边界
    const margin = 0.1; // 10% margin on each side
    const minX = screenWidth * margin;
    const maxX = screenWidth * (1 - margin);
    const minY = screenHeight * margin;
    const maxY = screenHeight * (1 - margin);

    // 生成随机位置（在中心80%区域内）
    const x = Math.floor(minX + Math.random() * (maxX - minX));
    const y = Math.floor(minY + Math.random() * (maxY - minY));

    // 创建并触发点击事件
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
    });
    document.elementFromPoint(x, y).dispatchEvent(clickEvent);

    // 生成随机延迟（1到5秒之间）
    const delay = 1000 + Math.random() * 4000;

    // 在控制台输出点击信息
    console.log(`点击位置: (${x}, ${y}), 下次点击延迟: ${delay.toFixed(2)}ms`);

    // 安排下一次点击
    setTimeout(randomCenterClick, delay);
}

// 开始点击循环
randomCenterClick();
