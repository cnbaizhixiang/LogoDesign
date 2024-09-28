import { getFontsGroup, getColors, getIcons } from "@/api/edit";
import Vue from "vue";
export async function recommendFont(newCanvas, logoInfo) {
  await NewTitle(newCanvas, logoInfo);
  return newCanvas;
}

//获取字体列表
export async function getFontList(type) {
  let fonts = [];
  await getFontsGroup(type).then((response) => {
    if (response.data) {
      fonts = response.data.map((i) => {
        return {
          id: i.bfgId,
          name: i.fontGroupTitle,
          url: i.defaultFont,
        };
      });
    }
  });

  return fonts;
}

//获取颜色
export function getColor(activeObject) {
  let isList = Object.keys(activeObject).includes("_objects");

  let colors = [];
  if (isList) {
    let list = activeObject._objects;
    //元素内存在多个元素
    list.forEach((element) => {
      let color = element.fill;
      if (color instanceof Object) {
        //color为对象

        color.colorStops.forEach((i) => {
          colors.push(i.color);
        });
      } else {
        //检测color存在，不为空
        if (color) {
          colors.push(color);
        }
      }
    });
  } else {
    //单个元素
    let color = activeObject.fill;

    //color为对象
    if (color instanceof Object) {
      color.colorStops.forEach((i) => {
        colors.push(i.color);
      });
    } else {
      //检测color存在，不为空
      if (color) {
        colors.push(color);
      } else {
        //不存在检测stroke

        if (activeObject.stroke) {
          colors.push(activeObject.stroke);
        }
      }
    }
  }
  //去重并且去除空字符串

  let a = [
    ...new Set(
      colors.filter(
        (color) => color !== undefined && color !== null && color.trim !== ""
      )
    ),
  ];

  //只允许hex格式的颜色，rgb会导致颜色组件出现透明度
  a.forEach((element, index) => {
    let color = new fabric.Color(element);

    a[index] = "#" + color.toHex();
  });

  return a;
}

//修改颜色
export function changeColor(activeObject, colorList, value, index) {
  //activeObject：需改变元素
  // colorList:颜色数组
  // value:改变前颜色
  // index：改变颜色坐标

  value = value ? value.toUpperCase() : value;
  let list = activeObject._objects;
  if (list) {
    //元素内存在多个元素
    list.forEach((element) => {
      let color = element.fill;
      if (color instanceof Object) {
        //color为对象
        let linearGradient = getGradient(color, colorList);
        element.set("fill", linearGradient);
      } else {
        let a = new fabric.Color(color);
        color = "#" + a.toHex();
        if (color.toUpperCase() === value) {
          element.set({
            fill: colorList[index],
          });
        }
      }
    });
  } else {
    //单个元素

    let color = null;
    if (activeObject.fill !== undefined) {
      color = activeObject.fill;
    }

    //color为对象
    if (color instanceof Object) {
      let linearGradient = getGradient(color, colorList);
      activeObject.set("fill", linearGradient);
    } else {
      //检测color存在，不为空
      if (color) {
        let a = new fabric.Color(color);
        color = "#" + a.toHex();
        activeObject.set({
          fill: colorList[index],
        });
      } else {
        if (activeObject.stroke) {
          activeObject.set({
            stroke: colorList[index],
          });
        }
      }
    }
  }
}
export function getGradient(obj, color) {
  let linearGradient = new fabric.Gradient({
    type: obj.type,
    offsetX: obj.offsetX,
    offsetY: obj.offsetY,
    gradientTransform: obj.gradientTransform,
    gradientUnits: obj.gradientUnits,
    coords: obj.coords, // 渐变方向从 (0,0) 到 (200,0)
    colorStops: [],
  });

  for (let i = 0; i < obj.colorStops.length; i++) {
    linearGradient.colorStops.push({
      offset: obj.colorStops[i].offset,
      color: color[i],
      opacity: obj.colorStops[i].opacity,
    });
  }
  return linearGradient;
}

//修改颜色数组
export function getRandomColors(colorsArray, n) {
  const result = [];

  // 如果请求的数量大于数组长度，先返回整个数组
  if (n >= colorsArray.length) {
    let num = n - colorsArray.length;

    let list = [...colorsArray];
    // Fisher-Yates 洗牌算法
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * colorsArray.length);
      const randomColor = colorsArray[randomIndex];
      list.push(randomColor);
    }
    return list;
  }

  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    const randomColor = colorsArray[randomIndex];

    // 避免重复添加相同的颜色
    if (!result.includes(randomColor)) {
      result.push(randomColor);
    }
  }

  return result;
}

//获取图标列表
export async function getIconList(obj) {
  let icons;
  let data;
  await getIcons(obj).then((response) => {
    let a = response.data;
    if (a) {
      icons = a.list.map((i) => {
        return {
          id: i.biId,
          url: i.iconAddress,
        };
      });
      data = {
        total: a.total,
        icons: icons,
      };
    } else {
      data = {
        total: 0,
        icons: [],
      };
    }
  });

  return data;
}

//获取颜色列表
//获取字体列表
export async function getColorList(type) {
  let colors = [];

  await getColors(type).then((response) => {
    let a = response.data;
    if (a) {
      colors = response.data.map((i) => {
        return {
          id: i.bcId,
          color: i.colorDetails,
          bgcColor: i.colorBackground,
        };
      });
      colors = colors.map((item) => {
        const colorArray = item.color.split("|");
        const bgcColorArray = item.bgcColor.split("|");

        return {
          id: item.id,
          color: colorArray,
          bgcColor: bgcColorArray,
        };
      });
    }
  });
  return colors;
}

//fabric.js全局设置
export async function setGlobalFabric() {
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

//获取文本paths数组
export async function getFont(text, url) {
  const opentype = require("opentype.js");

  let currentX = 0;
  let paths = [];
  try {
    let font = await opentype.load(url); // 确保这里传入正确的字体文件路径
    font.descender = 100;

    if (text.length <= 0) {
      throw "error";
    }
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      let glyph = font.charToGlyph(char);
      let path = glyph.getPath(currentX, 0, 36);
      paths.push(path);
    }
    return paths;
  } catch (error) {
    Vue.prototype.$my_message({
      content: "字体地址异常!",
      type: "error",
    });
    // 根据你的需求处理异常，例如重新抛出，或者返回一个错误信息
    throw error; // 重新抛出异常，让调用者处理
  }
}

//设置渐变色
export function setGradient(title, name) {
  //title  fabric.js元素
  //name   元素名称name属性

  let newWidth = title.getScaledWidth();

  //记录变色前的放大倍数
  let scaleX = title.multiple ? title.multiple : title.scaleX;
  //防止裁剪失真
  title.scale(10);
  //保持位置，宽高不变
  let { left, top } = title;
  let width = title.getScaledWidth();

  let height = title.getScaledHeight();
  //缩放一半位置适应裁剪

  title.set({
    left: -width / 2,
    top: -height / 2,
  });

  //防止svg存在无用元素导致下载svg异常
  // if (title._objects) {
  //   // 创建一个要删除的元素的数组
  //   let elementsToRemove = [];
  //   title._objects.forEach((element) => {
  //     if (element.fill === "") {
  //       elementsToRemove.push(element);
  //     }
  //   });
  //   elementsToRemove.forEach((element) => {
  //     title.remove(element);
  //   });
  // }

  // 根据hexagon的尺寸和位置调整points
  let rect = new fabric.Rect({
    name: name,
    multiple: scaleX,
    left: left,
    top: top,
    clipPath: title,
    width: width,
    height: height,
  });
  //还原倍数
  rect.scaleToWidth(newWidth);

  return rect;
}

//修改渐变色
export function setColor(title, gradient) {
  //title  fabric.js元素
  //gradient  渐变色相关信息
  // gradient: {
  //   isGradient: 0,
  //   type: "linear",
  //   colors: ["#FF0000", "#FFE500", "#0766FF"],
  // },

  let linearGradient;
  if (gradient.type === "linear") {
    linearGradient = new fabric.Gradient({
      type: "linear",
      gradientUnits: "pixels",
      coords: {
        x1: 0,
        y1: 0,
        x2: title.width,
        y2: title.height,
      },
      colorStops: [
        { offset: 0, color: gradient.colors[0], opacity: 1 },
        { offset: 0.5, color: gradient.colors[1], opacity: 1 },
        { offset: 1, color: gradient.colors[2], opacity: 1 },
      ],
    });
  } else {
    linearGradient = new fabric.Gradient({
      type: "radial",
      gradientUnits: "pixels",
      coords: {
        r1: title.width / 2, // 该属性仅径向渐变可用，外圆半径
        r2: 0, // 该属性仅径向渐变可用，外圆半径
        x1: title.width / 2, // 焦点的x坐标
        y1: title.height / 2, // 焦点的y坐标
        x2: title.width / 2, // 中心点的x坐标
        y2: title.height / 2, // 中心点的y坐标
      },
      colorStops: [
        { offset: 0, color: gradient.colors[0], opacity: 1 },
        { offset: 0.5, color: gradient.colors[1], opacity: 1 },
        { offset: 1, color: gradient.colors[2], opacity: 1 },
      ],
    });
  }

  title.set({
    fill: linearGradient,
  });
}

//修改标题样式
export function changeTitle(canvas, title) {
  //canvas
  let targetObject = canvas.getObjects().find((obj) => obj.name === "title");

  if (targetObject) {
    let a = targetObject.getObjects();
    if (title.layoutType) {
      //修改单个字符
      a.forEach((obj, i) => {
        if (i === title.characterIndex) {
          obj.set({
            strokeWidth: title.strokeWidth,
            stroke: title.titleStrokeColor,
            opacity: title.titleOpacity,
          });
          if (title.filter.color) {
            obj.set({
              //阴影
              shadow: {
                color: title.filter.color, // 阴影颜色，使用RGBA格式
                blur: title.filter.blur, // 模糊半径
                offsetX: title.filter.x, // 阴影在X轴上的偏移量
                offsetY: title.filter.y, // 阴影在Y轴上的偏移量
              },
            });
          }
        }
      });
    } else {
      a.forEach((obj, i) => {
        obj.set({
          strokeWidth: title.strokeWidth,
          stroke: title.titleStrokeColor,
          opacity: title.titleOpacity,
        });
        if (title.filter.color) {
          obj.set({
            //阴影
            shadow: {
              color: title.filter.color, // 阴影颜色，使用RGBA格式
              blur: title.filter.blur, // 模糊半径
              offsetX: title.filter.x, // 阴影在X轴上的偏移量
              offsetY: title.filter.y, // 阴影在Y轴上的偏移量
            },
          });
        }
      });
    }

    canvas.renderAll();
  }
}

// export async function replaceIcon(canvas, logoInfo, index) {
//   let icon = logoInfo.icon;
//   let title = logoInfo.title;

//   var targetObject = canvas.getObjects().find((obj) => obj.name === "title");
//   let a = await getFont(title.titleText, title.font.url);
//   // 已经存在时删除标题
//   if (targetObject) {
//     canvas.remove(targetObject);
//   }
//   let left, top, scaleX, scaleY;
//   left = targetObject ? targetObject.left : 0;
//   top = targetObject ? targetObject.top : 0;
//   scaleX = targetObject ? targetObject.scaleX : 1;
//   scaleY = targetObject ? targetObject.scaleY : 1;

//   let paths = [];
//   let w = 0;

//   //图标未插入title
//   let icon1 = canvas.getObjects().find((obj) => obj.name === "icon");
//   //图标已插入title
//   let icon2;
//   if (targetObject._objects) {
//     icon2 = targetObject.getObjects().find((obj) => obj.name === "icon");
//   }

//   let img = icon1 || icon2;

//   //缩放与字体等高
//   let p = new fabric.Path(a[0].toPathData());

//   //未插入时，缩放img倍数
//   if (icon1) {
//     let s = p.getScaledHeight() / img.getScaledHeight();
//     img.scale(s);
//   }

//   for (let i = 0; i < a.length; i++) {
//     let str = a[i].toPathData();

//     let path = new fabric.Path(str);
//     if (i === index) {
//       if (!icon.isInsert) {
//         //替换
//         path = img;
//       } else {
//         //插入
//         let a = img;

//         paths.push(img);

//         img.set({
//           left: w,
//         });
//         w = w + img.getScaledWidth() + title.titleSpacing;
//       }
//     }

//     path.set({
//       left: w,
//     });
//     w = w + path.getScaledWidth() + title.titleSpacing;
//     paths.push(path);
//   }

//   //设置icon的top
//   if (index !== 0 && index) {
//     let center1 = paths[0].getCenterPoint();
//     paths[index].set({
//       top: center1.y - paths[index].getScaledHeight() / 2,
//     });
//   } else if (index === 0 && paths[1]) {
//     let center1 = paths[1].getCenterPoint();
//     paths[index].set({
//       top: center1.y - paths[index].getScaledHeight() / 2,
//     });
//   }

//   let group = new fabric.Group(paths);
//   // let width = group.getBoundingRect().width;
//   // let height = group.getBoundingRect().height;
//   group.scale(scaleX);
//   let width = group.getScaledWidth();
//   let height = group.getScaledHeight();

//   group.set({
//     name: "title",
//     left: canvas.getCenter().left - width / 2,
//     top: canvas.getCenter().top - height / 2,
//   });

//   canvas.add(group);
//   group.bringToFront();
//   // 从画布的对象列表中移除img对象

//   canvas.remove(img);

//   changeTitle(canvas, title);

//   //是否为渐变色
//   if (title.gradient.isGradient) {
//     let a = canvas.getObjects().find((obj) => obj.name === "title");
//     let b = setGradient(a, "title");
//     canvas.remove(a);
//     canvas.add(b);
//     setColor(b, title.gradient);
//   }
// }

//新增标题
export async function NewTitle(canvas, logoInfo) {
  let title = logoInfo.title;
  let icon = logoInfo.icon;
  //插入图标
  // if (icon.layoutType === 2) {
  //   await replaceIcon(canvas, logoInfo, icon.insertIndex);
  //   return;
  // }
  var targetObject = canvas.getObjects().find((obj) => obj.name === "title");
  let a = await getFont(title.titleText, title.font.url);

  //倍数
  let s = 1;
  let center;
  // 已经存在时删除标题
  if (targetObject) {
    //当元素中存在scale属性时，直接设置其放大倍数，渐变色时需要

    s = targetObject.multiple ? targetObject.multiple : targetObject.scaleX;
    center = getCenterPointer(targetObject);
    canvas.remove(targetObject);
  }
  let left, top;
  left = targetObject ? center.x : 0;
  top = targetObject ? center.y : 0;

  let paths = [];
  let w = 0;
  for (let i = 0; i < a.length; i++) {
    let str = a[i].toPathData();
    let path = new fabric.Path(str);
    path.set({
      left: w,
    });
    w = w + path.width + title.titleSpacing;
    paths.push(path);
  }
  let group = new fabric.Group(paths);

  group.scale(s);

  let width = group.getScaledWidth();
  let height = group.getScaledHeight();
  group.set({
    name: "title",
    left: left ? left - width / 2 : canvas.getCenter().left - width / 2,
    top: top ? top - height / 2 : canvas.getCenter().top - height / 2,
  });

  canvas.add(group);
  group.bringToFront();
  if (targetObject) {
    changeTitleColor(canvas, title);
    changeTitle(canvas, title);
  }
  //是否为渐变色
  // if (title.gradient.isGradient) {
  //   let b = canvas.getObjects().find((obj) => obj.name === "title");
  //   let a = setGradient(b, "title");
  //   canvas.remove(b);
  //   canvas.add(a);
  //   setColor(a, title.gradient);
  // }
  canvas.renderAll();
}
export function getCenterPointer(target) {
  // 获取对象的宽度、高度、左边界和顶部边界
  let { left, top, width, height } = target.getBoundingRect();
  // 计算中心点坐标
  let centerX = left + width / 2;
  let centerY = top + height / 2;
  let obj = {
    x: centerX,
    y: centerY,
  };
  return obj;
}
//修改标题颜色
export function changeTitleColor(canvas, title) {
  let element = canvas.getObjects().find((obj) => obj.name === "title");
  let list = element._objects;

  let a = title.font.colors;

  if (title.layoutType === 1) {
    list.forEach((element, index) => {
      element.set({
        fill: a[index] || "#000000",
      });
    });
  } else {
    list.forEach((element) => {
      element.set({
        fill: a[0] || "#000000",
      });
    });
  }
  canvas.renderAll();
}

//插入图标

export async function selectContainer(canvas, info, logoInfo) {
  // 插入图片
  let title = logoInfo.title;
  let icon = logoInfo.icon;

  let { objects, options } = await loadSVGFromURLPromise(info.url);

  let img = fabric.util.groupSVGElements(objects, {
    ...options,
  });

  var targetObject = canvas.getObjects().find((obj) => obj.name === "icon");
  // 已经存在时删除图标

  let center;
  if (targetObject) {
    let s = (targetObject.width * targetObject.scaleX) / img.width;
    img.scale(s);

    //放大后的图标高度大于画布0.4倍时
    if (img.getScaledHeight() > canvas.getHeight() * 0.4) {
      img.scaleToHeight(canvas.getHeight() * 0.4);
    }

    canvas.remove(targetObject);
    center = getCenterPointer(targetObject);
  } else {
    img.scaleToWidth(canvas.getWidth() * 0.2);
  }
  let left, top;
  left = targetObject ? center.x : 0;
  top = targetObject ? center.y : 0;
  //按原icon比例缩放

  //修改图标位置,最初位于中心
  let width = img.getScaledWidth();
  let height = img.getScaledHeight();

  img.set({
    name: "icon",
    left: left ? left - width / 2 : canvas.getCenter().left - width / 2,
    top: top ? top - height / 2 : canvas.getCenter().top - height / 2,
  });

  // 将图片添加到 canvas
  canvas.add(img);

  //修改样式
  if (targetObject) {
    changeIcon(canvas, icon);
  }
  //是否为插入图标
  // if (icon.layoutType === 2) {
  //   await replaceIcon(canvas, logoInfo, icon.insertIndex);
  // }
  //是否为渐变色
  // if (icon.gradient.isGradient) {
  //   let b = canvas.getObjects().find((obj) => obj.name === "icon");
  //   let a = setGradient(b, "icon");
  //   canvas.remove(b);
  //   canvas.add(a);
  //   setColor(a, icon.gradient);
  // }
}

//svg地址转换为canvas对象
export function loadSVGFromURLPromise(url) {
  return new Promise((resolve, reject) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      if (objects) {
        // let a = objects.filter((item) => {
        //   return item.visible === true; // 仅保留属性为false的元素
        // });

        resolve({ objects, options });
      } else {
        Vue.prototype.$my_message({
          content: "图标异常!",
          type: "error",
        });
        reject(new Error("No objects returned from SVG URL"));
      }
    });
  });
}
export function changeIcon(canvas, icon) {
  let targetObject = canvas.getObjects().find((obj) => obj.name === "icon");
  if (targetObject) {
    targetObject.set({
      opacity: icon.iconOpacity,
    });
    // let color = icon.filter.color;
    // if (color) {
    //   targetObject.set({
    //     //阴影
    //     shadow: {
    //       color: icon.filter.color, // 阴影颜色，使用RGBA格式
    //       blur: icon.filter.blur, // 模糊半径
    //       offsetX: icon.filter.x, // 阴影在X轴上的偏移量
    //       offsetY: icon.filter.y, // 阴影在Y轴上的偏移量
    //     },
    //   });
    // } else {
    //   targetObject.set({
    //     //阴影
    //     shadow: null,
    //   });
    // }

    canvas.renderAll();
  }
}
