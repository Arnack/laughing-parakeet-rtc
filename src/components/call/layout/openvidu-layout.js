class OpenViduLayout {
  layoutContainer;
  opts ;

  fixAspectRatio(elem, width) {
    const sub = elem.querySelector('.OT_root');
    if (sub) {
      // If this is the parent of a subscriber or publisher then we need
      // to force the mutation observer on the publisher or subscriber to
      // trigger to get it to fix it's layout
      const oldWidth = sub.style.width;
      sub.style.width = width + 'px';
      sub.style.width = oldWidth || '';
    }
  }

  positionElement(elem, x, y, width, height) {
    elem.style.position = 'absolute';
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
    elem.style.width = width + 'px';
    elem.style.height = height + 'px';
    this.fixAspectRatio(elem, width);
  }

  getVideoRatio(elem) {
    if (!elem) {
      return 3 / 4;
    }
    const video = elem.querySelector('video');
    if (video && video.videoHeight && video.videoWidth) {
      return video.videoHeight / video.videoWidth;
    } else if (elem.videoHeight && elem.videoWidth) {
      return elem.videoHeight / elem.videoWidth;
    }
    return 3 / 4;
  }

  getCSSNumber(elem, prop) {
    const cssStr = getComputedStyle(elem)[prop];
    return cssStr ? parseInt(cssStr, 10) : 0;
  }

  cheapUUID() {
    return (Math.random() * 100000000).toFixed(0);
  }

  getHeight(elem) {
    const heightStr = getComputedStyle(elem).height;
    return heightStr ? parseInt(heightStr, 10) : 0;
  }

  getWidth(elem) {
    const widthStr = getComputedStyle(elem).width;
    return widthStr ? parseInt(widthStr, 10) : 0;
  }

  getBestDimensions(minR , maxR , count , WIDTH, HEIGHT, targetHeight) {
    let maxArea, targetCols, targetRows, targetWidth, tWidth, tHeight, tRatio;

    // Iterate through every possible combination of rows and columns
    // and see which one has the least amount of whitespace
    for (let i = 1; i <= count; i++) {
      const colsAux = i;
      const rowsAux = Math.ceil(count / colsAux);

      // Try taking up the whole height and width
      tHeight = Math.floor(HEIGHT / rowsAux);
      tWidth = Math.floor(WIDTH / colsAux);

      tRatio = tHeight / tWidth;
      if (tRatio > maxR) {
        // We went over decrease the height
        tRatio = maxR;
        tHeight = tWidth * tRatio;
      } else if (tRatio < minR) {
        // We went under decrease the width
        tRatio = minR;
        tWidth = tHeight / tRatio;
      }

      const area = tWidth * tHeight * count;

      // If this width and height takes up the most space then we're going with that
      if (maxArea === undefined || area > maxArea) {
        maxArea = area;
        targetHeight = tHeight;
        targetWidth = tWidth;
        targetCols = colsAux;
        targetRows = rowsAux;
      }
    }
    return {
      maxArea: maxArea,
      targetCols: targetCols,
      targetRows: targetRows,
      targetHeight: targetHeight,
      targetWidth: targetWidth,
      ratio: targetHeight / targetWidth
    };
  }

  filterDisplayNone(element) {
    return getComputedStyle(element).display !== 'none';
  }

  initLayoutContainer(container, opts) {
    this.opts = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored
      animate: false, // Whether to use jQuery animation or $.css() when positioning elements
      ...opts
    };
    this.layoutContainer = typeof container === 'string' ? document.querySelector(container) : container;
  }

  // ...
}
