const EventEmitter = require("events");

import { initAligningGuidelines } from "./guidelines.js";
import { initCenteringGuidelines } from "./centerLines.js";

class Editor extends EventEmitter {
  constructor() {
    super();
    this.canvas = null;
  }

  init(canvas) {
    // Initialization logic here
    this.canvas = canvas;

    //检测屏幕缩放
    window.addEventListener("resize", () => this.onResize());
    //辅助线
    initAligningGuidelines(canvas);
    //中心线
    initCenteringGuidelines(canvas);

    //基础设置
    this.basicSet();
    //防止溢出
    this.preventOverflow();

    //控件设置
    this.controlSet();
  }
  onResize() {
    let containerWidth = window.innerWidth;
    let oldWidth = this.canvas.getWidth();

    if (containerWidth < 768) {
      let w = containerWidth * 0.8;
      this.canvas.setWidth(w);
      this.canvas.setHeight(w / 1.4);
    } else {
      this.canvas.setWidth(700);
      this.canvas.setHeight(500);
    }

    let newWidth = this.canvas.getWidth();
    let scaleFactor = newWidth / oldWidth;

    let list = this.canvas.getObjects();
    list.forEach((obj) => {
      obj.scaleX *= scaleFactor;
      obj.scaleY *= scaleFactor;
      obj.left *= scaleFactor;
      obj.top *= scaleFactor;
      obj.setCoords(); // 更新对象的坐标
    });

    this.canvas.renderAll();
  }
  basicSet() {
    fabric.textureSize = 2120;

    //全局设置toJSON属性增加自定义属性
    fabric.Object.prototype.toObject = (function (toObject) {
      return function (propertiesToInclude) {
        return fabric.util.object.extend(
          toObject.call(this, propertiesToInclude),
          {
            name: this.name ? this.name : "",
            // multiple: this.multiple ? this.multiple : "",
          }
        );
      };
    })(fabric.Object.prototype.toObject);
  }
  //控件设置
  controlSet() {
    //       tl: false, // Top-left
    //       tr: true, // Top-right
    //       bl: false, // Bottom-left
    //       br: false, // Bottom-right
    //       mt: false, // Middle-top
    //       mb: false, // Middle-bottom
    //       ml: false, // Middle-left
    //       mr: false, // Middle-right
    //       mtr: true, // Corner-controls

    fabric.Object.prototype.set({
      centeredScaling: true, //角落放大缩小是否是以图形中心为放大原点
      cornerSize: 6,
      cornerStyle: "rect",
      transparentCorners: false, // 设置控制点不透明，即可以盖住其下的控制线
      cornerStrokeColor: "gray", // 修改控制点的边框颜色
      lockUniScaling: true, //只显示四角的操作
      padding: 10, //内边距
    });

    //去除不需要控件

    fabric.Object.prototype.controls.tl = new fabric.Control({
      render: () => "",
    });
    fabric.Object.prototype.controls.bl = new fabric.Control({
      render: () => "",
    });
    fabric.Object.prototype.controls.br = new fabric.Control({
      render: () => "",
    });
    fabric.Object.prototype.controls.mt = new fabric.Control({
      render: () => "",
    });
    fabric.Object.prototype.controls.mb = new fabric.Control({
      render: () => "",
    });
    fabric.Object.prototype.controls.ml = new fabric.Control({
      render: () => "",
    });
    fabric.Object.prototype.controls.mr = new fabric.Control({
      render: () => "",
    });

    //旋转控件
    // 单独修改旋转控制点，光标移动到该点上时的样式为`pointer`，一个手的形状
    fabric.Object.prototype.controls.mtr.cursorStyle =
      "url(	https://www.logoaidesign.com/upload/ai-icon/2024/06/04/e1fe1bb38f5e41c783cf78a565b7c83d.svg) 15 15, auto";

    //删除控件
    var iconUrl =
      "https://www.logoaidesign.com/upload/ai-icon/2024/05/31/02a371e2455347369c2c1c7991e7f296.svg";
    var iconImage = new Image();
    iconImage.onload = function () {};
    iconImage.src = iconUrl;
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      offsetY: -1,
      offsetX: 1,
      cursorStyle: "pointer", // 鼠标移到控件时的指针样式
      render: function (ctx, left, top, styleOverride, fabricObject) {
        // 渲染图标
        ctx.save();
        let size = this.cornerSize;
        let imageX = left - size / 2;
        let imageY = top - size / 2;
        ctx.drawImage(iconImage, imageX, imageY, size, size);
        ctx.restore();
      },
      cornerSize: 20,
    });
  }
  //防止超出画布
  preventOverflow() {
    this.canvas.on("object:moving", function (e) {
      if (e.target) {
        //防止超出画布
        var obj = e.target;
        // if object is too big ignore
        if (
          obj.getBoundingRect().height > obj.canvas.height ||
          obj.getBoundingRect().width > obj.canvas.width
        ) {
          return;
        }
        obj.setCoords();
        // top-left  corner
        if (
          obj.getBoundingRect().top + obj.getBoundingRect().height < 0 ||
          obj.getBoundingRect().left + obj.getBoundingRect().width < 0
        ) {
          obj.top = Math.max(
            obj.top,
            0 -
              obj.getBoundingRect().height / 2 +
              obj.top -
              obj.getBoundingRect().top
          );
          obj.left = Math.max(
            obj.left,
            0 -
              obj.getBoundingRect().width / 2 +
              obj.left -
              obj.getBoundingRect().left
          );
        }
        // bot-right corner
        if (
          obj.getBoundingRect().top + obj.getBoundingRect().height >
            obj.canvas.height ||
          obj.getBoundingRect().left + obj.getBoundingRect().width >
            obj.canvas.width
        ) {
          obj.top = Math.min(
            obj.top,
            obj.canvas.height -
              obj.getBoundingRect().height / 2 +
              obj.top -
              obj.getBoundingRect().top
          );
          obj.left = Math.min(
            obj.left,
            obj.canvas.width -
              obj.getBoundingRect().width / 2 +
              obj.left -
              obj.getBoundingRect().left
          );
        }
      }
    });
  }

  deleteElement() {
    //删除激活元素
    let activeObject = this.canvas.getActiveObject();
    this.canvas.remove(activeObject);
  }
}

export default Editor;
