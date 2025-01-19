// 从 DOM 中选择一个 canvas 元素
const canvas = document.querySelector('canvas');

// 定义一个名为 simulateClick 的函数，它可以接收三个可选参数：centerX、centerY 和 maxClicks
// centerX 和 centerY 默认为 200，maxClicks 默认为 50000
function simulateClick(centerX = 200, centerY = 200, maxClicks = 50000) {
  // 如果找到了 canvas 元素
  if (canvas) {
    // 初始化一个变量 count 用于记录点击的次数，初始值为 0
    let count = 0;
    // 获取 canvas 元素的边界矩形，包括位置和尺寸信息
    const rect = canvas.getBoundingClientRect();

    // 定义一个名为 click 的内部函数，用于执行具体的点击操作
    const click = () => {
      // 计算点击的 X 坐标：在 centerX 坐标的基础上添加一个随机偏移量
      // 这个偏移量是在 -30 到 30 之间的随机值（通过 (Math.random() - 0.5) * 60 计算得出）
      const x = centerX + (Math.random() - 0.5) * 60;
      // 计算点击的 Y 坐标：在 centerY 坐标的基础上添加一个随机偏移量
      // 这个偏移量是在 -30 到 30 之间的随机值（通过 (Math.random() - 0.5) * 60 计算得出）
      const y = centerY + (Math.random() - 0.5) * 60;

      // 创建一个新的鼠标点击事件对象
      const event = new MouseEvent('click', {
        // 允许事件冒泡
        bubbles: true,
        // 允许事件可取消
        cancelable: true,
        // 计算点击事件的绝对 X 坐标，将相对 canvas 的 x 偏移量添加到 canvas 的左边界位置
        clientX: rect.left + x,
        // 计算点击事件的绝对 Y 坐标，将相对 canvas 的 y 偏移量添加到 canvas 的上边界位置
        clientY: rect.top + y,
      });

      // 在 canvas 元素上触发点击事件
      canvas.dispatchEvent(event);
      // 输出点击的信息，包括点击次数和点击位置的坐标（保留两位小数）
      console.log(`点击 ${count + 1}：(${x.toFixed(2)}, ${y.toFixed(2)})`);
      // 点击次数加 1
      count++;

      // 如果点击次数小于 maxClicks
      if (count < maxClicks) {
        // 生成一个 100 到 500 毫秒之间的随机延迟时间
        const randomDelay = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        // 使用 setTimeout 在随机延迟时间后再次调用 click 函数
        setTimeout(click, randomDelay);
      } else {
        // 当点击次数达到 maxClicks 时，输出点击完成的信息
        console.log('点击操作完成！');
      }
    };

    // 调用 click 函数开始模拟点击
    click();
  } else {
    // 如果没有找到 canvas 元素，输出错误信息
    console.error('未找到 canvas 元素。');
  }
}

// 调用 simulateClick 函数开始模拟点击，使用默认参数
simulateClick();
